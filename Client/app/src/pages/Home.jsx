import React from 'react'
import '../App.css'
import Sidebar from '../components/Sidebar'
import DashCard from '../components/DashCard'
import data from '../components/Cards.json'
import Dashboard from '../components/Dashboard'
import RecentTransactions from '../components/RecentTransactions'
import axios from 'axios'


const Home = () => {


  return (
     <div className="home">
      <Sidebar/>
      <div className="main-content">
        <div className="header">
          <h1>Dashboard</h1>
          <div className="header-child">
            <p>John Doe</p>
            <div className="circle-avatar"></div>
          </div>
          
          
        </div>
        
        <div className='dash-card-container'>
        {data.map(item =>(
      <DashCard key={item.id} data = {item}/>
        ))}
        </div>
        
          
         <Dashboard/>
         <div className='space'></div>
         <RecentTransactions/>
        
      </div>
    </div>
  )
}

export default Home
