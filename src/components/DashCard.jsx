import { useState, useEffect } from 'react';
import iconMap from './IconMap';
import axios from 'axios'

const DashCard = ({data}) => {
  const API_URL = "https://revnue-mvp.onrender.com"
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const getTransactions = async () => {
      try {
        const response = await axios.get(`${API_URL}/transactions/${userId}`);
        setTransactions(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getTransactions();
  }, []);

  const transactionType = data.name.toLowerCase();
  const total = transactions
    .filter((transaction) => transaction.transcation_type?.toLowerCase() === transactionType)
    .reduce((sum, transaction) => sum + Math.abs(Number(transaction.amount) || 0), 0);
  const formattedTotal = new Intl.NumberFormat('en-ZA', {
    style: 'currency', currency: 'ZAR', maximumFractionDigits: 2,
  }).format(total);
  const Icon = iconMap[data.icon];

  return (
    <article className='dash-card'>
      <div className="card-topline">
        <div className="content">
          <span className={`dash-icon-wrap ${transactionType}`}>
            {Icon && <Icon className='dash-icon'/>}
          </span>
          <p>{data.name}</p>
        </div>
        <span className={`card-status ${transactionType}`}>
          {transactionType === 'income' ? 'Money in' : 'Money out'}
        </span>
      </div>
      <div className="amount">
        <p>{loading ? 'Loading…' : formattedTotal}</p>
        <span>Total recorded</span>
      </div>
    </article>
  )
}

export default DashCard
