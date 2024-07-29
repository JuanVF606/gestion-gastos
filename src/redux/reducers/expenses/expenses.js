import { UPDATE_EXPENSES_REQUEST, UPDATE_EXPENSES_SUCCESS, UPDATE_EXPENSES_FAILURE } from '../../actions/Expenses/expenses';

const initialState = {
  loading: false,
  error: null,
  success: false,
};

const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_EXPENSES_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_EXPENSES_SUCCESS:
      return { ...state, loading: false, success: true };
    case UPDATE_EXPENSES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default expenseReducer;
