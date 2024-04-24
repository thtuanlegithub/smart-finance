export default function (total, value) {
    return Math.round(value / total * 100) + '%';
}