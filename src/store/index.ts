import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Configuration de la persistance
const persistConfig = {
  key: "root", // clé pour le stockage
  storage, // moteur de stockage (localStorage)
  // whitelist: ['counter'], // optionnel : persister uniquement certains reducers
  // blacklist: [], // optionnel : exclure certains reducers
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignorer les actions de redux-persist pour éviter les erreurs de sérialisation
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Créer le persistor
export const persistor = persistStore(store);

// Types pour TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
