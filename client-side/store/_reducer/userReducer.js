import {userConstants} from '../_constants/userConstants';
import {HYDRATE} from "next-redux-wrapper";

export default function users(state = {}, action) {

  if (action.type === HYDRATE) {
    return {
      ...state, // use previous state
      ...action.payload // apply delta from hydration
    };
  }
  
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {
        loggedIn: false
      };
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}