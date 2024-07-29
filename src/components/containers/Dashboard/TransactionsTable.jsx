import React from "react";
import { motion } from "framer-motion";
const TransactionsTable = () => {
  return (
    <motion.div
      className="bg-white p-4 rounded-lg shadow-lg overflow-x-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <h3 className="text-lg font-semibold">Transacciones Recientes</h3>
      <div className="w-full">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Fecha
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Descripción
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Monto
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-4 py-2 text-sm text-gray-900">01/07/2024</td>
              <td className="px-4 py-2 text-sm text-gray-900">
                Compra de Comida
              </td>
              <td className="px-4 py-2 text-sm text-gray-900">$50</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-sm text-gray-900">03/07/2024</td>
              <td className="px-4 py-2 text-sm text-gray-900">
                Pago de Alquiler
              </td>
              <td className="px-4 py-2 text-sm text-gray-900">$500</td>
            </tr>
            {/* Más transacciones */}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default TransactionsTable;
