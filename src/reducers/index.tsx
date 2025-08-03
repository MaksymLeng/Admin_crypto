import { combineReducers } from '@reduxjs/toolkit';
import modalReducer from '../store/modalSlice.ts';
import userReducer from '../store/userSlice.ts'; // импорт слайса
import apiKeyReducer from '../store/apiKeySlice';

const rootReducer = combineReducers({
    modal: modalReducer,
    user: userReducer,
    apiKey: apiKeyReducer,
});

export default rootReducer;
