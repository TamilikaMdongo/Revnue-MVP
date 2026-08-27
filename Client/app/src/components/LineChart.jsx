import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const LineChart = () => {


  
  const [resData, setData] = useState([]);



  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    
console.log("LINE CHART USER ID:", userId);
    const getTransactions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/transactions/${userId}`
        );

        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getTransactions();
  }, []);

  const labels = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  const incomeData = resData
  .filter(t => t.transcation_type === "income")
  .map(t => t.amount);

const expenseData = resData
  .filter(t => t.transcation_type === "expense")
  .map(t => t.amount);
  
  const chartData = {
    labels,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        borderColor: "rgb(0,255,0)",
        backgroundColor: "rgb(0,255,0)",
      },
      {
        label: "Expense",
        data: expenseData,
        borderColor: "rgb(255,99,132)",
        backgroundColor: "rgb(255,99,132)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

 return (
  <div style={{ width: "80%", height: "400px" }}>
    <Line options={options} data={chartData} />
  </div>
);
};

export default LineChart;