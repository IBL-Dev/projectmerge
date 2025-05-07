import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Dashbord/Dashboard.css';
import { FiClock, FiCheckCircle, FiTrendingUp, FiAlertCircle } from 'react-icons/fi';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, pending: 0, inProgress: 0, completed: 0 });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('http://localhost:8070/projects');
        setProjects(res.data.projects);
        const stats = {
          total: res.data.projects.length,
          pending: res.data.projects.filter(p => p.status === 'Pending').length,
          inProgress: res.data.projects.filter(p => p.status === 'In Progress').length,
          completed: res.data.projects.filter(p => p.status === 'Completed').length
        };
        setStats(stats);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const ongoingProjects = projects
    .filter(project => ['In Progress', 'Pending'].includes(project.status))
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 5);

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="dashboard-container enhanced" style={{ display: 'flex' }}>
      {/* Left Sidebar with Title */}
      <h1>📊 Project Dashboard</h1>
      
      {/* Main Content Area */}
      <div style={{ width: '100%', background: 'linear-gradient(to right, #2c5282, #a0aec0)', padding: '20px', display: 'flex', flexDirection: 'column' }}>
        {/* Stats Cards Row */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
          <StatCard icon={<FiTrendingUp size={24} />} title="Total Projects" value={stats.total} color="#4e73df" />
          <StatCard icon={<FiClock size={24} />} title="Pending" value={stats.pending} color="#f6c23e" />
          <StatCard icon={<FiAlertCircle size={24} />} title="In Progress" value={stats.inProgress} color="#36b9cc" />
          <StatCard icon={<FiCheckCircle size={24} />} title="Completed" value={stats.completed} color="#1cc88a" />
        </div>
        
        {/* Ongoing Projects Section */}
        <div className="ongoing-projects card-shadow" style={{ backgroundColor: 'white', borderRadius: '8px' }}>
          <div className="section-header">
            <h2>🚀 Ongoing Projects</h2>
            <Link to="/projectdetails" className="view-all">View All</Link>
          </div>

          {ongoingProjects.length === 0 ? (
            <div className="no-projects">
              <p>No ongoing projects found</p>
              <Link to="/addproject" className="btn-primary">Create New Project</Link>
            </div>
          ) : (
            <div className="projects-list">
              {ongoingProjects.map(project => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          )}
        </div>
        <div className="status-chart card-shadow">
        <h2>📈 Project Status Distribution</h2>
        <div className="chart-bars">
          <div className="chart-bar pending" style={{ width: `${(stats.pending / stats.total) * 100}%` }}>
            <span>Pending ({stats.pending})</span>
          </div>
          <div className="chart-bar in-progress" style={{ width: `${(stats.inProgress / stats.total) * 100}%` }}>
            <span>In Progress ({stats.inProgress})</span>
          </div>
          <div className="chart-bar completed" style={{ width: `${(stats.completed / stats.total) * 100}%` }}>
            <span>Completed ({stats.completed})</span>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

// Keep original StatCard component unchanged
const StatCard = ({ icon, title, value, color }) => (
  <div className="stat-card animated-card" style={{ borderBottom: `4px solid ${color}`, flex: 1, backgroundColor: 'white', borderRadius: '8px' }}>
    <div className="stat-icon" style={{ color }}>{icon}</div>
    <div className="stat-content">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  </div>
);

// Keep original ProjectCard component unchanged
const ProjectCard = ({ project }) => (
  <div className="project-card">
    <div className="project-header">
      <h3>{project.projectTitle}</h3>
      <span className={`status-badge ${project.status.toLowerCase().replace(' ', '-')}`}>{project.status}</span>
    </div>
    <div className="project-details">
      <p><strong>Client:</strong> {project.customerName}</p>
      <p><strong>Budget:</strong> ${project.budget.toLocaleString()}</p>
      <p><strong>Timeline:</strong> {project.timeline}</p>
    </div>
    <div className="project-actions">
      <Link to={`/update/${project._id}`} className="btn-outline">View Details</Link>
    </div>
  </div>
);

export default Dashboard;