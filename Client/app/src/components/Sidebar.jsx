import React from 'react'
import {FaBeer, FaPersonBooth, FaFileInvoice, FaMoneyBill, FaHome, FaFileInvoiceDollar, FaTeeth, FaCog} from 'react-icons/fa'
import { Link } from 'react-router-dom'


const Sidebar = () => {
  
  var navlinks = [
    {label:'Dashboard', icon: <FaHome/>, path:'/'},
    {label:'Transactions', icon: <FaMoneyBill/>, path:'/transaction'},
    {label:'Invoices', icon: <FaFileInvoiceDollar/> , path:'/invoice'},
    {label:'Profile', icon: <FaPersonBooth/>, path:'/profile'},
    {label:'Settings', icon: <FaCog/>, path:'/settings'},
  ]
    return (
    <div className='side-bar'>
      
      <ul>
       {navlinks?.map((item, index) => (
  <li key={item.path}>
    <Link to={item.path}>
    {item.icon}  
    <span style={{marginLeft:'10px', color:'black'}} > {item.label}</span> </Link>
     
  </li>
  
))}
      </ul>
      
    </div>
  )
}

export default Sidebar
