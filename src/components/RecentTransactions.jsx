import {useState, useEffect} from 'react'
import axios from 'axios'

const RecentTransactions = () => {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("user_id");

  useEffect(()=>{
    const getTransaction = async () =>{
      const API_URL = "https://revnue-mvp.onrender.com"
      try {
        const response = await axios.get(`${API_URL}/transactions/${userId}`);
        setData(response.data)
      } catch(err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    getTransaction();
  }, [userId])

  return (
    <section className='transaction-container'>
      <div className="trans-header">
        <div><span className="eyebrow">Latest activity</span><h2>Recent transactions</h2></div>
        <span className="period-control">This month</span>
      </div>
      <div className="table-scroll">
        <div className="trans-title">
          <p>Transaction</p><p>Type</p><p>Date</p><p>Amount</p>
        </div>
        {loading && <div className="empty-row">Loading transactions…</div>}
        {!loading && data.length === 0 && <div className="empty-row">No transactions to show yet.</div>}
        {data.slice(0, 6).map((item, index) => {
          const type = item.transcation_type?.toLowerCase();
          const amount = new Intl.NumberFormat('en-ZA', {
            style: 'currency', currency: 'ZAR', maximumFractionDigits: 2,
          }).format(Math.abs(Number(item.amount) || 0));
          return (
            <div className="trans-content" key={item.transaction_id ?? `${item.transaction_source}-${index}`}>
              <div className="transaction-name">
                <span className={`transaction-mark ${type}`}>{item.transaction_source?.charAt(0)?.toUpperCase() || 'T'}</span>
                <p>{item.transaction_source}</p>
              </div>
              <div><span className={`type-badge ${type}`}>{type}</span></div>
              <p>{new Date(item.transaction_date).toLocaleDateString('en-ZA', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
              <p className={`transaction-amount ${type}`}>{type === 'expense' ? '−' : '+'}{amount}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default RecentTransactions
