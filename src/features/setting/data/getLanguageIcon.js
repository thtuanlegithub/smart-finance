export const getLanguageIcon = (languageCode) => {
    switch (languageCode) {
        case 'en':
            return require('../../../assets/images/lang/en.png');
        case 'vi':
            return require('../../../assets/images/lang/vi.png');
        default:
            return require('../../../assets/images/lang/vi.png');
    }
}