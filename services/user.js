const messages = require ('./message');

const users = [{
	id: 1,
	name: 'Nikolas',
	email: 'nikolas@gmail.com'
},{
	id: 2,
	name: 'Eduard',
	email: 'eduard@gmail.com'
},{
	id: 3,
	name: 'Bohdan',
	email: 'bohdan@gmail.com'
},{
	id: 4,
	name: 'Dima',
	email: 'dima@gmail.com'
}];

function findUser(id){
	const err = null;
	if (typeof id === 'undefined'){
		err = new Error('id is undefined');
	}

	let index;
	const user = users.find((el, ind) => {
		if (el.id === id){
			index = ind;
			return true;
		} else {
			return false;
		}
	});
	return {user, index, err};
}

module.exports = {
	findAll: (callback) => {
		callback(null, users);
	},

	findOne: (id, callback) => {
		const {err, user} = findUser(id);
		callback(err, user);
	},

	add: (user, callback) => {
		if (typeof user.id !== 'undefined'){
			users.push(user);
			callback(null);
		} else {
			callback(new Error('user doesnt have id'));
		}
	},

	findOneAndDelete: (id, callback) => {
		let {err, user, index} = findUser(id);
		if (typeof index !== 'undefined'){
			users.splice(index, 1);
		} else {
			err = new Error('no users with such index');
		}
		callback(err);
	},

	findOneAndUpdate: (id, user, callback) => {
		const {err, index} = findUser(id);
		users[index] = Object.assign(users[index], user);
		callback(err);
	},
	findUserSpeak: (id, callback) => {
		const {err, index} = findUser(id);
    	let matchUsersId = [];
    	let matchUsers = [];
    	let j = 0;
    	for ( let i = 0, k = 0; i < messages.messages.length; i++ ) {
    		if (users[index].id == messages.messages[i].senderId)  {
    			matchUsersId[k] = messages.messages[i].receiverId;
    			k += 1;
    		} else if (users[index].id == messages.messages[i].receiverId) {
    			matchUsersId[k] = messages.messages[i].senderId;
    			k += 1;
    		}
    	}
    	for (let id in matchUsersId) {
    		for (let user in users) {
    			if (users[user].id == matchUsersId[id]) {
    				matchUsers[j] = users[user];
    				j += 1;
    			}

    		}
    	}
    	callback(err, matchUsers);
    }
};
