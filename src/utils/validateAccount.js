export function isValidAccount(email, password) {
    if (!email || !password) {
        alert('Please fill all account information');
        return false;
    }
    if (!isValidGmail(email)) {
        alert('Email address must be followed @gmail.com');
        return false;
    }
    if (!isValidPassword(password)) {
        alert('Password must be at least 6 characters');
        return false;
    }
    return true;
}

function isValidGmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return regex.test(email);
}

function isValidPassword(password) {
    return password.length >= 6;
}