import { View, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import StackHeader from '../../../components/StackHeader'
import { useDispatch, useSelector } from 'react-redux'
import { convertCurrencyUnit, fetchCurrencyData, searchCurrencyUnit, setCurrentCurrency } from '../services/currencySlice'
import CurrencyItem from '../components/CurrencyItem'
import { TextInput } from 'react-native-gesture-handler'

const SettingCurrency = () => {

    const dispatch = useDispatch();
    // Load khởi tạo dữ liệu cho Currency khi vừa mount Componnet
    useEffect(() => {
        dispatch(fetchCurrencyData());
    }, [dispatch]);

    const currencyUnit = useSelector(state => state.currency.data);
    const currencyList = Object.keys(currencyUnit).map(key => {
        return {
            ...currencyUnit[key],
            code: key
        }
    })
    // Search
    const searchResult = useSelector(state => state.currency.searchResult);
    useEffect(() => {
        console.log(searchResult);
    }, [searchResult]);

    const handleDisplayCurrencyUnit = (text) => {
        dispatch(searchCurrencyUnit(text));
    }


    // Convert currency
    useEffect(() => {
        dispatch(convertCurrencyUnit({ amount: 1, fromCurrency: 'USD', toCurrency: 'VND' }));
    }, [])

    return (
        <View>
            <StackHeader title='Currency' />
            <View style={{
                backgroundColor: 'white',
                marginTop: 2,
            }}>
                <TextInput style={{
                    marginVertical: 16,
                    marginHorizontal: 16,
                    paddingHorizontal: 16,
                    borderWidth: 0.5,
                    backgroundColor: 'white',
                    paddingVertical: 8,
                    borderRadius: 8,

                }}
                    onChangText={handleDisplayCurrencyUnit}
                    placeholder="Search currency" />
            </View>
            <FlatList
                data={currencyList}
                keyExtractor={item => item.code}
                renderItem={({ item }) =>
                    <TouchableOpacity onPress={() => {
                        dispatch(setCurrentCurrency(item.code))
                    }}>
                        <CurrencyItem item={item} />
                    </TouchableOpacity>
                }
            />
        </View>
    )
}

export default SettingCurrency