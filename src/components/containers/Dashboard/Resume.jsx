import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../redux/actions/payments/payments';
import { FaListAlt, FaDollarSign } from 'react-icons/fa';

const Resume = () => {
  const dispatch = useDispatch();
  const { data, error } = useSelector((state) => state);
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Resumen</h2>
        <p className="text-gray-500">Hubo un error al cargar los datos.</p>
      </div>
    );
  }

  if (!data[currentMonth]) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Resumen</h2>
        <p className="text-gray-500">No hay datos disponibles para el mes actual.</p>
      </div>
    );
  }

  const { income, expenses, types } = data[currentMonth];
  const totalExpenses = Object.values(expenses).reduce((acc, val) => acc + val, 0);
  const balance = income - totalExpenses;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Resumen del Mes de {currentMonth}</h2>
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <FaDollarSign className="mr-2 text-gray-500" />
          <span className="text-lg font-semibold text-gray-800">Ingreso Total:</span>
        </div>
        <p className="text-xl font-bold text-gray-900">{income.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} CLP</p>
      </div>
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <FaListAlt className="mr-2 text-gray-500" />
          <span className="text-lg font-semibold text-gray-800">Gastos Totales:</span>
        </div>
        <ul className="list-disc list-inside">
          {Object.keys(expenses).map((key, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <span>{key} ({types[key]})</span>
              <span>{expenses[key].toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} CLP</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center mb-2">
          <FaDollarSign className="mr-2 text-gray-500" />
          <span className="text-lg font-semibold text-gray-800">Saldo Disponible:</span>
        </div>
        <p className="text-xl font-bold text-gray-900">{balance.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} CLP</p>
      </div>
    </div>
  );
};

export default Resume;
