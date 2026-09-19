import {useState, useEffect} from 'react'
import axios from 'axios'
console.log("COMPONENT RENDERED");




const TransactionCard = () => {

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState (false);



  const handleUpload = async ()=>{
  console.log("UPLOAD CLICKED");
    if (!file) return;
    setLoading(true);

const userId = localStorage.getItem("user_id");
console.log(userId)
    const formData = new FormData();
    formData.append("file", file);
     formData.append("user_id", userId);
    try{
      const res = await fetch('http://localhost:5000/transactions/upload', {
        method: "POST",
        body: formData
      });
       
      if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }


      const data = await res.json();
      console.log("UPLOAD RESPONSE:", data);
    }
  
    catch (err){
      console.error("Upload Failed", err);
    }
    finally{
      setLoading(false);
    };

  }
  const [data, setData] = useState([]);
 useEffect(() => {
  const fetchTransactions = async () => {
    try {
       const userId = localStorage.getItem("user_id");
       
    const response = await axios.get(`http://localhost:5000/transactions/${userId}`); 

      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchTransactions();
}, []);

  return (
    <div className='trans-containter'>
        <input type='file' placeholder='upload' accept='.csv' onChange={(e) => setFile(e.target.files[0])}/>
      <div className="transaction-header">

        <div className="trans-search">
            <input type='text' placeholder='Search Transaction'/>
        </div>
        
        <div className="category">
          
            <button onClick={handleUpload}>Upload file</button>
        </div>

        <div className="create">
            <button>Create Transaction</button>
        </div>

        <div className="download">
            <button>Download</button>
        </div>

      </div>


      <div className="transaction-text">
        <div className="1">
 <p>Transaction Name</p>
        </div>
        <div className="1">
 <p>Account</p>
        </div>
       
         <div className="1">
 <p>Date</p>
        </div>
         <div className="1">
 <p>Amount</p>
        </div>
      
      
         
      </div>

      <div className="trans-res">
        {data.map(item=>(
          
         <div className='transaction-response'>
          
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


    </div>
  )
}

export default TransactionCard
