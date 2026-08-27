import {useState, useEffect} from 'react'
import axios from 'axios'




const RecentTransactions = () => {
  const [data, setData] = useState([]);
  const userId = localStorage.getItem("user_id");
  console.log(`http://localhost:5000/transactions/${userId}`);
useEffect(()=>{
  const getTransaction = async () =>{
try{
  const response = await axios.get(`http://localhost:5000/transactions/${userId}`); 
  setData(response.data)
}
catch(err){
  console.log (err);
}
  }
  getTransaction();
}, [])
  return (
    <div className='transaction-container'>
       <div className="trans-header">
        <h3>Recent Transactions</h3>
        <button>This Month</button>
       </div>
       <div className="trans-title">
        <p>Transaction Name</p>
        <p>Account</p>
        <p>Date and Time</p>
        <p>Amount</p>
        
       </div>
       <hr className='trans-lb'></hr>
       {data.map(item =>(
<div className="trans-content">
         <div className="res-text">
             <p>{item.transaction_source}</p>
          </div>
            <div className="res-text">
            <p>{item.transcation_type}</p>
          </div>
          
           <div className="res-text">
            <p> {new Date(item.transaction_date).toLocaleDateString()}</p>
          </div>
         
            <div className="res-text">
            <p>{item.amount}</p>
          </div>
        
       </div>
       ))}
       
      
    </div>
  )
}

export default RecentTransactions
