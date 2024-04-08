class Setting {
    constructor() {
        this.setting_id = '';
        this.notify_time = '';
        this.language = '';
        this.account_id = '';
    }

    get setting_id() {
        return this.setting_id;
    }

    set setting_id(value) {
        this.setting_id = value;
    }

    get notify_time() {
        return this.notify_time;
    }

    set notify_time(value) {
        this.notify_time = value;
    }

    get language() {
        return this.language;
    }

    set language(value) {
        this.language = value;
    }

    get account_id() {
        return this.account_id;
    }

    set account_id(value) {
        this.account_id = value;
    }
}

export default Setting;