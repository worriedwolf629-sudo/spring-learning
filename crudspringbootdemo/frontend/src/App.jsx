import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import StatsCards from './components/StatsCards';
import StudentTable from './components/StudentTable';
import StudentModal from './components/StudentModal';
import StudentDetailModal from './components/StudentDetailModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Toast from './components/Toast';
import {
  getAllStudents,
  getSoftDeletedStudents,
  getStudentById,
  createStudent,
  updateStudent,
  softDeleteStudent,
  deleteStudent,
} from './services/studentService';
import './App.css';

export default function App() {
  const [activeStudents, setActiveStudents] = useState([]);
  const [deletedStudents, setDeletedStudents] = useState([]);
  const [activeTab, setActiveTab] = useState('active'); // 'active' | 'deleted'
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [backendStatus, setBackendStatus] = useState('checking'); // 'online' | 'offline' | 'checking'

  // Modal States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedStudentForEdit, setSelectedStudentForEdit] = useState(null);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedStudentDetail, setSelectedStudentDetail] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStudentForDelete, setSelectedStudentForDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  }, []);

  // Fetch all students (active & soft deleted) from backend
  const fetchStudents = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) setIsRefreshing(true);
    else setIsLoading(true);

    try {
      const [activeData, deletedData] = await Promise.all([
        getAllStudents(),
        getSoftDeletedStudents(),
      ]);

      setActiveStudents(Array.isArray(activeData) ? activeData : []);
      setDeletedStudents(Array.isArray(deletedData) ? deletedData : []);
      setBackendStatus('online');
      
      if (isManualRefresh) {
        showToast('All active and soft-deleted records refreshed from backend!', 'info');
      }
    } catch (err) {
      console.error('API Error:', err);
      setBackendStatus('offline');
      showToast(
        'Could not connect to Spring Boot backend. Make sure your Spring Boot app is running on port 8080.',
        'error'
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [showToast]);

  // Initial load
  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Handlers for Add & Edit
  const handleOpenAddModal = () => {
    setSelectedStudentForEdit(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (student) => {
    setSelectedStudentForEdit(student);
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmittingForm(true);
    try {
      if (selectedStudentForEdit) {
        // Update existing student
        const updated = await updateStudent(selectedStudentForEdit.id, formData);
        setActiveStudents((prev) =>
          prev.map((s) => (s.id === selectedStudentForEdit.id ? updated : s))
        );
        showToast(`Student "${formData.name}" updated successfully!`, 'success');
      } else {
        // Create new student
        const created = await createStudent(formData);
        setActiveStudents((prev) => [...prev, created]);
        showToast(`Student "${formData.name}" created successfully!`, 'success');
      }
      setIsFormModalOpen(false);
      setSelectedStudentForEdit(null);
    } catch (err) {
      console.error('Error saving student:', err);
      showToast(
        `Failed to save student: ${err.message || 'Server error'}`,
        'error'
      );
    } finally {
      setIsSubmittingForm(false);
    }
  };

  // Handler for View Detail
  const handleOpenDetailModal = async (student) => {
    if (student.deleted) {
      // For soft-deleted students, backend GET /get/{id} returns 404 (by design via findByIdAndDeletedIsFalse)
      setSelectedStudentDetail(student);
      setIsDetailModalOpen(true);
      return;
    }

    try {
      const fullDetail = await getStudentById(student.id);
      setSelectedStudentDetail(fullDetail);
      setIsDetailModalOpen(true);
    } catch (err) {
      // Fallback to local item
      setSelectedStudentDetail(student);
      setIsDetailModalOpen(true);
    }
  };

  // Handlers for Delete
  const handleOpenDeleteModal = (student) => {
    setSelectedStudentForDelete(student);
    setIsDeleteModalOpen(true);
  };

  // Soft Delete handler (PATCH /api/students/soft-delete/{id})
  const handleSoftDelete = async (id) => {
    setIsDeleting(true);
    try {
      await softDeleteStudent(id);
      const studentToMove = activeStudents.find((s) => s.id === id);
      
      // Update local state: remove from active, add to deleted
      setActiveStudents((prev) => prev.filter((s) => s.id !== id));
      if (studentToMove) {
        setDeletedStudents((prev) => [...prev, { ...studentToMove, deleted: true }]);
      }
      
      showToast(`Student "${studentToMove?.name || id}" soft-deleted! Stored in DB with deleted = true.`, 'warning');
      setIsDeleteModalOpen(false);
      setSelectedStudentForDelete(null);
    } catch (err) {
      console.error('Error soft-deleting student:', err);
      showToast(
        `Failed to soft delete student: ${err.message || 'Server error'}`,
        'error'
      );
    } finally {
      setIsDeleting(false);
    }
  };

  // Permanent Delete handler (DELETE /api/students/delete/{id})
  const handlePermanentDelete = async (id) => {
    setIsDeleting(true);
    try {
      await deleteStudent(id);
      setActiveStudents((prev) => prev.filter((s) => s.id !== id));
      setDeletedStudents((prev) => prev.filter((s) => s.id !== id));
      showToast('Student permanently deleted from database.', 'success');
      setIsDeleteModalOpen(false);
      setSelectedStudentForDelete(null);
    } catch (err) {
      console.error('Error permanently deleting student:', err);
      showToast(
        `Failed to delete student: ${err.message || 'Server error'}`,
        'error'
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="app-container">
      {/* Toast Alert */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Top Navigation */}
      <Navbar
        onAddClick={handleOpenAddModal}
        onRefresh={() => fetchStudents(true)}
        isRefreshing={isRefreshing}
        backendStatus={backendStatus}
        studentCount={activeStudents.length}
      />

      {/* Main Content Area */}
      <main className="main-content">
        <div className="content-container">
          {/* Status Alert Banner if Backend is offline */}
          {backendStatus === 'offline' && (
            <div className="offline-banner">
              <div className="offline-banner-content">
                <strong>Backend Disconnected:</strong> Ensure your Spring Boot application is running on <code>http://localhost:8080</code>.
              </div>
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => fetchStudents(true)}
              >
                Retry Connection
              </button>
            </div>
          )}

          {/* Stats Cards Section */}
          <StatsCards
            activeStudents={activeStudents}
            deletedStudents={deletedStudents}
          />

          {/* Student Table / Card Grid with Active vs Soft Deleted Tabs */}
          <StudentTable
            activeStudents={activeStudents}
            deletedStudents={deletedStudents}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            isLoading={isLoading}
            onView={handleOpenDetailModal}
            onEdit={handleOpenEditModal}
            onDelete={handleOpenDeleteModal}
            onAddClick={handleOpenAddModal}
          />
        </div>
      </main>

      {/* Modals */}
      <StudentModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        student={selectedStudentForEdit}
        isSubmitting={isSubmittingForm}
      />

      <StudentDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        student={selectedStudentDetail}
        onEdit={(student) => {
          setIsDetailModalOpen(false);
          handleOpenEditModal(student);
        }}
        onDelete={(student) => {
          setIsDetailModalOpen(false);
          handleOpenDeleteModal(student);
        }}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onSoftDelete={handleSoftDelete}
        onPermanentDelete={handlePermanentDelete}
        student={selectedStudentForDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}
