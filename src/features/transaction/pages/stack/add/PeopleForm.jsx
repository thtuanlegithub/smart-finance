import { View, Text, TouchableOpacity, TextInput, Linking } from 'react-native';
import { CheckBox } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import AddTransactionInputViewHeader from '../../../components/AddTransactionInputViewHeader';
import { useNavigation } from '@react-navigation/native';
import colors from '../../../../../styles/colors';
import typography from '../../../../../styles/typography';
import Contacts from 'react-native-contacts';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { ScrollView } from 'react-native-gesture-handler';
import call from 'react-native-phone-call';
import { useDispatch, useSelector } from 'react-redux';
import { setTransactionPeople } from '../../../services/addTransactionFormSlice';

const PeopleForm = () => {
    const navigation = useNavigation();
    const [searchKeyword, setSearchKeyword] = useState('');
    const [listSearchPeople, setListSearchPeople] = useState([]);
    const [listPeople, setListPeople] = useState([]);
    const people = useSelector(state => state.addTransactionForm.people);
    const [selectedPeople, setSelectedPeople] = useState(people);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchContacts = async () => {
            const permissionStatus = await check(PERMISSIONS.ANDROID.READ_CONTACTS);
            if (permissionStatus === RESULTS.GRANTED) {
                const contacts = await Contacts.getAll();
                const people = contacts.map(contact => ({
                    name: contact.displayName,
                    phone: contact.phoneNumbers[0]?.number,
                }));
                setListPeople(people);
                setListSearchPeople(people); // Initialize listSearchPeople with all contacts
            } else if (permissionStatus === RESULTS.DENIED) {
                const newStatus = await request(PERMISSIONS.ANDROID.READ_CONTACTS);
                if (newStatus === RESULTS.GRANTED) {
                    const contacts = await Contacts.getAll();
                    const people = contacts.map(contact => ({
                        name: contact.givenName,
                        phone: contact.phoneNumbers[0]?.number,
                    }));
                    setListPeople(people);
                    setListSearchPeople(people); // Initialize listSearchPeople with all contacts
                } else {
                    // handle when permission is denied
                }
            }
        };
        fetchContacts();
    }, []);

    const handleBackPress = () => {
        dispatch(setTransactionPeople(selectedPeople.map(person => ({ name: person.name, phone: person.phone }))));
        navigation.goBack();
    }

    const handleSelect = (person) => {
        const personNames = selectedPeople.map(p => p.name);
        if (personNames.includes(person.name)) {
            setSelectedPeople(selectedPeople.filter((p) => p.name !== person.name));
        } else {
            setSelectedPeople([person, ...selectedPeople]);
        }
    };

    const handleCallSelect = (person) => {
        const phoneNumber = person.phone.replace(/\s/g, '');
        const args = {
            number: phoneNumber,
            prompt: false,
        };
        call(args).catch(console.error);
    };

    return (
        <ScrollView>
            <AddTransactionInputViewHeader
                onBackPress={handleBackPress}
                title='People' />
            <View>
                <TextInput
                    value={searchKeyword}
                    onChangeText={(text) => {
                        setSearchKeyword(text);
                        setListSearchPeople(listPeople.filter(person => person.name.toLowerCase().includes(text.toLowerCase())));
                    }}
                    placeholder="Search people"
                    placeholderTextColor={colors.gray03}
                    style={{
                        borderBottomColor: colors.gray02,
                        borderBottomWidth: 1,
                        paddingVertical: 10,
                        paddingHorizontal: 16,
                        marginVertical: 8,
                        backgroundColor: 'white',
                    }}
                />
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    borderBottomColor: colors.gray02,
                    borderBottomWidth: 1,
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    flexWrap: 'wrap',
                }}>
                    {selectedPeople.map((person, index) => (
                        <TouchableOpacity
                            onPress={() => handleCallSelect(person)}
                            key={index}>
                            <View style={{
                                backgroundColor: colors.green01,
                                marginHorizontal: 4,
                                marginVertical: 4,
                                paddingVertical: 8,
                                paddingHorizontal: 8,
                                borderRadius: 6,
                            }}>
                                <Text style={{
                                    ...typography.RegularInterH5,
                                    color: colors.green08,
                                }} key={index}>{person.name}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
                {listSearchPeople.map((person, index) => ( // Use listSearchPeople here
                    <TouchableOpacity
                        onPress={() => handleSelect(person)}
                        key={index}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: 'white',
                            borderBottomColor: colors.gray02,
                            borderBottomWidth: 1,
                        }}>
                        <CheckBox
                            onPress={() => handleSelect(person)}
                            checkedColor={colors.green06}
                            iconType="material-community"
                            checkedIcon="checkbox-marked"
                            uncheckedIcon="checkbox-blank-outline"
                            checked={selectedPeople.map(p => p.name).includes(person.name)}
                        />
                        <Text style={{
                            ...typography.RegularInterH5,
                            color: colors.green08,
                        }}>{person.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView >
    );
};

export default PeopleForm;