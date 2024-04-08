class User {
    constructor() {
        this.uid = '';
        this.username = '';
        this.password = '';
        this.email = '';
    }

    getUid() {
        return this.uid;
    }

    getUsername() {
        return this.username;
    }

    getPassword() {
        return this.password;
    }

    getEmail() {
        return this.email;
    }

    setUid(uid) {
        this.uid = uid;
    }

    setUsername(username) {
        this.username = username;
    }

    setPassword(password) {
        this.password = password;
    }

    setEmail(email) {
        this.email = email;
    }
}

export default User;
