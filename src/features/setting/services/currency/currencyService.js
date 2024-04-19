import AsyncStorage from '@react-native-async-storage/async-storage';
const PATH_TO_CURRENCY_API = '../../data/currencyApi.json';
const PATH_TO_CURRENCY_NAME = '../../data/currencyName.json'

export const searchCurrencyUnit = async (searchText) => {
    try {
        const dataName = require(PATH_TO_CURRENCY_NAME);
        const storedData = await AsyncStorage.getItem('currencyData');
        const dataCurrency = storedData ? JSON.parse(storedData) : require(PATH_TO_CURRENCY_API);

        const searchResult = Object.keys(dataCurrency.data).reduce((combinedData, key) => {
            if (dataName[key] && (key.toLowerCase().includes(searchText.toLowerCase()) || dataName[key].displayName.toLowerCase().includes(searchText.toLowerCase()))) {
                combinedData[key] = {
                    ...dataCurrency.data[key],
                    ...dataName[key]
                };
            }
            return combinedData;
        }, {});

        return searchResult;
    } catch (error) {   
        console.error('Error searching currency data:', error);
    } 
}

export const convertCurrencyUnit = async (amount, fromCurrency, toCurrency) => {
    try {
        let data = await AsyncStorage.getItem('currencyData');
        if (data !== null) {
            const jsonData = JSON.parse(data);
            const exchangeRate = jsonData.value[toCurrency] / jsonData.value[fromCurrency];
            const result = amount * exchangeRate;
            return result;
        } else {
            console.log('No currency data found in storage. Loading default data.');
            data = require(PATH_TO_CURRENCY_API);
            const exchangeRate = data.value[toCurrency] / data.value[fromCurrency];
            const result = amount * exchangeRate;
            return result;
        }
    } catch (error) {
        console.error('Error converting currency:', error);
    }
}