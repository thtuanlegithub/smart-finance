import { createSlice } from "@reduxjs/toolkit";
import { FirebaseNodes } from "../../../data/firebaseConstant";
import { getCurrentUser } from "../../authentication";
import { FirestoreSingleton } from "../../../patterns";

const firestoreInstance = FirestoreSingleton.getInstance().getFirestore();
const userCollection = firestoreInstance.collection(FirebaseNodes.USERS);

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const updateNewLimit = async (limit_id, newLimit) => {
    try {
        const uid = getCurrentUser().uid;
        const userRef = userCollection.doc(uid);
        const limitRef = userRef.collection('limits');

        if (limit_id) {
            const docRef = limitRef.doc(limit_id);
            await docRef.set(newLimit, { merge: true });
        } else {
            const docRef = await limitRef.add(newLimit);
            await docRef.update({ limit_id: docRef.id });
        }
    } catch (error) {
        console.error(error)
    }
}

const initialState = {
    addLimitBottomSheetDisplay: null,
    addLimitTimeRange: null,
    addLimitTimeRangeStart: null,
    addLimitTimeRangeEnd: null,
    addLimitCategory: null,
    addLimitWallet: null,
    addLimitAmount: 0,
}
const addLimitSlice = createSlice({
    name: 'addLimit',
    initialState,
    reducers: {
        setAddLimitBottomSheetDisplay: (state, action) => {
            state.addLimitBottomSheetDisplay = action.payload;
        },
        setAddLimitTimeRange: (state, action) => {
            state.addLimitTimeRange = action.payload;
        },
        setAddLimitTimeRangeStart: (state, action) => {
            state.addLimitTimeRangeStart = action.payload;
        },
        setAddLimitTimeRangeEnd: (state, action) => {
            state.addLimitTimeRangeEnd = action.payload;
        },
        setAddLimitCategory: (state, action) => {
            state.addLimitCategory = action.payload;
        },
        setAddLimitWallet: (state, action) => {
            state.addLimitWallet = action.payload;
        },
        setAddLimitAmount: (state, action) => {
            state.addLimitAmount = action.payload;
        },
        clearAddLimitTimeRange: (state) => {
            state.addLimitTimeRange = null;
            state.addLimitTimeRangeStart = null;
            state.addLimitTimeRangeEnd = null;
        },
    }
})

export const { 
    setAddLimitBottomSheetDisplay, 
    setAddLimitTimeRange, 
    setAddLimitTimeRangeStart, 
    setAddLimitTimeRangeEnd, 
    setAddLimitAmount,
    clearAddLimitTimeRange 
} = addLimitSlice.actions

export {
    updateNewLimit,
}

export default addLimitSlice.reducer;