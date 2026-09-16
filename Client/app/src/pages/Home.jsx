import '../App.css'
import Sidebar from '../components/Sidebar'
import DashCard from '../components/DashCard'
import data from '../components/Cards.json'
import Dashboard from '../components/Dashboard'
import RecentTransactions from '../components/RecentTransactions'
const Home = () => {
  return (
     <div className="home">
      <Sidebar/>
      <div className="main-content">
        <div className="header">
          <div><span className="eyebrow">Overview</span><h1>Dashboard</h1></div>
          <div className="header-child">
            <div className="user-copy"><strong>John Doe</strong><span>Personal account</span></div>
            <div className="circle-avatar" aria-label="John Doe profile picture"></div>
          </div>
        </div>
        <div className="dashboard-layout">
          <section className='dash-card-container' aria-label="Financial summary">
            {data.map(item =>(<DashCard key={item.id} data={item}/>))}
          </section>
          <Dashboard/>
          <RecentTransactions/>
        </div>
      </div>
    </div>
  )
}

export default Home
