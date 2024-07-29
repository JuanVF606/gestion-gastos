import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes/Routes.js";
import "./App.css";
import store from "./store.js";
import { check_authenticated } from "./redux/actions/auth/auth.js";
import { useEffect } from "react";
import { IncomeExpenseProvider } from './components/context/IncomeExpenseContext.jsx';
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <IncomeExpenseProvider>
        <AppContent />

        </IncomeExpenseProvider>
      </BrowserRouter>
    </Provider>
  );
}

const AppContent = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    // Verifica si el usuario está autenticado al montar el componente
    dispatch(check_authenticated());
  }, [dispatch]);

  return <AppRoutes isAuthenticated={isAuthenticated} />;
};


export default App;
