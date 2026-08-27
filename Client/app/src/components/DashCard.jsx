import React from 'react'
import iconMap from './IconMap';

const DashCard = ({data}) => {
  const Icon =iconMap[data.icon];
  return (
    <div className='dash-card'>
      <div className="content">
         {Icon && <Icon className ='dash-icon'/>}
        <p>{data.name}</p>
      </div>
     
        <div className="amount">
  <p>{data.value}</p>
        </div>
      
       
      
    </div>
  )
}

export default DashCard
