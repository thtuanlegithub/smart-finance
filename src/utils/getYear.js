export function getYear(dateString) {
    const date = new Date(dateString);
    return date.getFullYear();
}