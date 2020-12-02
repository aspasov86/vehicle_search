import { VS_AUTH } from '../constants/constants';

const initialState = { token: null };

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHECK_IF_LOGGED_IN':
      return { token: localStorage.getItem(VS_AUTH) };
    case 'LOGIN':
      localStorage.setItem(VS_AUTH, action.payload);
      return { token: action.payload };
    case 'LOGOUT':
      localStorage.removeItem(VS_AUTH);
      return { token: null };
    default:
      return state;
  }
};

export default rootReducer;
