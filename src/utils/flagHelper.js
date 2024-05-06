import currencyFlags from '../features/setting/data/currrencyFlag.json';
export default function findFlag(code) {
    const currencyFlag = currencyFlags.find((item) => item.code == code);
    return currencyFlag ? currencyFlag.flag : null;
}