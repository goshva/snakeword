function trArr (def) {
 fristTransl = def.find(tr => tr.tr).tr
  return [def[0].text,fristTransl[0].text]
}
async function getTranslate (lang,toLang, word) {
	const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
	const options = {
		method: 'POST',
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
			'Accept-Encoding': 'application/gzip',
			'X-RapidAPI-Key': '9f6d76d654mshc03275bb0602cf5p1795bajsn9af24f9361fe',
			'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
		},
		body: new URLSearchParams({
			q: word,
			target: toLang,
			source: lang
		})
	};

	try {
		const response = await fetch(url, options);
		const result = await response.text();
		console.log(result);
	} catch (error) {
		console.error(error);
	}
}
//var userLang = navigator.language || navigator.userLanguage;

//getTranslate(language,userLang,'لحظ')
