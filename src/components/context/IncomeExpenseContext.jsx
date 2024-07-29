// IncomeExpenseContext.js
import React, { createContext, useState, useContext } from 'react';

const IncomeExpenseContext = createContext();

export const useIncomeExpense = () => useContext(IncomeExpenseContext);

export const IncomeExpenseProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [monthsWithBudget, setMonthsWithBudget] = useState([]);

  const updateData = (month, income, expenses, types) => {
    setData(prevData => {
      const newData = {
        ...prevData,
        [month]: { income, expenses, types }
      };
      
      // Update the list of months with budgets
      if (!monthsWithBudget.includes(month)) {
        setMonthsWithBudget([...monthsWithBudget, month]);
      }
      
      return newData;
    });
  };

  return (
    <IncomeExpenseContext.Provider value={{ data, updateData, monthsWithBudget }}>
      {children}
    </IncomeExpenseContext.Provider>
  );
};
