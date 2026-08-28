import React from 'react';
import { X, User, Hash, Calendar, School, Edit2, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function StudentDetailModal({ isOpen, onClose, student, onEdit, onDelete }) {
  if (!isOpen || !student) return null;

  const isDeleted = Boolean(student.deleted);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="detail-header-info">
            <div className="detail-badges-row">
              <span className="badge badge-id">ID: #{student.id}</span>
              {isDeleted ? (
                <span className="badge badge-warning-pill">
                  <AlertCircle size={12} />
                  Soft Deleted (deleted: true)
                </span>
              ) : (
                <span className="badge badge-success-pill">
                  <CheckCircle2 size={12} />
                  Active (deleted: false)
                </span>
              )}
            </div>
            <h2 className="modal-title">{student.name}</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="detail-body">
          <div className="detail-item">
            <div className="detail-icon">
              <User size={18} />
            </div>
            <div>
              <span className="detail-label">Full Name</span>
              <p className="detail-value">{student.name}</p>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon">
              <Hash size={18} />
            </div>
            <div>
              <span className="detail-label">Roll Number</span>
              <p className="detail-value">{student.rollnum}</p>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon">
              <Calendar size={18} />
            </div>
            <div>
              <span className="detail-label">Age</span>
              <p className="detail-value">{student.age} years old</p>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon">
              <School size={18} />
            </div>
            <div>
              <span className="detail-label">School / College</span>
              <p className="detail-value">{student.school}</p>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button
            type="button"
            className="btn btn-danger-outline btn-icon"
            onClick={() => {
              onClose();
              onDelete(student);
            }}
          >
            <Trash2 size={16} />
            <span>{isDeleted ? 'Permanent Delete' : 'Delete / Soft Delete'}</span>
          </button>

          {!isDeleted && (
            <button
              type="button"
              className="btn btn-primary btn-icon"
              onClick={() => {
                onClose();
                onEdit(student);
              }}
            >
              <Edit2 size={16} />
              <span>Edit Student</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
