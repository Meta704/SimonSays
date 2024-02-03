// actionTypes.ts
const HIDE_MODAL = 'modal/HIDE_MODAL';
const SHOW_MODAL = 'modal/SHOW_MODAL';

// actions.ts
export const hideNameModal = () => ({ type: HIDE_MODAL });
export const showNameModal = () => ({ type: SHOW_MODAL });

// reducer.ts
export interface ModalState {
  showNameModal: boolean;
}

// Initial state for the name modal
const initialState: ModalState = {
  showNameModal: false,
};

// Reducer function for handling name modal actions
const nameModalReducer = (state = initialState, action: { type: string }) => {
  switch (action.type) {
    case HIDE_MODAL:
      return { ...state, showNameModal: false };
    case SHOW_MODAL:
      return { ...state, showNameModal: true };
    default:
      return state;
  }
};

// Export the name modal reducer
export default nameModalReducer;
