import React from 'react';
import { UserX, Archive, Plus } from 'lucide-react';

export default function EmptyState({ onAddClick, isFiltered, onResetFilter, isDeletedTab = false }) {
  return (
    <div className="empty-state">
      <div className={`empty-state-icon ${isDeletedTab ? 'empty-state-icon-amber' : ''}`}>
        {isDeletedTab ? <Archive size={44} /> : <UserX size={44} />}
      </div>
      <h3 className="empty-state-title">
        {isFiltered
          ? 'No matching students found'
          : isDeletedTab
          ? 'No soft-deleted records found'
          : 'No active students found in database'}
      </h3>
      <p className="empty-state-text">
        {isFiltered
          ? 'Try adjusting your search query or clear the active filters.'
          : isDeletedTab
          ? 'Students marked with deleted = true in MySQL (via PATCH /api/students/soft-delete/{id}) and fetched via GET /api/students/retrieve will appear here.'
          : 'Your active student list is currently empty. Get started by registering your first student.'}
      </p>
      {isFiltered ? (
        <button className="btn btn-secondary" onClick={onResetFilter}>
          Clear Filter
        </button>
      ) : !isDeletedTab ? (
        <button className="btn btn-primary btn-icon" onClick={onAddClick}>
          <Plus size={16} />
          <span>Add First Student</span>
        </button>
      ) : null}
    </div>
  );
}
