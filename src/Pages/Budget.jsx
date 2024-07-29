import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useIncomeExpense } from "../components/context/IncomeExpenseContext";
import Layout from "../components/containers/Layouts/Layout";
const BudgetTable = () => {
  const { data, removeFixedExpense, editExpense } = useIncomeExpense();

  // Orden de los meses
  const monthOrder = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const sortedMonths = Object.keys(data).sort((a, b) => {
    return monthOrder.indexOf(a) - monthOrder.indexOf(b);
  });

  const handleEditClick = (month, expenseName) => {
    // Trigger edit functionality
    editExpense(month, expenseName);
  };

  return (
    <Layout>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedMonths.map((month) => {
        const { income, expense, type } = data[month];
        const expenseList = Object.keys(expense).map((key, index) => (
          <tr key={index} className="hover:bg-gray-50 transition">
            <td className="py-2 px-4 text-gray-700">
              {key} <span className="text-gray-500">({type[key]})</span>
            </td>
            <td className="py-2 px-4 text-right text-gray-900">
              {expense[key].toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} CLP
            </td>
            <td className="py-2 px-4 text-right">
              <button
                onClick={() => handleEditClick(month, key)}
                className="text-blue-500 hover:text-blue-700 mr-2"
                aria-label={`Editar ${key}`}
              >
                <FaEdit />
              </button>
              <button
                onClick={() => removeFixedExpense(month, key)}
                className="text-red-500 hover:text-red-700"
                aria-label={`Eliminar ${key}`}
              >
                <FaTrash />
              </button>
            </td>
          </tr>
        ));

        const totalExpenses = Object.values(expense).reduce((acc, val) => acc + val, 0);
        const balance = income - totalExpenses;

        return (
          <div key={month} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Presupuesto del mes de {month}
              </h2>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Ingreso Total</h3>
              <p className="text-xl font-bold text-gray-900">
                {income.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} CLP
              </p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Gastos</h3>
              <table className="w-full border border-gray-300 border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-600">
                    <th className="py-2 px-4 text-left">Descripción</th>
                    <th className="py-2 px-4 text-right">Monto</th>
                    <th className="py-2 px-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {expenseList.length > 0 ? expenseList : (
                    <tr>
                      <td colSpan="3" className="py-2 px-4 text-center text-gray-500">No hay gastos registrados.</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="mt-4">
                <p className="text-lg font-semibold text-gray-800">Total de Gastos</p>
                <p className="text-xl font-bold text-gray-900">
                  {totalExpenses.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} CLP
                </p>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-semibold text-gray-800">Saldo Disponible</h3>
              <p className="text-xl font-bold text-gray-900">
                {balance.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} CLP
              </p>
            </div>
          </div>
        );
      })}
    </div>
    </Layout>
  );
};

export default BudgetTable;
