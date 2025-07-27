import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {ModalState} from "../Types/Types.tsx";

const initialState: ModalState = {
    showArr: [true, false,false],
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setShow(state, action: PayloadAction<number>) {
            state.showArr[action.payload] = !state.showArr[action.payload];
        }
    }
});

export const {setShow} = modalSlice.actions;
export default modalSlice.reducer;
