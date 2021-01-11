import {pacientConstants} from '../_constants/pacientConstants';
import {HYDRATE} from "next-redux-wrapper";

export default function pacients(state = {}, action) {

  if (action.type === HYDRATE) {
    return {
      ...state, // use previous state
      ...action.payload // apply delta from hydration
    };
  }

  switch (action.type) {

    case pacientConstants.SELECT:
      return Object.assign({}, state, {
        pacient: action.pacient
      });

    default:
      return state
  }
}