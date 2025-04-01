package main

import (
    "encoding/json"
    "log"
    "net/http"
    "sync"
    "github.com/gorilla/websocket"
)

type User struct {
    ID    string `json:"userId"`
    Score int    `json:"score"`
}

type Message struct {
    Action  string `json:"action"`
    UserID  string `json:"userId"`
    RoomID  string `json:"roomId,omitempty"`
    Content string `json:"content,omitempty"`
}

type Room struct {
    Clients    map[*websocket.Conn]bool
    Broadcast  chan Message
    Register   chan *websocket.Conn
    Unregister chan *websocket.Conn
}

type Hub struct {
    Rooms map[string]*Room
    Users map[string]*User
    mu    sync.RWMutex
}

var upgrader = websocket.Upgrader{
    ReadBufferSize:  1024,
    WriteBufferSize: 1024,
    CheckOrigin: func(r *http.Request) bool {
        return true // Adjust this for production
    },
}

var hub = Hub{
    Rooms: make(map[string]*Room),
    Users: make(map[string]*User),
    mu:    sync.RWMutex{},
}

func (r *Room) run() {
    for {
        select {
        case client := <-r.Register:
            r.Clients[client] = true
        case client := <-r.Unregister:
            if _, ok := r.Clients[client]; ok {
                delete(r.Clients, client)
                close(client.Send)
            }
        case message := <-r.Broadcast:
            for client := range r.Clients {
                select {
                case client.WriteJSON(message):
                default:
                    close(client.Send)
                    delete(r.Clients, client)
                }
            }
        }
    }
}

func getRoomIDFromURL(url string) string {
    // Extract room ID from URL parameters
    // In this case, using the letters parameter as room ID
    return url[strings.Index(url, "letters=")+8:]
}

func handleWebSocket(w http.ResponseWriter, r *http.Request) {
    conn, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        log.Println(err)
        return
    }
    defer conn.Close()

    for {
        var msg Message
        err := conn.ReadJSON(&msg)
        if err != nil {
            log.Printf("error: %v", err)
            break
        }

        hub.mu.Lock()
        switch msg.Action {
        case "searchUser":
            if user, ok := hub.Users[msg.UserID]; ok {
                conn.WriteJSON(user)
            } else {
                conn.WriteJSON(map[string]string{"error": "User not found"})
            }
        case "createUser":
            user := &User{
                ID:    msg.UserID,
                Score: 0,
            }
            hub.Users[msg.UserID] = user
            conn.WriteJSON(user)
        case "joinRoom":
            roomID := getRoomIDFromURL(msg.RoomID)
            if _, ok := hub.Rooms[roomID]; !ok {
                hub.Rooms[roomID] = &Room{
                    Clients:    make(map[*websocket.Conn]bool),
                    Broadcast:  make(chan Message),
                    Register:   make(chan *websocket.Conn),
                    Unregister: make(chan *websocket.Conn),
                }
                go hub.Rooms[roomID].run()
            }
            room := hub.Rooms[roomID]
            room.Register <- conn
            conn.WriteJSON(map[string]string{"status": "joined"})
        case "message":
            roomID := getRoomIDFromURL(msg.RoomID)
            if room, ok := hub.Rooms[roomID]; ok {
                room.Broadcast <- msg
            }
        }
        hub.mu.Unlock()
    }
}

func main() {
    http.HandleFunc("/ws", handleWebSocket)
    
    // Serve static files if needed
    http.Handle("/", http.FileServer(http.Dir("./static")))
    
    log.Println("Server starting on :6969...")
    err := http.ListenAndServeTLS(":6969", "cert.pem", "key.pem", nil)
    if err != nil {
        log.Fatal("ListenAndServe: ", err)
    }
}
