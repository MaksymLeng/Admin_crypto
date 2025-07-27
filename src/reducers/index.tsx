import { combineReducers } from '@reduxjs/toolkit';
import modalReducer from './modalSlice';

const rootReducer = combineReducers({
    modal: modalReducer
});

export default rootReducer;
