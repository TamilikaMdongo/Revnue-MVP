import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const LineChart = () => {
  const [resData, setData] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const getTransactions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/transactions/${userId}`);
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getTransactions();
  }, []);

  const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const incomeData = resData.filter(t => t.transcation_type === "income").map(t => t.amount);
  const expenseData = resData.filter(t => t.transcation_type === "expense").map(t => Math.abs(t.amount));
  const chartData = {
    labels,
    datasets: [
      {
        label: "Income", data: incomeData, borderColor: "#a6e98a",
        backgroundColor: "rgba(166, 233, 138, 0.14)", fill: true, tension: 0.42,
        borderWidth: 2.5, pointRadius: 0, pointHoverRadius: 5,
      },
      {
        label: "Expense", data: expenseData, borderColor: "#20352f",
        backgroundColor: "rgba(32, 53, 47, 0.07)", fill: true, tension: 0.42,
        borderWidth: 2.5, pointRadius: 0, pointHoverRadius: 5,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: {
        position: "top", align: "end",
        labels: { usePointStyle: true, pointStyle: "circle", boxWidth: 7, boxHeight: 7, color: "#65716d", font: { size: 12, weight: 600 }, padding: 18 },
      },
      tooltip: { backgroundColor: "#20352f", padding: 12, cornerRadius: 10 },
    },
    scales: {
      x: { grid: { display: false }, border: { display: false }, ticks: { color: "#7a8581", font: { size: 12 } } },
      y: { beginAtZero: true, grid: { color: "rgba(32, 53, 47, 0.08)" }, border: { display: false }, ticks: { color: "#7a8581", font: { size: 12 } } },
    },
  };

  return <div className="line-chart"><Line options={options} data={chartData} /></div>;
};

export default LineChart;
