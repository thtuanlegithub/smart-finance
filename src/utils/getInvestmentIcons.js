export default getInvestmentIcons = (id) => {
    switch (id) {
        case 'fixedinvestment':
            return require('../assets/images/fixinvestment.png')
        case 'dynamicinvestment':
            return require('../assets/images/dynamicinvest.png')
        default:
            return require('../assets/images/placeholdericon.png')
    }
}