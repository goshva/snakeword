package prepare_dict

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

// LanguageInfo 语言信息结构
type LanguageInfo struct {
	Code      string
	Name      string
	TableName string
}

// AlphabetEntry 字母表条目
type AlphabetEntry struct {
	Letter              string   `json:"letter"`
	Frequency           float64  `json:"frequency,omitempty"`
	NormalizedFrequency *float64 `json:"normalized_frequency,omitempty"`
	Position            int      `json:"position"`
	IsActive            bool     `json:"is_active"`
}

// LanguageStats 语言统计信息
type LanguageStats struct {
	TotalLetters  int64            `json:"total_letters"`
	Alphabet      []string         `json:"alphabet"`
	Rangs         []float64        `json:"rangs"`
	AlphabetData  []AlphabetEntry  `json:"alphabet_data,omitempty"`
	WordCount     int              `json:"word_count"`
	GeneratedAt   string           `json:"generated_at"`
}

// 主函数
func prepare_dict() {
	// 数据库连接
	connString := "postgres://postgres:postgres@localhost:5432/snakeword"
	ctx := context.Background()

	pool, err := pgxpool.New(ctx, connString)
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	defer pool.Close()

	// 创建输出目录
	outputDir := "./static"
	os.MkdirAll(outputDir, 0755)

	// 语言列表
	languages := []LanguageInfo{
		{"ar", "Arabic", "dict_ar"},
		{"hy", "Armenian", "dict_hy"},
		{"zh", "Chinese", "dict_zh"},
		{"en", "English", "dict_en"},
		{"fr", "French", "dict_fr"},
		{"ka", "Georgian", "dict_ka"},
		{"de", "German", "dict_de"},
		{"hi", "Hindi", "dict_hi"},
		{"la", "Latin", "dict_la"},
		{"ru", "Russian", "dict_ru"},
	}

	// 生成完整的 stat.json
	generateStatJSON(ctx, pool, languages, outputDir)

	// 生成独立的字典文件
	generateDictionaryFiles(ctx, pool, languages, outputDir)
}

// 生成 stat.json 文件
func generateStatJSON(ctx context.Context, pool *pgxpool.Pool, languages []LanguageInfo, outputDir string) {
	fmt.Println("Generating stat.json...")

	stats := make(map[string]LanguageStats)

	for _, lang := range languages {
		fmt.Printf("  Processing %s (%s)...\n", lang.Name, lang.Code)

		// 获取字母表数据
		alphabetData, err := getAlphabetData(ctx, pool, lang.Code)
		if err != nil {
			fmt.Printf("    Warning: Could not get alphabet data: %v\n", err)
			continue
		}

		// 计算总字母数
		totalLetters, err := getTotalLetters(ctx, pool, lang.Code)
		if err != nil {
			fmt.Printf("    Warning: Could not get total letters: %v\n", err)
			totalLetters = 0
		}

		// 获取单词列表用于计算
		words, err := getWordsFromTable(ctx, pool, lang.TableName)
		if err != nil {
			fmt.Printf("    Warning: Could not get words: %v\n", err)
		}

		// 提取字母和频率
		alphabet := make([]string, 0, len(alphabetData))
		rangs := make([]float64, 0, len(alphabetData))

		for _, entry := range alphabetData {
			alphabet = append(alphabet, entry.Letter)
			rangs = append(rangs, entry.Frequency)
		}

		// 构建统计信息
		stats[lang.Code] = LanguageStats{
			TotalLetters:  totalLetters,
			Alphabet:      alphabet,
			Rangs:         rangs,
			AlphabetData:  alphabetData,
			WordCount:     len(words),
			GeneratedAt:   time.Now().Format(time.RFC3339),
		}
	}

	// 将 stats 写入文件
	statFile := filepath.Join(outputDir, "stat.json")
	statData, err := json.MarshalIndent(stats, "", "  ")
	if err != nil {
		log.Fatal("Error marshaling stat.json:", err)
	}

	if err := os.WriteFile(statFile, statData, 0644); err != nil {
		log.Fatal("Error writing stat.json:", err)
	}

	fmt.Printf("\n✓ stat.json generated: %s\n", statFile)
}

// 获取字母表数据
func getAlphabetData(ctx context.Context, pool *pgxpool.Pool, languageCode string) ([]AlphabetEntry, error) {
	query := `
		SELECT a.letter, a.frequency, a.normalized_frequency, a.position, a.is_active
		FROM alphabet a
		JOIN languages l ON a.language_id = l.id
		WHERE l.code = $1
		ORDER BY a.position
	`

	rows, err := pool.Query(ctx, query, languageCode)
	if err != nil {
		return nil, fmt.Errorf("query failed: %w", err)
	}
	defer rows.Close()

	var alphabet []AlphabetEntry
	for rows.Next() {
		var entry AlphabetEntry
		var normalizedFrequency *float64
		
		if err := rows.Scan(&entry.Letter, &entry.Frequency, &normalizedFrequency, &entry.Position, &entry.IsActive); err != nil {
			return nil, fmt.Errorf("scan failed: %w", err)
		}
		
		entry.NormalizedFrequency = normalizedFrequency
		alphabet = append(alphabet, entry)
	}

	return alphabet, nil
}

// 获取总字母数
func getTotalLetters(ctx context.Context, pool *pgxpool.Pool, languageCode string) (int64, error) {
	query := `
		SELECT total_letters 
		FROM language_stats 
		WHERE language_id = (SELECT id FROM languages WHERE code = $1)
	`
	
	var totalLetters int64
	err := pool.QueryRow(ctx, query, languageCode).Scan(&totalLetters)
	if err != nil {
		// 如果表不存在，尝试从字母频率计算
		return calculateTotalLetters(ctx, pool, languageCode)
	}
	
	return totalLetters, nil
}

// 从字母频率计算总字母数
func calculateTotalLetters(ctx context.Context, pool *pgxpool.Pool, languageCode string) (int64, error) {
	query := `
		SELECT SUM(frequency) 
		FROM alphabet a
		JOIN languages l ON a.language_id = l.id
		WHERE l.code = $1 AND a.is_active = true
	`
	
	var totalLetters float64
	err := pool.QueryRow(ctx, query, languageCode).Scan(&totalLetters)
	if err != nil {
		return 0, fmt.Errorf("failed to calculate total letters: %w", err)
	}
	
	return int64(totalLetters), nil
}

// 从数据库表获取单词
func getWordsFromTable(ctx context.Context, pool *pgxpool.Pool, tableName string) ([]string, error) {
	query := fmt.Sprintf(`
		SELECT word 
		FROM %s 
		WHERE word IS NOT NULL AND TRIM(word) != ''
		ORDER BY 
			CASE WHEN is_common THEN 0 ELSE 1 END,
			frequency DESC NULLS LAST,
			word
		LIMIT 10000
	`, tableName)

	rows, err := pool.Query(ctx, query)
	if err != nil {
		return nil, fmt.Errorf("query failed: %w", err)
	}
	defer rows.Close()

	var words []string
	for rows.Next() {
		var word string
		if err := rows.Scan(&word); err != nil {
			return nil, fmt.Errorf("scan failed: %w", err)
		}
		words = append(words, strings.TrimSpace(word))
	}

	return words, nil
}

// 生成独立的字典文件
func generateDictionaryFiles(ctx context.Context, pool *pgxpool.Pool, languages []LanguageInfo, outputDir string) {
	dictsDir := filepath.Join(outputDir, "dicts")
	os.MkdirAll(dictsDir, 0755)

	fmt.Println("\nGenerating dictionary files...")

	for _, lang := range languages {
		fmt.Printf("  Processing %s dictionary... ", lang.Name)
		
		// 查询单词
		query := fmt.Sprintf(`
			SELECT word 
			FROM %s 
			WHERE word IS NOT NULL AND TRIM(word) != ''
			ORDER BY 
				CASE WHEN is_common THEN 0 ELSE 1 END,
				frequency DESC NULLS LAST,
				word
		`, lang.TableName)

		rows, err := pool.Query(ctx, query)
		if err != nil {
			fmt.Printf("Error: %v\n", err)
			continue
		}

		var words []string
		for rows.Next() {
			var word string
			if err := rows.Scan(&word); err != nil {
				log.Printf("Scan error: %v", err)
				continue
			}
			words = append(words, strings.TrimSpace(word))
		}
		rows.Close()

		// 创建 JSON 文件
		jsonFile := filepath.Join(dictsDir, fmt.Sprintf("%s.json", lang.Name))
		jsonData, err := json.MarshalIndent(words, "", "  ")
		if err != nil {
			fmt.Printf("JSON error: %v\n", err)
			continue
		}

		// 写入文件
		if err := os.WriteFile(jsonFile, jsonData, 0644); err != nil {
			fmt.Printf("Write error: %v\n", err)
			continue
		}

		fmt.Printf("✓ (%d words)\n", len(words))
	}

	fmt.Printf("\n✓ Dictionary files generated in: %s\n", dictsDir)
	
	// 创建索引文件
	createIndexFile(dictsDir, languages)
}

// 创建索引文件
func createIndexFile(outputDir string, languages []LanguageInfo) {
	index := map[string]interface{}{
		"generated_at": time.Now().Format(time.RFC3339),
		"languages":    []map[string]string{},
	}

	langList := index["languages"].([]map[string]string)
	
	for _, lang := range languages {
		jsonFile := fmt.Sprintf("%s.json", lang.Name)
		langInfo := map[string]string{
			"code":  lang.Code,
			"name":  lang.Name,
			"file":  jsonFile,
			"table": lang.TableName,
		}
		langList = append(langList, langInfo)
	}
	
	index["languages"] = langList

	indexFile := filepath.Join(outputDir, "index.json")
	indexJSON, _ := json.MarshalIndent(index, "", "  ")
	os.WriteFile(indexFile, indexJSON, 0644)

	fmt.Printf("✓ Index file created: %s\n", indexFile)
}

// 生成完整的语言包（可选功能）
func generateCompleteLanguagePackage(ctx context.Context, pool *pgxpool.Pool, lang LanguageInfo, outputDir string) error {
	// 创建语言特定目录
	langDir := filepath.Join(outputDir, lang.Code)
	if err := os.MkdirAll(langDir, 0755); err != nil {
		return fmt.Errorf("error creating language directory: %w", err)
	}

	// 1. 生成单词 JSON
	words, err := getWordsFromTable(ctx, pool, lang.TableName)
	if err != nil {
		return fmt.Errorf("error getting words: %w", err)
	}

	wordsFile := filepath.Join(langDir, "words.json")
	wordsData, err := json.MarshalIndent(words, "", "  ")
	if err != nil {
		return fmt.Errorf("error marshaling words: %w", err)
	}
	if err := os.WriteFile(wordsFile, wordsData, 0644); err != nil {
		return fmt.Errorf("error writing words file: %w", err)
	}

	// 2. 生成字母表 JSON
	alphabetData, err := getAlphabetData(ctx, pool, lang.Code)
	if err != nil {
		fmt.Printf("  Warning: Could not get alphabet data: %v\n", err)
		alphabetData = []AlphabetEntry{}
	}

	alphabetFile := filepath.Join(langDir, "alphabet.json")
	alphabetJSON, err := json.MarshalIndent(map[string]interface{}{"alphabet": alphabetData}, "", "  ")
	if err != nil {
		return fmt.Errorf("error marshaling alphabet: %w", err)
	}
	if err := os.WriteFile(alphabetFile, alphabetJSON, 0644); err != nil {
		return fmt.Errorf("error writing alphabet file: %w", err)
	}

	// 3. 生成元数据
	metadata := map[string]interface{}{
		"language":      lang.Name,
		"code":          lang.Code,
		"word_count":    len(words),
		"alphabet_size": len(alphabetData),
		"generated_at":  time.Now().Format(time.RFC3339),
	}

	metadataFile := filepath.Join(langDir, "metadata.json")
	metadataJSON, err := json.MarshalIndent(metadata, "", "  ")
	if err != nil {
		return fmt.Errorf("error marshaling metadata: %w", err)
	}
	if err := os.WriteFile(metadataFile, metadataJSON, 0644); err != nil {
		return fmt.Errorf("error writing metadata file: %w", err)
	}

	fmt.Printf("  Created complete package in: %s/\n", langDir)
	return nil
}