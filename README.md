# Snakeword game

## for dev

for win: 1. download last hugo [static site generator for windows](https://github.com/gohugoio/hugo/releases/download/v0.121.1/hugo_extended_0.121.1_windows-amd64.zip) 2. `unpuck zip (you will see hugo.exe file)`

for mac: 1. `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" ` 2. `brew install hugo `

3. after do:
   `git clone git@github.com:goshva/snakeword.git`

4. go to folder snakeword and:
   ` ../hugo.exe server` for mac: ` hugo server`

5. for build run
   ` ../hugo.exe  (withouut server)`

## for websocket server

in windows working in wsl ( in PowerShell in ADMIN: wsl --install)

```
python3 -m venv env
source env/bin/activate
pip  install -r requirements.txt
chmod +x ws.py
./ws.py
```

if adding modules plz run:

```
  pip3 freeze > requirements.txt
```

if OSError: [Errno 98] error while attempting to bind on address ('localhost', 8765): address already in use

```
sudo kill -9 `sudo lsof -t -i:8765`

```
