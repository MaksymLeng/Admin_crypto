import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {ModalState} from "../Types/Types.tsx";

const initialState: ModalState = {
    showArr: [true, false,false],
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
