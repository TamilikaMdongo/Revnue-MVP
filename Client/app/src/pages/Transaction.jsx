import React from 'react'
import Sidebar from '../components/Sidebar'
import TransactionCard from '../components/TransactionCard'
const Transaction = () => {
  return (
    <div className="transactions">
      <Sidebar/>
      <div className="main-content">
        <div className="header">
          <h1>Transactions</h1>
          <div className="header-child">
            <p>John Doe</p>
            <div className="circle-avatar"></div>
          </div>
          
          
        </div>
        
        
        <TransactionCard/>
          
         
        
      </div>
    </div>
    
  )
}

export default Transaction
