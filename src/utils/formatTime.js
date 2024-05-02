export default function formatTime(date) {
    const timeString = date.toLocaleTimeString('en-US');
    const formattedTime = timeString.replace(/:\d+ /, ' ');
    return formattedTime;
}
