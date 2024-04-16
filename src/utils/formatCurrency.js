export default function formatCurrency(value) {
    if (value)
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return null
}