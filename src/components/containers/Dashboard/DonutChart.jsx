import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { motion } from 'framer-motion'
const DonutChart = ({doughnutChartData}) => {
  return (
    <motion.div
    className="bg-white p-4 rounded-lg shadow-lg"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.4 }}
  >
    <h3 className="text-lg font-semibold">Distribución de Gastos</h3>
    <div className="h-64 w-full">
      <Doughnut data={doughnutChartData} />
    </div>
  </motion.div>
  )
}

export default DonutChart