import React from 'react'
import { registerCharts } from './registerCharts';
import LineChart from './LineChart'
registerCharts();
const Dashboard = () => {
  return (
    <div className='Dashboard'>
      <h3> Cashflow</h3>
      <p>Total Balance</p>
      <p>R35,000</p>
        <div className="graph-container">

        <LineChart />

      </div>
    </div>
  )
}

export default Dashboard
