import '../App.css'
import Sidebar from '../components/Sidebar'
import DashCard from '../components/DashCard'
import data from '../components/Cards.json'
import Dashboard from '../components/Dashboard'
import RecentTransactions from '../components/RecentTransactions'
import axios from 'axios'
import { useState, useEffect } from 'react'


const Home = () => {
  const user = {
    first_name:''
  } 
const [userData, setUserData] = useState({
  first_name: ""
});
const userId = localStorage.getItem('user_id')
useEffect(() => {
   
  const getUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/users/profile/${userId}`
      );

      setUserData({
        first_name: response.data.first_name
      });

    } catch (error) {
      console.log(error);
    }
  };

  getUser();
}, [userId]);

  return (
     <div className="home">
      <Sidebar/>
      <div className="main-content">
        <div className="header">
          <div><span className="eyebrow">Overview</span><h1>Dashboard</h1></div>
          <div className="header-child">
            <div className="user-copy"><strong>{userData.first_name}</strong><span>Personal account</span></div>
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
