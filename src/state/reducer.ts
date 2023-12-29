
import { combineReducers } from '@reduxjs/toolkit';
import generalSliceReducer from './general';

const rootReducer = combineReducers({
    general: generalSliceReducer,
});

export default rootReducer
