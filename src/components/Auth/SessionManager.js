const SessionManager = {

    getToken() {
        const token = sessionStorage.getItem('token');
        if (token) return token;
        else return false;
    },

    getRole() {
        const role = sessionStorage.getItem('role');
        if (role) return role;
        else return false;
    },

    getUserId() {
        const userId = sessionStorage.getItem('userId');
        if (userId) return userId;
        else return false;
    },

    getProfilePicture() {
        const profilePicture = sessionStorage.getItem('profilePicture');
        if(profilePicture) return profilePicture;
        else return false;
    },

    getPets() {
        const pets = sessionStorage.getItem("pets");
        if(pets) return pets;
        else return false;
    },

    updateProfilePicture(profilePicture) {
        sessionStorage.removeItem('profilePicture');
        sessionStorage.setItem('profilePicture', profilePicture);
    },

    setUserSession(fullName, token, userId, role, profilePicture, pets) {
        sessionStorage.setItem('fullName', fullName);
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('userId', userId);
        sessionStorage.setItem('role', role);
        sessionStorage.setItem('profilePicture', profilePicture);
        sessionStorage.setItem('pets', pets);
    },

    removeUserSession(){
        sessionStorage.removeItem('fullName');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('profilePicture');
        sessionStorage.removeItem('pets');
    }
}

export default SessionManager;