export function getDayName(dateString) {
    const date = new Date(dateString);
    const dayNumber = date.getDay(); // Day of the week (0-6)

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = dayNames[dayNumber];

    return dayName;
}