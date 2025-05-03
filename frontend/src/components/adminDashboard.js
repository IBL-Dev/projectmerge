import React, { useState, useEffect } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import axios from "axios";
import { Link } from "react-router-dom";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export default function AdminDashboard() {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await axios.get("http://localhost:8070/consultation/");
        setConsultations(response.data);
      } catch (err) {
        console.error("Error fetching consultations:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchConsultations();
  }, []);

  // Calculate monthly consultation counts
  const getMonthlyData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const counts = Array(12).fill(0);
    
    consultations.forEach(c => {
      const month = new Date(c.dateTime).getMonth();
      counts[month]++;
    });
    
    return {
      labels: months,
      data: counts
    };
  };

  // Calculate priority distribution
  const getPriorityDistribution = () => {
    const counts = { Low: 0, Medium: 0, High: 0, Critical: 0 };
    consultations.forEach(c => counts[c.priority]++);
    return counts;
  };

  // Calculate status distribution
  const getStatusDistribution = () => {
    const counts = { 
      'Not Seen Yet': 0, 
      'Processing': 0, 
      'Finished': 0, 
      'Cancelled': 0 
    };
    
    consultations.forEach(c => {
      if (c.status === 'Pending' || c.status === 'In Progress') {
        counts['Processing']++;
      } else if (c.status === 'Completed') {
        counts['Finished']++;
      } else {
        counts[c.status]++;
      }
    });
    return counts;
  };

  // Area Chart data (Monthly consultations)
  const areaData = {
    labels: getMonthlyData().labels,
    datasets: [{
      label: 'Consultations',
      data: getMonthlyData().data,
      fill: true,
      backgroundColor: 'rgba(78, 115, 223, 0.05)',
      borderColor: 'rgba(78, 115, 223, 1)',
      pointBackgroundColor: 'rgba(78, 115, 223, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(78, 115, 223, 1)',
      tension: 0.4
    }]
  };

  // Bar Chart data (Priority)
  const barData = {
    labels: ['Low', 'Medium', 'High', 'Critical'],
    datasets: [{
      label: 'Consultations',
      data: Object.values(getPriorityDistribution()),
      backgroundColor: 'rgba(78, 115, 223, 0.7)',
      hoverBackgroundColor: 'rgba(78, 115, 223, 0.9)',
      borderColor: '#fff',
      borderWidth: 1
    }]
  };

  // Pie Chart data (Status)
  const pieData = {
    labels: ['Not Seen Yet', 'Processing', 'Finished', 'Cancelled'],
    datasets: [{
      data: Object.values(getStatusDistribution()),
      backgroundColor: [
        'rgba(108, 117, 125, 0.7)',
        'rgba(255, 193, 7, 0.7)',
        'rgba(40, 167, 69, 0.7)',
        'rgba(220, 53, 69, 0.7)'
      ],
      hoverBackgroundColor: [
        'rgba(108, 117, 125, 0.9)',
        'rgba(255, 193, 7, 0.9)',
        'rgba(40, 167, 69, 0.9)',
        'rgba(220, 53, 69, 0.9)'
      ],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }]
  };

  const areaOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: "rgb(255,255,255)",
        bodyColor: "#858796",
        titleMarginBottom: 10,
        titleColor: '#6e707e',
        borderColor: '#dddfeb',
        borderWidth: 1,
        padding: 15,
        callbacks: {
          label: function(context) {
            return `${context.parsed.y} consultations`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      },
      y: {
        ticks: {
          maxTicksLimit: 5,
          padding: 10,
          callback: function(value) {
            return value;
          }
        },
        grid: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      }
    }
  };

  const barOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: "rgb(255,255,255)",
        bodyColor: "#858796",
        titleMarginBottom: 10,
        titleColor: '#6e707e',
        borderColor: '#dddfeb',
        borderWidth: 1,
        padding: 15,
        callbacks: {
          label: function(context) {
            return `${context.parsed.y} consultations`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          maxTicksLimit: 5,
          padding: 10
        },
        grid: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      }
    }
  };

  const pieOptions = {
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        backgroundColor: "rgb(255,255,255)",
        bodyColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        padding: 15,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      },
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true
        }
      }
    },
    cutout: '70%'
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger mt-4">
        {error}
        <button className="btn btn-sm btn-outline-danger ms-3" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      {/* Page Heading */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Charts</h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Charts</li>
          </ol>
        </nav>
      </div>

      <div className="row">
        <div className="col-lg-12 mb-4">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Area Chart</h6>
            </div>
            <div className="card-body">
              <div className="chart-area" style={{ height: '30rem' }}>
                <Line data={areaData} options={areaOptions} />
              </div>
              <hr />
              <div className="text-center small">
                <span className="mr-2">
                  <i className="fas fa-circle text-primary"></i> Monthly Consultation Trend
                </span>
              </div>
              <div className="mt-2 text-center small">
                Styling for the area chart can be found in the <code>src/components/AdminDashboard.js</code> file.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 mb-4">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Bar Chart</h6>
            </div>
            <div className="card-body">
              <div className="chart-bar" style={{ height: '25rem' }}>
                <Bar data={barData} options={barOptions} />
              </div>
              <hr />
              <div className="text-center small">
                <span className="mr-2">
                  <i className="fas fa-circle text-primary"></i> Priority Distribution
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 mb-4">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Pie Chart</h6>
            </div>
            <div className="card-body">
              <div className="chart-pie pt-4" style={{ height: '20rem' }}>
                <Pie data={pieData} options={pieOptions} />
              </div>
              <hr />
              <div className="mt-4 text-center small">
                <span className="mr-2">
                  <i className="fas fa-circle text-secondary"></i> Not Seen Yet
                </span>
                <span className="mr-2">
                  <i className="fas fa-circle text-warning"></i> Processing
                </span>
                <span className="mr-2">
                  <i className="fas fa-circle text-success"></i> Finished
                </span>
                <span className="mr-2">
                  <i className="fas fa-circle text-danger"></i> Cancelled
                </span>
              </div>
              <div className="mt-2 text-center small">
                Styling for the pie chart can be found in the <code>src/components/AdminDashboard.js</code> file.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}