import React from "react";
import DonutChart from "./DonutChart";
import TransactionsTable from "./TransactionsTable";
const MoreInfo = ({ doughnutChartData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <DonutChart doughnutChartData={doughnutChartData} />
      <TransactionsTable />
    </div>
  );
};

export default MoreInfo;
