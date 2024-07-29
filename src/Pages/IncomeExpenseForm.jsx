import React, { useState, useEffect } from "react";
import { useIncomeExpense } from "../components/context/IncomeExpenseContext";
import Layout from "../components/containers/Layouts/Layout";
import { FaCalendarAlt, FaDollarSign, FaPlus, FaTags, FaUser } from "react-icons/fa";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import axios from 'axios';

const IncomeExpenseForm = () => {
  const currentMonth = new Date().toISOString().slice(0, 7);
  const [month, setMonth] = useState(currentMonth);
  const [incomeList, setIncomeList] = useState([]);
  const [incomeName, setIncomeName] = useState("");
  const [incomeAmount, setIncomeAmount] = useState("");
  const [incomeType, setIncomeType] = useState("sueldo");
  const [salary, setSalary] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseType, setExpenseType] = useState("variable");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenses, setExpenses] = useState([]);

  const { updateData } = useIncomeExpense();
  const expenseCategories = ["Alimentación", "Transporte", "Servicios", "Entretenimiento", "Otros"];

  useEffect(() => {
    const fetchSalary = async () => {
      try {
        const response = await axios.get('/api/profile/salary');
        setSalary(response.data.salary);
      } catch (error) {
        console.error("Error al obtener el sueldo del perfil", error);
      }
    };
    fetchSalary();
  }, []);

  const handleAddIncome = () => {
    if (!incomeName || isNaN(parseFloat(incomeAmount))) {
      alert("Por favor, complete el nombre y el monto del ingreso.");
      return;
    }
    setIncomeList([
      ...incomeList,
      { name: incomeName, amount: parseFloat(incomeAmount), type: incomeType }
    ]);
    setIncomeName("");
    setIncomeAmount("");
    setIncomeType("sueldo");
  };

  const handleAddExpense = () => {
    if (!expenseName || isNaN(parseFloat(expenseAmount))) {
      alert("Por favor, complete el nombre y el monto del gasto.");
      return;
    }
    setExpenses([
      ...expenses,
      { name: expenseName, amount: parseFloat(expenseAmount), type: expenseType, category: expenseCategory }
    ]);
    setExpenseName("");
    setExpenseAmount("");
    setExpenseCategory("");
  };

  const handleUpdateSalary = async () => {
    if (isNaN(parseFloat(salary))) {
      alert("Por favor, ingrese un monto válido para el sueldo.");
      return;
    }
    try {
      await axios.post('/api/profile/update-salary', { salary: parseFloat(salary) });
      setIncomeList(prevIncomeList => [
        ...prevIncomeList.filter(income => income.type !== "sueldo"),
        { name: "Sueldo", amount: parseFloat(salary), type: "sueldo" }
      ]);
      alert("Sueldo actualizado correctamente.");
    } catch (error) {
      console.error("Error al actualizar el sueldo", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!month || incomeList.length === 0) {
      alert("Por favor, complete el mes y al menos un ingreso.");
      return;
    }
    const expenseData = expenses.reduce((acc, exp) => {
      acc[exp.name] = exp.amount;
      return acc;
    }, {});
    const typeData = expenses.reduce((acc, exp) => {
      acc[exp.name] = exp.type;
      return acc;
    }, {});
    const incomeData = incomeList.reduce((acc, inc) => {
      acc[inc.name] = inc.amount;
      return acc;
    }, {});
    updateData(month, incomeData, expenseData, typeData);
    setMonth(currentMonth);
    setIncomeList([]);
    setExpenses([]);
    setIncomeName("");
    setIncomeAmount("");
    setIncomeType("sueldo");
    setSalary("");
    setExpenseName("");
    setExpenseAmount("");
    setExpenseType("variable");
    setExpenseCategory("");
    alert("Datos actualizados correctamente.");
  };

  return (
    <Layout>
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          <FaUser className="mr-3 text-gray-500" />
          Sueldo
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 mb-4 items-center">
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="border rounded-lg py-2 px-4 flex-1"
            placeholder="Monto del sueldo"
          />
          <button
            type="button"
            onClick={handleUpdateSalary}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 flex items-center"
          >
            <FaPlus className="mr-2" />
            Actualizar Sueldo
          </button>
        </div>
        {incomeList.some(inc => inc.type === 'sueldo') && (
          <div className="bg-gray-200 p-4 rounded-lg mt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
              <RiMoneyDollarCircleFill className="mr-2 text-gray-500" />
              Sueldo Establecido
            </h3>
            <p className="text-xl font-bold text-gray-700">
              {incomeList.find(inc => inc.type === 'sueldo').amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} CLP
            </p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2 items-center">
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

        {/* Ingresos */}
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <RiMoneyDollarCircleFill className="mr-3 text-gray-500" />
            Ingresos
          </h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <input
                type="text"
                value={incomeName}
                onChange={(e) => setIncomeName(e.target.value)}
                className="border rounded-lg py-2 px-4 flex-1"
                placeholder="Nombre del ingreso"
              />
              <input
                type="number"
                value={incomeAmount}
                onChange={(e) => setIncomeAmount(e.target.value)}
                className="border rounded-lg py-2 px-4 flex-1"
                placeholder="Monto del ingreso"
              />
              <select
                value={incomeType}
                onChange={(e) => setIncomeType(e.target.value)}
                className="border rounded-lg py-2 px-4 flex-1"
              >
                <option value="sueldo">Sueldo</option>
                <option value="bono">Bono</option>
                <option value="transferencia">Transferencia</option>
              </select>
              <button
                type="button"
                onClick={handleAddIncome}
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 flex items-center"
              >
                <FaPlus className="mr-2" />
                Agregar Ingreso
              </button>
            </div>
            {incomeList.length > 0 && (
              <div className="bg-gray-100 p-4 rounded-lg mt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                  <FaDollarSign className="mr-2 text-gray-500" />
                  Ingresos Añadidos
                </h3>
                <ul className="list-disc list-inside">
                  {incomeList.map((income, index) => (
                    <li key={index} className="flex justify-between items-center mb-2">
                      <span>{income.name} ({income.type})</span>
                      <span>{income.amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} CLP</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Gastos */}
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <FaTags className="mr-3 text-gray-500" />
            Gastos
          </h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <input
                type="text"
                value={expenseName}
                onChange={(e) => setExpenseName(e.target.value)}
                className="border rounded-lg py-2 px-4 flex-1"
                placeholder="Nombre del gasto"
              />
              <input
                type="number"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                className="border rounded-lg py-2 px-4 flex-1"
                placeholder="Monto del gasto"
              />
              <select
                value={expenseType}
                onChange={(e) => setExpenseType(e.target.value)}
                className="border rounded-lg py-2 px-4 flex-1"
              >
                <option value="variable">Variable</option>
                <option value="fijo">Fijo</option>
              </select>
              <select
                value={expenseCategory}
                onChange={(e) => setExpenseCategory(e.target.value)}
                className="border rounded-lg py-2 px-4 flex-1"
              >
                <option value="">Seleccionar categoría</option>
                {expenseCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
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
              <div className="bg-gray-100 p-4 rounded-lg mt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                  <FaTags className="mr-2 text-gray-500" />
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
          Actualizar
        </button>
      </form>
    </Layout>
  );
};

export default IncomeExpenseForm;
