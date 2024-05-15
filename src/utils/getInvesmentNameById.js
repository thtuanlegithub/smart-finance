export default function getInvesmentNameById(id) {
    switch (id) {
        case 'fixedinvestment':
            return 'Fixed investment'
        case 'dynamicinvestment':
            return 'Dynamic investment'
        default:
            return ''
    }
}