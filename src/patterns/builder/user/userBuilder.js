import { User } from '../../../models';

class UserBuilder {
    constructor() {
        this.user = new User();
    }

    setUid(uid) {
        this.user.uid = uid;
        return this;
    }

    setUsername(username) {
        this.user.username = username;
        return this;
    }

    setPassword(password) {
        this.user.password = password;
        return this;
    }

    setEmail(email) {
        this.user.email = email;
        return this;
    }

    build() {
        return this.user;
    }
}

export default UserBuilder;
