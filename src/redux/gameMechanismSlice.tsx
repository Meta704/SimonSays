// actionTypes.ts
const UPDATE_COLOR = 'simon/UPDATE_COLOR';

// actions.ts
export const updateColor = (payload: number) => ({ type: UPDATE_COLOR, payload });

// reducer.ts
export interface SimonState {
  currentColor: number;
}

// Initial state for Simon game
const initialState: SimonState = {
  currentColor: -1,
};

// Reducer function for handling Simon game actions
const gameMechanismReducer = (state = initialState, action: { type: string; payload?: any }) => {
  switch (action.type) {
    case UPDATE_COLOR:
      return { ...state, currentColor: action.payload };
    default:
      return state;
  }
};

// Export the Simon game reducer
export default gameMechanismReducer;
