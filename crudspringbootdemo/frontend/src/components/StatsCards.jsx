import React from 'react';
import { Users, School, Archive, Calendar, UserCheck } from 'lucide-react';

export default function StatsCards({ activeStudents = [], deletedStudents = [] }) {
  const activeCount = activeStudents.length;
  const deletedCount = deletedStudents.length;
  
  // Calculate unique schools from active students (or all if available)
  const allStudents = [...activeStudents, ...deletedStudents];
  const uniqueSchools = new Set(allStudents.map(s => s.school?.trim().toLowerCase()).filter(Boolean)).size;
  
  // Calculate average age
  const totalAge = activeStudents.reduce((acc, curr) => acc + (Number(curr.age) || 0), 0);
  const avgAge = activeCount > 0 ? (totalAge / activeCount).toFixed(1) : '0';

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon stat-icon-emerald">
          <UserCheck size={22} />
        </div>
        <div className="stat-info">
          <span className="stat-label">Active Students</span>
          <span className="stat-value">{activeCount}</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon stat-icon-amber">
          <Archive size={22} />
        </div>
        <div className="stat-info">
          <span className="stat-label">Soft Deleted (DB)</span>
          <span className="stat-value">{deletedCount}</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon stat-icon-purple">
          <School size={22} />
        </div>
        <div className="stat-info">
          <span className="stat-label">Schools Represented</span>
          <span className="stat-value">{uniqueSchools}</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon stat-icon-blue">
          <Calendar size={22} />
        </div>
        <div className="stat-info">
          <span className="stat-label">Average Age</span>
          <span className="stat-value">{avgAge} <span className="stat-unit">yrs</span></span>
        </div>
      </div>
    </div>
  );
}
