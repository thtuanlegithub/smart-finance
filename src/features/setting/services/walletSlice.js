import { createSlice } from "@reduxjs/toolkit";
import { WalletFields, FirebaseNodes } from "../../../data/firebaseConstant";
import { FirestoreSingleton } from "../../../patterns";
const firestoreInstance = FirestoreSingleton.getInstance().getFirestore();
const walletCollection = firestoreInstance.collection(FirebaseNodes.WALLET);

// Firebase services
async function getUserWallet(accountId) {
    const wallets = await walletCollection.where(WalletFields.ACCOUNT_ID, '==', accountId).get();
    if (!wallets.empty) {
        return wallets.docs.map(doc => doc.data());
    } else {
        return [];
    }
}

async function updateUserWallet(walletId, newWallet) {
    let docRef;
    if (walletId) {
        docRef = walletCollection.doc(walletId);
        const doc = await docRef.get();

        if (doc.exists) {
            await docRef.update(newWallet);
        }
    } else {
        docRef = await walletCollection.add(newWallet);
        const id = docRef.id;
        newWallet.wallet_id = id;
        await docRef.update(newWallet);
    }

    const updatedWallet = await docRef.get();
    return { id: docRef.id, ...updatedWallet.data() };
}

async function initiateUserWallet(currentUser, dispatch) {
    let wallets = await getUserWallet(currentUser.uid);
    if (Array.isArray(wallets) && wallets.length === 0) {
        const newWallet = createUserWallet(currentUser.uid, 'My Wallet');
        const wallet = await updateUserWallet('', newWallet);
        wallets = [wallet];
    }
    const currentWallet = wallets.find(wallet => wallet.in_use);
    dispatch(setCurrentWallet(currentWallet));
    dispatch(addWallet(wallets));
}

const selectWallet = async (walletId) => {
    // Get the current wallet from state
    const currentWallet = state.currentWallet;

    // Set in_use to false for the current wallet and update it on Firebase
    if (currentWallet && currentWallet.in_use) {
        currentWallet.in_use = false;
        await updateUserWallet(currentWallet.wallet_id, currentWallet);
    }

    // Find the new wallet and set in_use to true, then update it on Firebase
    const newWallet = wallets.find(wallet => wallet.wallet_id === walletId);
    if (newWallet) {
        newWallet.in_use = true;
        await updateUserWallet(walletId, newWallet);
    }

    dispatch(setCurrentWallet(newWallet));
}


function createUserWallet(accountId, walletName) {
    return {
        wallet_id: '',
        wallet_name: walletName,
        balance: '0',
        currency_id: 'VND',
        account_id: accountId,
        in_use: true,
    };
}

const walletSlice = createSlice({
    name: 'wallet',
    initialState: {
        currentWallet: {
            wallet_id: '',
            wallet_name: '',
            balance: '0',
            currency_id: 'VND',
            account_id: '',
            in_use: true,
        },
        wallets: [],
    },
    reducers: {  
        addWallet: (state, action) => {
            state.wallets = action.payload;
        },
        updateWallet: (state, action) => {
            const index = state.wallets.findIndex(wallet => wallet.wallet_id === action.payload.wallet_id);
            if (index !== -1) {
                state.wallets[index] = action.payload;
            }
        },
        setCurrentWallet: (state, action) => {
            state.currentWallet = action.payload;
        },
        setWalletId: (state, action) => {
            state.currentWallet.wallet_id = action.payload;
        },
        setWalletName: (state, action) => {
            state.currentWallet.wallet_name = action.payload;
        },
        setBalance: (state, action) => {
            state.currentWallet.balance = action.payload;
        },
        setCurrencyId: (state, action) => {
            state.currentWallet.currency_id = action.payload;
        },
        setInUse: (state, action) => {
            state.currentWallet.in_use = action.payload;
        },
        setAccountId: (state, action) => {
            state.currentWallet.account_id = action.payload;
        },    
    },
});


export {
    getUserWallet,
    createUserWallet,
    updateUserWallet,
    initiateUserWallet,
    selectWallet,
};
export const {
    addWallet,
    updateWallet,
    setCurrentWallet,
    setWalletId,
    setWalletName,
    setBalance,
    setCurrencyId,
    setInUse,
    setAccountId,
    setWallet
} = walletSlice.actions;
export default walletSlice.reducer; 