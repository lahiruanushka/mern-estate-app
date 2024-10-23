import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/theme/themeSlice";
import userReducer from "./features/user/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Combine reducers
const rootReducer = combineReducers({
  theme: themeReducer,
  user: userReducer,  
});

// Configuration for persisting the Redux state
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

// Persist the combined reducers
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with persisted reducers
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Persist the store
export const persistor = persistStore(store);
