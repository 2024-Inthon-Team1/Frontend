// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import profileReducer from './profileSlice'; // profileSlice 추가

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer, // profile 리듀서 추가
  },
});

export default store;
