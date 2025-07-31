import { combineReducers } from '@reduxjs/toolkit';
import modalReducer from '../store/modalSlice.ts';
import userReducer from '../store/userSlice.ts'; // импорт слайса

const rootReducer = combineReducers({
    modal: modalReducer,
    user: userReducer // добавляем
});

export default rootReducer;
