import React, { createContext, useState, useContext } from "react";

const IncomeExpenseContext = createContext();

export const IncomeExpenseProvider = ({ children }) => {
  const [data, setData] = useState({});

  const updateData = (month, income, expense, type) => {
    setData(prevData => ({
      ...prevData,
      [month]: {
        income: (prevData[month]?.income || 0) + income,
        expense: {
          ...prevData[month]?.expense,
          ...expense
        },
        type: {
          ...prevData[month]?.type,
          ...type
        }
      }
    }));
  };

  const removeFixedExpense = (month) => {
    setData(prevData => {
      const { [month]: removed, ...rest } = prevData;
      return rest;
    });
  };

  const calculateTotals = () => {
    const totalIncome = Object.values(data).reduce((acc, item) => acc + item.income, 0);
    const totalExpense = Object.values(data).reduce((acc, item) => {
      return acc + Object.values(item.expense).reduce((subAcc, val) => subAcc + val, 0);
    }, 0);
    return {
      income: totalIncome,
      expenses: totalExpense,
      balance: totalIncome - totalExpense
    };
  };

  return (
    <IncomeExpenseContext.Provider value={{ ...calculateTotals(), data, updateData, removeFixedExpense }}>
      {children}
    </IncomeExpenseContext.Provider>
  );
};

export const useIncomeExpense = () => useContext(IncomeExpenseContext);
