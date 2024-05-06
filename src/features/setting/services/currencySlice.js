import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
const PATH_TO_CURRENCY_API = '../data/currencyApi.json';
const PATH_TO_CURRENCY_NAME = '../data/currencyName.json';
const CURRENCY_API_URL = 'https://api.currencyapi.com/v3/latest?apikey=cur_live_NhmVyM9p4RpkJGsGCPZKxfuDC7kPlOOZjP9X04Hu';

const fetchCurrencyData = createAsyncThunk('currency/fetchData', async () => {
    const dataName = require(PATH_TO_CURRENCY_NAME);
    const storedData = await AsyncStorage.getItem('currencyData');

    if (storedData) {
        return JSON.parse(storedData);
    } else {
        const dataCurrency = require(PATH_TO_CURRENCY_API);
        return Object.keys(dataCurrency.data).reduce((combinedData, key) => {
            combinedData[key] = {
                ...dataCurrency.data[key],
                ...dataName[key]
            };
            return combinedData;
        }, {});
    }
});

const updateExchangeRate = createAsyncThunk('currency/updateRate', async () => {
    try {
        const lastUpdated = await AsyncStorage.getItem('lastUpdated');
        const currentDate = moment().format('YYYY-MM-DD');

        if (lastUpdated !== currentDate) {
            const response = await fetch(CURRENCY_API_URL);
            const dataCurrency = await response.json();
            const dataName = require(PATH_TO_CURRENCY_NAME);

            const combinedData = Object.keys(dataCurrency.data).reduce((combinedData, key) => {
                combinedData[key] = {
                    ...dataCurrency.data[key],
                    ...dataName[key]
                };
                return combinedData;
            }, {});

            await AsyncStorage.setItem('currencyData', JSON.stringify(combinedData));
            await AsyncStorage.setItem('lastUpdated', currentDate);

            alert('Currency data has been updated successfully.');
            return combinedData;
        } else {
            alert('You can only update once a day.');
        }
    } catch (error) {
        console.error('Error updating currency data:', error);
    }
});

const searchCurrencyUnit = createAsyncThunk('currency/search', async (searchText, { getState }) => {
    const { currency } = getState();
    const dataCurrency = currency.data;

    if (!dataCurrency || typeof dataCurrency !== 'object') {
        throw new Error('dataCurrency is not an object');
    }

    const searchResult = Object.keys(dataCurrency).reduce((combinedData, key) => {
        const currencyData = dataCurrency[key];
        if (currencyData && currencyData.displayName && (key.toLowerCase().includes(searchText.toLowerCase()) || currencyData.displayName.toLowerCase().includes(searchText.toLowerCase()))) {
            combinedData[key] = currencyData;
        }
        return combinedData;
    }, {});
    return searchResult;
});

const convertCurrencyUnit = createAsyncThunk('currency/convert', async ({ amount, fromCurrency, toCurrency }, { getState }) => {
    const { currency } = getState();
    const dataCurrency = currency.data;
    if (dataCurrency) {
        const exchangeRate = dataCurrency[toCurrency].value / dataCurrency[fromCurrency].value;
        return amount * exchangeRate;
    } else {
        console.log('No currency data found in the global state.');
    }
});

const initialState = {
    data: {},
    searchResult: {},
    exchangeResult: 0,
    currentCurrency: 'VND',
};

const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        setCurrentCurrency: (state, action) => {
            state.currentCurrency = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrencyData.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(updateExchangeRate.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(searchCurrencyUnit.fulfilled, (state, action) => {
                state.searchResult = action.payload;
            })
            .addCase(convertCurrencyUnit.fulfilled, (state, action) => {
                state.exchangeResult = action.payload;
            });
    }
});

export { fetchCurrencyData, updateExchangeRate, searchCurrencyUnit, convertCurrencyUnit, };

export const { setCurrentCurrency } = currencySlice.actions;

export default currencySlice.reducer;


// Load khởi tạo dữ liệu cho Currency khi vừa mount Componnet
// useEffect(() => {
//     dispatch(fetchCurrencyData());
// }, [dispatch]);

// const currencyUnit = useSelector(state => state.currency.data);


// Search
// const searchResult = useSelector(state => state.currency.searchResult);
// useEffect(() => {
//     console.log(searchResult);
// }, [searchResult]);

// const handleDisplayCurrencyUnit = () => {
//     dispatch(searchCurrencyUnit('vnd'));
// }


// Convert currency
// dispatch(convertCurrencyUnit({ amount: 1, fromCurrency: 'USD', toCurrency: 'VND' }));
