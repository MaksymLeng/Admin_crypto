import { combineReducers } from '@reduxjs/toolkit';
import modalReducer from '../store/modalSlice.ts';
import userReducer from '../store/userSlice.ts'; // импорт слайса
import apiKeyReducer from '../store/apiKeySlice';
import tradeSlice from "../store/tradeSlice.ts";

const rootReducer = combineReducers({
    modal: modalReducer,
    user: userReducer,
    apiKey: apiKeyReducer,
    trades: tradeSlice,
});

export default rootReducer;
