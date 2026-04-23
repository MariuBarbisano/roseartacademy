import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import galleriesReducer from './slices/galleriesSlice';
import artworksReducer from './slices/artworksSlice';
import categoriesReducer from './slices/categoriesSlice';
import contactReducer from './slices/contactSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    galleries: galleriesReducer,
    artworks: artworksReducer,
    categories: categoriesReducer,
    contact: contactReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
