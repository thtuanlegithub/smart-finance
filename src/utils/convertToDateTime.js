const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const convertToDateTime = (dateString, timeString) => {
    const [month, day, year] = dateString.split(' ');
    const isPM = timeString.includes('PM');
    const time = timeString.replace(' PM', '').replace(' AM', '');
    const [hours, minutes] = time.split(':').map(Number);

    const dayNumber = Number(day.replace(',', ''));
    const monthNumber = months.indexOf(month);
    const correctedHours = isPM && hours !== 12 ? hours + 12 : hours;

    return new Date(year, monthNumber, dayNumber, correctedHours, minutes, 0);
};
