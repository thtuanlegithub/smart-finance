import { Setting } from '../../../models';

class SettingBuilder {
    constructor() {
        this.setting = new Setting();
    }

    setSettingId(settingId) {
        this.setting.setting_id = settingId;
        return this;
    }

    setNotifyTime(notifyTime) {
        this.setting.notify_time = notifyTime;
        return this;
    }

    setLanguage(language) {
        this.setting.language = language;
        return this;
    }

    setAccountId(accountId) {
        this.setting.account_id = accountId;
        return this;
    }

    build() {
        return this.setting;
    }
}

export default SettingBuilder;
