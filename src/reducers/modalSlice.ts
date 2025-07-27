import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
    showArr: boolean[];
    rates: string[];
    selectedRate: string;
    showRecovery: boolean;
}

const initialState: ModalState = {
    showArr: [true, false],
    rates: ["LOW", "MEDIUM", "HIGH"],
    selectedRate: "LOW",
    showRecovery: false
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setShow(state, action: PayloadAction<number>) {
            state.showArr[action.payload] = !state.showArr[action.payload];
        },
        setRate(state, action: PayloadAction<string>) {
            state.selectedRate = action.payload;
        },
        setRecovery(state) {
            state.showRecovery = !state.showRecovery;
        }
    }
});

export const { setShow, setRate, setRecovery } = modalSlice.actions;
export default modalSlice.reducer;
