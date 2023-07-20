import { configureStore } from '@reduxjs/toolkit';
import reducer from './project';

export default function () {
    return configureStore({
        reducer
    })
};