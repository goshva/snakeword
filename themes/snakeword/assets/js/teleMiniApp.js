const wsService = {
    searchUser: (userId) => {
        // Mock implementation of searchUser
        return new Promise((resolve, reject) => {
            // Simulate user not found
            if (userId === '12345') {
                resolve({ id: userId, points: 100 }); // Mock user data
            } else {
                reject(new Error('User not found'));
            }
        });
    },
    createUser: (userId) => {
        // Mock implementation of createUser
        return new Promise((resolve) => {
            resolve({ id: userId, points: 0 }); // Mock user data with initial points
        });
    }
};

let WebApp = window.Telegram.WebApp;

function AddAvatar() {
    if (WebApp.initDataUnsafe.user.photo_url) {
        document.getElementById("avatar").src = WebApp.initDataUnsafe.user.photo_url;
    }
}

function updatePoints() {
    const userId = WebApp.initDataUnsafe.user.id;

    wsService.searchUser(userId).then((user) => {
        if (user) {
            document.getElementById("points").innerHTML = user.points;
        }
    }).catch((error) => {
        if (error.message === 'User not found') {
            return wsService.createUser(userId);
        } else {
            throw error;
        }
    }).then((user) => {
        if (user) {
            document.getElementById("points").innerHTML = user.points;
        }
    }).catch((error) => {
        console.error('Error:', error);
    });
}

// Call the function to update points (this would normally be called in response to some event)
updatePoints();

// Call the function to add avatar
AddAvatar();
