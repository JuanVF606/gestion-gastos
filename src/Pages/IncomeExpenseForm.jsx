import React, { useState, useEffect } from "react";
import { useIncomeExpense } from "../components/context/IncomeExpenseContext";
import Layout from "../components/containers/Layouts/Layout";
import { FaCalendarAlt, FaDollarSign, FaPlus, FaListAlt, FaTag } from "react-icons/fa";

const IncomeExpenseForm = () => {
  const currentMonth = new Date().toISOString().slice(0, 7); // Obtiene el mes actual en formato YYYY-MM
  const [month, setMonth] = useState(currentMonth);
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseType, setExpenseType] = useState("variable");
  const [expenseCategory, setExpenseCategory] = useState("");
  const { updateData } = useIncomeExpense();

  const expenseCategories = [
    "Alquiler", "Servicios", "Alimentos", "Transporte", "Salud", "Educación", "Entretenimiento", "Otros"
  ];

  useEffect(() => {
    // Set the month to the current month when the component mounts
    setMonth(currentMonth);
  }, [currentMonth]);

  const handleAddExpense = () => {
    if (!expenseName || isNaN(parseFloat(expenseAmount))) {
      alert("Por favor, complete el nombre y el monto del gasto.");
      return;
    }
    setExpenses([
      ...expenses,
      { name: expenseName, amount: parseFloat(expenseAmount), type: expenseType, category: expenseCategory }
    ]);
    // Reset expense form
    setExpenseName("");
    setExpenseAmount("");
    setExpenseCategory("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!month || isNaN(parseFloat(income))) {
      alert("Por favor, complete el mes y el ingreso.");
      return;
    }
    
    const expense = expenses.reduce((acc, exp) => {
      acc[exp.name] = exp.amount;
      return acc;
    }, {});
    
    const type = expenses.reduce((acc, exp) => {
      acc[exp.name] = exp.type;
      return acc;
    }, {});
    
    updateData(month, parseFloat(income), expense, type);
    
    // Reset form
    setMonth(currentMonth); // Reset month to current
    setIncome("");
    setExpenses([]);
    alert("Datos actualizados correctamente.");
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
            <FaCalendarAlt className="mr-2 text-gray-500" />
            Mes
          </label>
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border rounded-lg py-2 px-4 w-full"
            placeholder="Seleccione el mes"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
            <FaDollarSign className="mr-2 text-gray-500" />
            Ingreso (CLP)
          </label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="border rounded-lg py-2 px-4 w-full"
            placeholder="Ingrese sus ingresos"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
            <FaListAlt className="mr-2 text-gray-500" />
            Gastos
          </label>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center">
              <input
                type="text"
                value={expenseName}
                onChange={(e) => setExpenseName(e.target.value)}
                className="border rounded-lg py-2 px-4 w-full"
                placeholder="Nombre del gasto"
              />
              <input
                type="number"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                className="border rounded-lg py-2 px-4 w-full"
                placeholder="Monto del gasto"
              />
              <select
                value={expenseType}
                onChange={(e) => setExpenseType(e.target.value)}
                className="border rounded-lg py-2 px-4 w-full"
              >
                <option value="variable">Variable</option>
                <option value="fijo">Fijo</option>
              </select>
              <select
                value={expenseCategory}
                onChange={(e) => setExpenseCategory(e.target.value)}
                className="border rounded-lg py-2 px-4 w-full"
              >
                <option value="">Categoría</option>
                {expenseCategories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleAddExpense}
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 flex items-center"
              >
                <FaPlus className="mr-2" />
                Agregar Gasto
              </button>
            </div>
            {expenses.length > 0 && (
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                  <FaListAlt className="mr-2 text-gray-500" />
                  Gastos Añadidos
                </h3>
                <ul className="list-disc list-inside">
                  {expenses.map((expense, index) => (
                    <li key={index} className="flex justify-between items-center mb-2">
                      <span>{expense.name} ({expense.category})</span>
                      <span>{expense.amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} CLP</span>
                      <span className={`text-sm ${expense.type === 'fijo' ? 'text-green-500' : 'text-blue-500'}`}>
                        {expense.type === 'fijo' ? 'Fijo' : 'Variable'}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 flex items-center"
        >
          <FaDollarSign className="mr-2" />
          Guardar Presupuesto
        </button>
      </form>
    </Layout>
  );
};

export default IncomeExpenseForm;
