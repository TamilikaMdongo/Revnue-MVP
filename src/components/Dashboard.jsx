import { registerCharts } from './registerCharts';
import LineChart from './LineChart'
registerCharts();
const Dashboard = () => {
  return (
    <div className='Dashboard'>
      <div className="panel-heading">
        <div><span className="eyebrow">Performance</span><h2>Cash flow</h2></div>
        <span className="period-control">Last 7 days</span>
      </div>
      <div className="graph-container">
        <LineChart />
      </div>
    </div>
  )
}

export default Dashboard
