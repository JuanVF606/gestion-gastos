import { combineReducers } from "redux";
import auth from "./reducers/auth/auth";
export default combineReducers({
  // Add your reducers here
  null: (state = null) => state,
  auth,
});
