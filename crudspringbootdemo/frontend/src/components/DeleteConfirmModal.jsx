import React from 'react';
import { AlertTriangle, Archive, Trash2, X, ShieldAlert } from 'lucide-react';

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onSoftDelete,
  onPermanentDelete,
  student,
  isDeleting,
}) {
  if (!isOpen || !student) return null;

  const isAlreadyDeleted = Boolean(student.deleted);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
        <div className="delete-modal-icon">
          {isAlreadyDeleted ? (
            <AlertTriangle size={32} color="#ef4444" />
          ) : (
            <Archive size={32} color="#f59e0b" />
          )}
        </div>

        <h3 className="delete-title">
          {isAlreadyDeleted ? 'Permanently Delete Record?' : 'Delete Student Record'}
        </h3>
        
        <p className="delete-description">
          Student: <strong>{student.name}</strong> (Roll: {student.rollnum}, ID: #{student.id})
        </p>

        {isAlreadyDeleted ? (
          <div className="delete-options-info">
            <p className="delete-warning-text">
              <ShieldAlert size={16} />
              This record is already <strong>soft deleted</strong>. Performing a permanent delete will completely remove the row from MySQL.
            </p>
          </div>
        ) : (
          <div className="delete-choice-cards">
            <div className="delete-choice-card">
              <div className="choice-header">
                <span className="badge badge-warning">Soft Delete (Recommended)</span>
              </div>
              <p className="choice-desc">
                Calls <code>PATCH /api/students/soft-delete/{student.id}</code>. Sets <code>deleted = true</code> in MySQL and moves student to the Soft Deleted view.
              </p>
            </div>
            
            <div className="delete-choice-card">
              <div className="choice-header">
                <span className="badge badge-danger">Permanent Delete</span>
              </div>
              <p className="choice-desc">
                Calls <code>DELETE /api/students/delete/{student.id}</code>. Permanently drops the row from MySQL.
              </p>
            </div>
          </div>
        )}

        <div className="modal-actions delete-modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isDeleting}>
            Cancel
          </button>
          
          {!isAlreadyDeleted && (
            <button
              type="button"
              className="btn btn-warning btn-icon"
              onClick={() => onSoftDelete(student.id)}
              disabled={isDeleting}
            >
              <Archive size={16} />
              <span>{isDeleting ? 'Processing...' : 'Soft Delete'}</span>
            </button>
          )}

          <button
            type="button"
            className="btn btn-danger btn-icon"
            onClick={() => onPermanentDelete(student.id)}
            disabled={isDeleting}
          >
            <Trash2 size={16} />
            <span>{isDeleting ? 'Deleting...' : isAlreadyDeleted ? 'Permanent Delete' : 'Hard Delete'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
