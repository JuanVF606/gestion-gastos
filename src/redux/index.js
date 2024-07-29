import { combineReducers } from "redux";
import auth from "./reducers/auth/auth";
import incomeExpenseReducer from "./reducers/payments/payments";
import expenseReducer from "./reducers/expenses/expenses";
export default combineReducers({
  // Add your reducers here
  null: (state = null) => state,
  auth,
  incomeExpenseReducer,
  expenseReducer,
});
