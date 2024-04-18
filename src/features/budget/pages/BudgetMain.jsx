import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import NoWifiItem from '../../../components/NoWifiItem';
import ConfirmDialog from '../../../components/ConfirmDialog';
import colors from '../../../styles/colors';

function BudgetMain(props) {
    const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <NoWifiItem />
            <TouchableOpacity
                style={{ paddingVertical: 10, paddingHorizontal: 16, backgroundColor: colors.green06, borderRadius: 10 }}
                onPress={() => setConfirmDialogVisible(true)}>
                <Text style={{ color: 'white' }}>Show Confirm Dialog</Text>
            </TouchableOpacity>
            <ConfirmDialog
                title="Confirm Dialog tile"
                message="Confirm Dialog message Confirm Dialog message Confirm Dialog message Confirm Dialog message "
                onConfirm={() => setConfirmDialogVisible(false)}
                onCancel={() => setConfirmDialogVisible(false)}
                visible={confirmDialogVisible} />
            <View style={{ marginBottom: 50 }}></View>
        </View>
    );
}

export default BudgetMain;