// actionTypes.ts
const SEQUENCE_RESET = 'sequence/SEQUENCE_RESET';
const ADD_PRESS = 'sequence/ADD_PRESS';

// actions.ts
export const sequenceReset = () => ({ type: SEQUENCE_RESET });
export const addPress = (payload: number) => ({ type: ADD_PRESS, payload });

// reducer.ts
export interface SequenceState {
  sequence: number[];
}

// Initial state for the sequence
const initialState: SequenceState = {
  sequence: [],
};

// Reducer function for handling sequence actions
const sequenceReducer = (state = initialState, action: { type: string; payload?: any }) => {
  switch (action.type) {
    case SEQUENCE_RESET:
      return { ...state, sequence: [] };
    case ADD_PRESS:
      return { ...state, sequence: [...state.sequence, action.payload] };
    default:
      return state;
  }
};

// Export the sequence reducer
export default sequenceReducer;
