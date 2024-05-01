import { StyleSheet } from 'react-native'
import React from 'react'

import { useSelector } from 'react-redux'
import DebtDetail from './DebtDetail'
import LoanDetail from './LoanDetail'
import DebtCollectionDetail from './DebtCollectionDetail'
import RepaymentDetail from './RepaymentDetail'

const DebtLoanDetail = ({ transaction }) => {
    const currentWallet = useSelector(state => state.wallet.currentWallet);

    return (
        <>
            {
                transaction?.category == 'Debt'
                &&
                <DebtDetail transaction={transaction} />
            }
            {
                transaction?.category == 'Loan'
                &&
                <LoanDetail transaction={transaction} />
            }
            {
                transaction?.category == 'Debt collection'
                &&
                <DebtCollectionDetail transaction={transaction} />
            }
            {
                transaction?.category == 'Repayment'
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