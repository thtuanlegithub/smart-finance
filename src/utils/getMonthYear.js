export function getMonthYear(dateString) {
    const date = new Date(dateString);
    const monthNumber = date.getMonth(); // Month (0-11)
    const year = date.getFullYear(); // Year

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthName = monthNames[monthNumber];

    return `${monthName} ${year}`;
}