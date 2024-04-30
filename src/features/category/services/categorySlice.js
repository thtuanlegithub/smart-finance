import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CategoryFields, FirebaseNodes } from "../../../data/firebaseConstant";
import { FirestoreSingleton } from "../../../patterns";
const firestoreInstance = FirestoreSingleton.getInstance().getFirestore();
const categoryCollection = firestoreInstance.collection(FirebaseNodes.CATEGORY);

function createCategory(name, imagePath) {
    const id = name.toLowerCase().replace(/\s+/g, '');
    const category = {
        id,
        name,
        imagePath,
    };
    return category;
}

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        currentCategory: {
            id: 'placeholdericon',
            name: '',
        },
    },
    reducers: {
        addCategory: (state, action) => {
            state.categories = action.payload;
        },
        setCurrentCategory: (state, action) => {
            state.currentCategory = action.payload;
        },
        updateCategory: (state, action) => {
            const updatedCategory = action.payload;
            const index = state.categories.findIndex(category => category.id === updatedCategory.id);
            state.categories[index] = updatedCategory;
        },
    },
});

export const {
    addCategory,
    setCurrentCategory,
    updateCategory,
} = categorySlice.actions;
export default categorySlice.reducer;