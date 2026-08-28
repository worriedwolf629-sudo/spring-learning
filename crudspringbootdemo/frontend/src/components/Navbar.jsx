import React from 'react';
import { GraduationCap, Server, Plus, RefreshCw } from 'lucide-react';

export default function Navbar({ onAddClick, onRefresh, isRefreshing, backendStatus, studentCount }) {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="logo-icon">
            <GraduationCap size={26} color="#ffffff" />
          </div>
          <div>
            <h1 className="brand-title">Student Portal</h1>
            <p className="brand-subtitle">Spring Boot CRUD Manager</p>
          </div>
        </div>

        <div className="navbar-actions">
          {/* Live Backend Connection Indicator */}
          <div className={`status-pill ${backendStatus === 'online' ? 'status-online' : backendStatus === 'offline' ? 'status-offline' : 'status-checking'}`}>
            <span className="status-dot"></span>
            <Server size={14} />
            <span className="status-text">
              {backendStatus === 'online' ? 'Backend Live' : backendStatus === 'offline' ? 'Backend Disconnected' : 'Checking API...'}
            </span>
          </div>

          <button 
            className="btn btn-secondary btn-icon" 
            onClick={onRefresh} 
            title="Refresh student list"
            disabled={isRefreshing}
          >
            <RefreshCw size={16} className={isRefreshing ? 'spin-icon' : ''} />
            <span>Refresh</span>
          </button>

          <button className="btn btn-primary btn-icon" onClick={onAddClick}>
            <Plus size={18} />
            <span>Add Student</span>
          </button>
        </div>
      </div>
    </header>
  );
}
