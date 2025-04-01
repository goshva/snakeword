# Snakeword game

## for dev

for win: 1. download last hugo [static site generator for windows](https://github.com/gohugoio/hugo/releases/download/v0.121.1/hugo_extended_0.121.1_windows-amd64.zip) 2. `unpuck zip (you will see hugo.exe file)`

for mac: 1. `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" ` 2. `brew install hugo `

for linux: 1. `sudo snap install hugo`

3. after do:
   `git clone git@github.com:goshva/snakeword.git`

4. go to folder snakeword and:
   ` ../hugo.exe server` for mac and linux: ` hugo server`

5. for build run
   ` ../hugo.exe  (withouut server)` for linux: `hugo`

## for websocket server

chat-server/
├── main.go
├── static/    (for any frontend files)
│   └── index.html
├── cert.pem   (SSL certificate)
└── key.pem    (SSL key)
```
go mod init chat-server
go get github.com/gorilla/websocket
go run main.go
```


```
