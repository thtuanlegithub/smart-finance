import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { CheckBox } from 'react-native-elements';
import React, { useState } from 'react';
import AddTransactionInputViewHeader from '../../AddTransactionInputViewHeader';
import { useNavigation } from '@react-navigation/native';
import colors from '../../../../../styles/colors';
import typography from '../../../../../styles/typography';

const PeopleForm = () => {
    const navigation = useNavigation();
    const [selectedPeople, setSelectedPeople] = useState([]);

    // Get list of people from address book
    const people = [{
        name: 'Person 1',
        phone: '1234567890',
    },
    {
        name: 'Person 2',
        phone: '1234567890',
    },
    {
        name: 'Person 3',
        phone: '1234567890',
    },
    {
        name: 'Person 4',
        phone: '1234567890',
    },
    {
        name: 'Person 5',
        phone: '1234567890',
    }
    ];

    const [searchKeyword, setSearchKeyword] = useState('');
    const [listSearchPeople, setListSearchPeople] = useState(people);

    const handleSelect = (person) => {
        const personNames = selectedPeople.map(p => p.name);
        if (personNames.includes(person.name)) {
            setSelectedPeople(selectedPeople.filter((p) => p.name !== person.name));
        } else {
            setSelectedPeople([person, ...selectedPeople]);
        }
    };

    return (
        <View>
            <AddTransactionInputViewHeader
                onBackPress={() => navigation.goBack()}
                title='People' />
            <View>
                <TextInput
                    value={searchKeyword}
                    onChangeText={(text) => {
                        setSearchKeyword(text);
                        setListSearchPeople(people.filter(person => person.name.toLowerCase().includes(text.toLowerCase())));
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
                            onPress={() => handleSelect(person)}
                            key={index}>
                            <View style={
                                {
                                    backgroundColor: colors.green01,
                                    marginHorizontal: 4,
                                    marginVertical: 4,
                                    paddingVertical: 8,
                                    paddingHorizontal: 8,
                                    borderRadius: 6,
                                }
                            }>
                                <Text style={
                                    {
                                        ...typography.RegularInterH5,
                                        color: colors.green08,
                                    }
                                } key={index}>{person.name}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
                {listSearchPeople.map((person, index) => (
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
                        <Text style={
                            {
                                ...typography.RegularInterH5,
                                color: colors.green08,
                            }
                        }>{person.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View >
    );
};

export default PeopleForm;