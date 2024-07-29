import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { FaDollarSign, FaArrowDown, FaBalanceScale } from 'react-icons/fa';
import { useIncomeExpense } from '../../context/IncomeExpenseContext';

const Resume = () => {
  const { income, expenses, balance } = useIncomeExpense();

  const numberIncomeProps = useSpring({
    from: { number: 0 },
    number: income,
    config: { duration: 1000 },
    reset: true,
  });

  const numberExpensesProps = useSpring({
    from: { number: 0 },
    number: expenses,
    config: { duration: 1000 },
    reset: true,
  });

  const numberBalanceProps = useSpring({
    from: { number: 0 },
    number: balance,
    config: { duration: 1000 },
    reset: true,
  });

  const renderAnimatedNumber = (props) => (
    <animated.p className="text-2xl font-bold text-gray-900">
      {props.number.to(n => `CLP ${n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`)}
    </animated.p>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-4 rounded-lg shadow-lg flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Total de Ingresos</h3>
          {renderAnimatedNumber(numberIncomeProps)}
        </div>
        <FaDollarSign className="w-12 h-12 text-green-500" />
      </div>
      <div className="bg-white p-4 rounded-lg shadow-lg flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Total de Gastos</h3>
          {renderAnimatedNumber(numberExpensesProps)}
        </div>
        <FaArrowDown className="w-12 h-12 text-red-500" />
      </div>
      <div className="bg-white p-4 rounded-lg shadow-lg flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Saldo Actual</h3>
          {renderAnimatedNumber(numberBalanceProps)}
        </div>
        <FaBalanceScale className="w-12 h-12 text-blue-500" />
      </div>
    </div>
  );
};

export default Resume;
