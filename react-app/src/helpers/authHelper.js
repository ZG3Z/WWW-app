export function getCurrentUser() {
    let userJSON;
    const user = localStorage.getItem('user')
    try {
        userJSON = JSON.parse(user);
        console.log(userJSON);
    } catch (e) {
        return undefined;
    }
    return userJSON;
}

export function isAuthenticated() {
    const user = getCurrentUser();
    if(user) {
        return true;
    }
    return false;
}

export function isAuthenticatedAdmin() {
    const user = getCurrentUser();
    if(user){
        if(user.userId==1){
            console.log("admin");
            return true;
        }
    }
    return   false;   
}

export function userId(){
    const user = getCurrentUser();
    if(user){
       return user.userId
    }
    return null;   
}