const wsService = {
    searchUser: (userId) => {
        return new Promise((resolve, reject) => {
            const ws = new WebSocket('wss://snakeword.ru:6969/ws');

            ws.onopen = () => {
                ws.send(JSON.stringify({ action: 'searchUser', userId: userId }));
            };

            ws.onmessage = (event) => {
                const user = JSON.parse(event.data);
                resolve(user);
                ws.close();
            };

            ws.onerror = (error) => {
                reject(new Error('WebSocket error: ' + error.message));
            };

            ws.onclose = () => {
                reject(new Error('WebSocket closed'));
            };
        });
    },
    createUser: (userId) => {
        return new Promise((resolve, reject) => {
            const ws = new WebSocket('wss://snakeword.ru:6969/ws');

            ws.onopen = () => {
                ws.send(JSON.stringify({ action: 'createUser', userId: userId }));
            };

            ws.onmessage = (event) => {
                const user = JSON.parse(event.data);
                resolve(user);
                ws.close();
            };

            ws.onerror = (error) => {
                reject(new Error('WebSocket error: ' + error.message));
            };

            ws.onclose = () => {
                reject(new Error('WebSocket closed'));
            };
        });
    }
};

let WebApp = window.Telegram.WebApp;

function AddAvatar() {
    const TelegBtn = document.querySelector(".TelegBtn")
    console.log(TelegBtn)
    console.log(WebApp?.initDataUnsafe?.user?.photo_url)
    if (WebApp?.initDataUnsafe?.user?.photo_url) {
       const createAvatar = document.createElement("img").src = WebApp?.initDataUnsafe?.user?.photo_url;
        TelegBtn.appendChild(createAvatar)
    }
}

function updatePoints() {
    const userId = WebApp?.initDataUnsafe?.user?.id || 190404167;

    wsService.searchUser(userId).then((user) => {
        if (user) {
            document.getElementById("points").innerHTML = user.score;
        }
    }).catch((error) => {
        if (error.message === 'User not found') {
            return // wsService.createUser(userId);
        } else {
            throw error;
        }
    }).then((user) => {
        if (user) {
            document.getElementById("points").innerHTML = user.score;
        }
    }).catch((error) => {
        console.error('Error:', error);
    });
}

// Call the function to update points (this would normally be called in response to some event)
updatePoints();

// Call the function to add avatar
AddAvatar();
