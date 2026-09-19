import {FaPersonBooth, FaMoneyBill, FaHome, FaFileInvoiceDollar, FaCog} from 'react-icons/fa'
import { NavLink } from 'react-router-dom'


const Sidebar = () => {
  
  var navlinks = [
    {label:'Dashboard', icon: <FaHome/>, path:'/home'},
    {label:'Transactions', icon: <FaMoneyBill/>, path:'/transaction'},
    {label:'Invoices', icon: <FaFileInvoiceDollar/> , path:'/invoice'},
    {label:'Profile', icon: <FaPersonBooth/>, path:'/profile'},
    {label:'Settings', icon: <FaCog/>, path:'/settings'},
  ]
    return (
    <div className='side-bar'>
      <div className="sidebar-brand"><span>R</span><strong>Revnue</strong></div>
      <ul>
       {navlinks?.map((item) => (
  <li key={item.path}>
    <NavLink to={item.path} className={({isActive}) => isActive ? 'active' : ''}>
      {item.icon}<span>{item.label}</span>
    </NavLink>
  </li>
  
))}
      </ul>
      <div className="sidebar-footer"><span>R</span><div><strong>Revnue MVP</strong><small>Cash flow, simplified.</small></div></div>
    </div>
  )
}

export default Sidebar
