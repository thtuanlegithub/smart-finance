import { StyleSheet } from 'react-native'
import React from 'react'

import { useSelector } from 'react-redux'
import DebtDetail from './DebtDetail'
import LoanDetail from './LoanDetail'
import DebtCollectionDetail from './DebtCollectionDetail'
import RepaymentDetail from './RepaymentDetail'

const DebtLoanDetail = ({ transaction }) => {
    return (
        <>
            {
                transaction?.category == 'debt'
                &&
                <DebtDetail transaction={transaction} />
            }
            {
                transaction?.category == 'loan'
                &&
                <LoanDetail transaction={transaction} />
            }
            {
                transaction?.category == 'debtcollection'
                &&
                <DebtCollectionDetail transaction={transaction} />
            }
            {
                transaction?.category == 'repayment'
                &&
                <RepaymentDetail transaction={transaction} />
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 2,
        padding: 16,
        paddingHorizontal: 24,
        backgroundColor: 'white',
    },
    transactionCard: {
        marginTop: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
})

export default DebtLoanDetail