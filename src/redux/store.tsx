import { configureStore } from '@reduxjs/toolkit';
import sequenceReducer from './sequenceSlice';
import gameMechanismReducer from './gameMechanismSlice';
import nameModalReducer from './nameModalSlice';

// Create Redux store with combined reducers
export const store = configureStore({
  reducer: {
    // Reducer for managing the user's sequence
    userSequence: sequenceReducer,

    // Reducer for managing the game's sequence and mechanics
    gameSequence: gameMechanismReducer,

    // Reducer for handling the state of the name modal
    nameModal: nameModalReducer,
  },
});

// Define the RootState type for type-safe access to the Redux store state
export type RootState = ReturnType<typeof store.getState>;

// Define the AppDispatch type for type-safe dispatching of actions
export type AppDispatch = typeof store.dispatch;
