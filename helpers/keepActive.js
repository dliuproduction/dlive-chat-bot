let users = require('../storage/users');
let config = require('../config');
let activeUsers = {};
const rxUsers = require('./rxUsers');

// Every 5 minutes this interval will run
let ticker = setInterval(()=>{
    let startUsers = Object.assign({}, users);
    if(Object.keys(activeUsers).length > 0) {
        Object.keys(activeUsers).forEach(username => {
            let storageUser = users[username];
            let user = activeUsers[username].sender;
            if(!storageUser) {
                storageUser = {
                    // This will probably change once we add functionaly to edit different tiers of users to get different points
                    points: config.points,
                    avatar: user.avatar,
                    displayname: user.displayname,
                    username,
                    role: activeUsers[username].roomRole
                }
            } else {
                storageUser = Object.assign({}, storageUser, {points: storageUser.points + config.points});
            }
            users[username] = storageUser;
            
        })
    }
    // Remove all users from activeUsers
    if(startUsers !== users) rxUsers.next(users);
    startUsers = undefined;
    activeUsers = {};
},1000*60*5)

const keepActive = message => {
    activeUsers[message.sender.username] = message;
}

module.exports = keepActive