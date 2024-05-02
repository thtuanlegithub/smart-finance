export function getDate(dateString) {
    const date = new Date(dateString);
    let day = date.getDate(); // Day of the month (1-31)
    day = day.toString().padStart(2, '0'); // Add a leading zero if day is less than 10
    return day;
}