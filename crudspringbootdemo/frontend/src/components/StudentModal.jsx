import React, { useState, useEffect } from 'react';
import { X, User, Hash, Calendar, School, Check, AlertCircle } from 'lucide-react';

export default function StudentModal({ isOpen, onClose, onSubmit, student, isSubmitting }) {
  const [formData, setFormData] = useState({
    name: '',
    rollnum: '',
    age: '',
    school: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || '',
        rollnum: student.rollnum || '',
        age: student.age || '',
        school: student.school || '',
      });
    } else {
      setFormData({
        name: '',
        rollnum: '',
        age: '',
        school: '',
      });
    }
    setErrors({});
  }, [student, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Student name is required';
    }
    if (!formData.rollnum || isNaN(formData.rollnum) || Number(formData.rollnum) <= 0) {
      newErrors.rollnum = 'Valid positive roll number is required';
    }
    if (!formData.age || isNaN(formData.age) || Number(formData.age) <= 0 || Number(formData.age) > 120) {
      newErrors.age = 'Please enter a valid age (1-120)';
    }
    if (!formData.school.trim()) {
      newErrors.school = 'School name is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">
              {student ? 'Edit Student Details' : 'Register New Student'}
            </h2>
            <p className="modal-subtitle">
              {student ? `Update record for ID: #${student.id}` : 'Fill in the details below to add to database'}
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label" htmlFor="student-name">
              <User size={15} />
              <span>Full Name</span>
            </label>
            <input
              id="student-name"
              type="text"
              name="name"
              className={`form-input ${errors.name ? 'input-error' : ''}`}
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={handleChange}
              autoFocus
            />
            {errors.name && (
              <span className="error-message">
                <AlertCircle size={13} /> {errors.name}
              </span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="student-rollnum">
                <Hash size={15} />
                <span>Roll Number</span>
              </label>
              <input
                id="student-rollnum"
                type="number"
                name="rollnum"
                className={`form-input ${errors.rollnum ? 'input-error' : ''}`}
                placeholder="e.g. 101"
                value={formData.rollnum}
                onChange={handleChange}
              />
              {errors.rollnum && (
                <span className="error-message">
                  <AlertCircle size={13} /> {errors.rollnum}
                </span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="student-age">
                <Calendar size={15} />
                <span>Age</span>
              </label>
              <input
                id="student-age"
                type="number"
                name="age"
                className={`form-input ${errors.age ? 'input-error' : ''}`}
                placeholder="e.g. 18"
                value={formData.age}
                onChange={handleChange}
              />
              {errors.age && (
                <span className="error-message">
                  <AlertCircle size={13} /> {errors.age}
                </span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="student-school">
              <School size={15} />
              <span>School / College Name</span>
            </label>
            <input
              id="student-school"
              type="text"
              name="school"
              className={`form-input ${errors.school ? 'input-error' : ''}`}
              placeholder="e.g. Springdale High School"
              value={formData.school}
              onChange={handleChange}
            />
            {errors.school && (
              <span className="error-message">
                <AlertCircle size={13} /> {errors.school}
              </span>
            )}
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? (
                <span>Saving...</span>
              ) : (
                <>
                  <Check size={16} />
                  <span>{student ? 'Save Changes' : 'Create Student'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
