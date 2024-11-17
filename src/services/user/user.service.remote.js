import { httpService } from '../http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
	login,
	logout,
	signup,
	getUsers,
	getById,
	remove,
	update,
    getLoggedinUser,
    saveLoggedinUser,
    validateToken,  
}

function getUsers() {
	return httpService.get(`user`)
}

async function getById(userId) {
	const user = await httpService.get(`user/${userId}`)
	return user
}

function remove(userId) {
	return httpService.delete(`user/${userId}`)
}

async function update({ _id, score }) {
	const user = await httpService.put(`user/${_id}`, { _id, score })

	// When admin updates other user's details, do not update loggedinUser
    const loggedinUser = getLoggedinUser() // Might not work because its defined in the main service???
    if (loggedinUser._id === user._id) saveLoggedinUser(user)

	return user
}

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    if (user) {
        saveLoggedinUser(user)
        return user // you might also want to return token or log it here
    }
}

async function signup(userCred) {
    console.log("Signup payload: ", userCred); 

    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png';

    const user = await httpService.post('auth/signup', userCred);
    return saveLoggedinUser(user);
}

async function logout() {
	localStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
	return await httpService.post('auth/logout')
}

function getLoggedinUser() {
    const user =  JSON.parse(localStorage.getItem('loggedInUser'));
    // console.log('Retrieved user from localStorage:', user);
    return user;
}

function saveLoggedinUser(user) {
    const userToSave = {
        _id: user._id,
        username: user.username,  
        imgUrl: user.imgUrl,
        token: user.token,  
    };
    localStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userToSave));  
    return userToSave;
}



// New validateToken function
async function validateToken() {
    // Retrieve the token and user from localStorage
    const tokenFromStorage = localStorage.getItem('authToken');
    const userFromStorage = JSON.parse(localStorage.getItem('loggedInUser'));

   
    console.log('Token from storage:', tokenFromStorage);
    console.log('User from storage:', userFromStorage);

    if (!tokenFromStorage || !userFromStorage) {
        console.log('No token or user found in localStorage.');
        return { isLoggedIn: false };
    }

    // Try to validate the token
    try {
        const {data:response} = await httpService.post('auth/validate-token', { token: tokenFromStorage });

        // Check if the response indicates the token is valid
        if (response && response.isLoggedIn) {
            console.log('Token is valid');
            
            return { isLoggedIn: true };
        } else {
            console.log('Invalid token');
            return { isLoggedIn: false };
        }
    } catch (err) {
        // Handle any errors during the API call
        console.error('Error validating token', err);
        return { isLoggedIn: false };
    }
}



