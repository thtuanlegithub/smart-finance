export function formatDate(date) {
    if (date != null || date != '') {
        return date?.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
        }).replace(/\//g, ', ');
    }
    else {
        return "";
    }
}