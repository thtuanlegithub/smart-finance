class Setting {
    constructor() {
        this._setting_id = '';
        this._notify_time = '';
        this._language = '';
        this._account_id = '';
    }

    get setting_id() {
        return this._setting_id;
    }

    set setting_id(value) {
        this._setting_id = value;
    }

    get notify_time() {
        return this._notify_time;
    }

    set notify_time(value) {
        this._notify_time = value;
    }

    get language() {
        return this._language;
    }

    set language(value) {
        this._language = value;
    }

    get account_id() {
        return this._account_id;
    }

    set account_id(value) {
        this._account_id = value;
    }
}

export default Setting;