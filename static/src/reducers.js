import { combineReducers } from "redux";
import { LOG_IN } from "./actions.js";

function login(state = {}, action) {
  switch (action.type) {
    case LOG_IN:
      return action.userData;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  login
});

export default rootReducer;
