import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ArrowUpDown, 
  Eye, 
  Edit3, 
  Trash2, 
  LayoutList, 
  LayoutGrid, 
  School, 
  Hash, 
  Calendar,
  X,
  UserCheck,
  Archive,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import EmptyState from './EmptyState';

export default function StudentTable({
  activeStudents = [],
  deletedStudents = [],
  activeTab = 'active',
  onTabChange,
  isLoading,
  onView,
  onEdit,
  onDelete,
  onAddClick,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('ALL');
  const [sortField, setSortField] = useState('id');
  const [sortAsc, setSortAsc] = useState(true);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'

  const currentDataset = activeTab === 'active' ? activeStudents : deletedStudents;

  // Extract unique schools for dropdown filter from active dataset
  const schoolOptions = useMemo(() => {
    const list = currentDataset.map((s) => s.school?.trim()).filter(Boolean);
    return ['ALL', ...Array.from(new Set(list))];
  }, [currentDataset]);

  // Filtered and sorted students
  const filteredStudents = useMemo(() => {
    let result = [...currentDataset];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (s) =>
          s.name?.toLowerCase().includes(q) ||
          s.school?.toLowerCase().includes(q) ||
          String(s.rollnum).includes(q) ||
          String(s.id).includes(q)
      );
    }

    if (selectedSchool !== 'ALL') {
      result = result.filter((s) => s.school?.trim() === selectedSchool);
    }

    result.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();

      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });

    return result;
  }, [currentDataset, searchQuery, selectedSchool, sortField, sortAsc]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const isFiltered = searchQuery.trim() !== '' || selectedSchool !== 'ALL';
  const isDeletedTab = activeTab === 'deleted';

  return (
    <div className="table-wrapper-card">
      {/* Primary Tab Navigation */}
      <div className="view-tabs-header">
        <div className="view-tabs-list">
          <button
            className={`view-tab-btn ${activeTab === 'active' ? 'view-tab-active' : ''}`}
            onClick={() => onTabChange('active')}
          >
            <UserCheck size={16} />
            <span>Active Students</span>
            <span className="tab-count-pill tab-count-emerald">{activeStudents.length}</span>
          </button>

          <button
            className={`view-tab-btn ${activeTab === 'deleted' ? 'view-tab-active view-tab-deleted' : ''}`}
            onClick={() => onTabChange('deleted')}
          >
            <Archive size={16} />
            <span>Soft Deleted Students</span>
            <span className="tab-count-pill tab-count-amber">{deletedStudents.length}</span>
          </button>
        </div>

        {/* Tab Description / Context Badge */}
        <div className="tab-context-badge">
          {activeTab === 'active' ? (
            <span className="api-source-badge api-source-active">
              API: <code>GET /api/students/getall</code> (deleted: false)
            </span>
          ) : (
            <span className="api-source-badge api-source-deleted">
              API: <code>GET /api/students/retrieve</code> (deleted: true in DB)
            </span>
          )}
        </div>
      </div>

      {/* Controls Bar: Search, Filters, View toggle */}
      <div className="table-controls">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder={
              isDeletedTab
                ? 'Search soft-deleted records...'
                : 'Search by name, roll no, school...'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="search-clear-btn" onClick={() => setSearchQuery('')}>
              <X size={14} />
            </button>
          )}
        </div>

        <div className="filter-group">
          <div className="select-wrapper">
            <select
              className="filter-select"
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
            >
              <option value="ALL">All Schools</option>
              {schoolOptions
                .filter((s) => s !== 'ALL')
                .map((school) => (
                  <option key={school} value={school}>
                    {school}
                  </option>
                ))}
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="view-mode-toggle">
            <button
              className={`view-btn ${viewMode === 'table' ? 'view-btn-active' : ''}`}
              onClick={() => setViewMode('table')}
              title="Table View"
            >
              <LayoutList size={16} />
            </button>
            <button
              className={`view-btn ${viewMode === 'grid' ? 'view-btn-active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid Card View"
            >
              <LayoutGrid size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-text">
            {isDeletedTab
              ? 'Loading soft-deleted records from /api/students/retrieve...'
              : 'Loading active students from /api/students/getall...'}
          </p>
        </div>
      ) : filteredStudents.length === 0 ? (
        <EmptyState
          isFiltered={isFiltered}
          isDeletedTab={isDeletedTab}
          onResetFilter={() => {
            setSearchQuery('');
            setSelectedSchool('ALL');
          }}
          onAddClick={onAddClick}
        />
      ) : viewMode === 'table' ? (
        /* Table View */
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('id')} className="cursor-pointer">
                  <div className="th-content">
                    <span>ID</span>
                    <ArrowUpDown size={14} className={sortField === 'id' ? 'sort-active' : 'sort-inactive'} />
                  </div>
                </th>
                <th onClick={() => handleSort('name')} className="cursor-pointer">
                  <div className="th-content">
                    <span>Student Name</span>
                    <ArrowUpDown size={14} className={sortField === 'name' ? 'sort-active' : 'sort-inactive'} />
                  </div>
                </th>
                <th onClick={() => handleSort('rollnum')} className="cursor-pointer">
                  <div className="th-content">
                    <span>Roll No.</span>
                    <ArrowUpDown size={14} className={sortField === 'rollnum' ? 'sort-active' : 'sort-inactive'} />
                  </div>
                </th>
                <th onClick={() => handleSort('age')} className="cursor-pointer">
                  <div className="th-content">
                    <span>Age</span>
                    <ArrowUpDown size={14} className={sortField === 'age' ? 'sort-active' : 'sort-inactive'} />
                  </div>
                </th>
                <th onClick={() => handleSort('school')} className="cursor-pointer">
                  <div className="th-content">
                    <span>School / College</span>
                    <ArrowUpDown size={14} className={sortField === 'school' ? 'sort-active' : 'sort-inactive'} />
                  </div>
                </th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className={`table-row ${isDeletedTab ? 'table-row-deleted' : ''}`}
                >
                  <td>
                    <span className="badge badge-id">#{student.id}</span>
                  </td>
                  <td>
                    <div className="student-name-cell">
                      <div className={`avatar-circle ${isDeletedTab ? 'avatar-deleted' : ''}`}>
                        {student.name ? student.name.charAt(0).toUpperCase() : '?'}
                      </div>
                      <span className={`student-name-text ${isDeletedTab ? 'student-name-deleted' : ''}`}>
                        {student.name}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-roll">{student.rollnum}</span>
                  </td>
                  <td>
                    <span className="age-text">{student.age} yrs</span>
                  </td>
                  <td>
                    <div className="school-cell">
                      <School size={14} className="school-icon" />
                      <span>{student.school}</span>
                    </div>
                  </td>
                  <td>
                    {isDeletedTab ? (
                      <span className="status-badge status-badge-deleted">
                        <AlertCircle size={12} />
                        Soft Deleted
                      </span>
                    ) : (
                      <span className="status-badge status-badge-active">
                        <CheckCircle2 size={12} />
                        Active
                      </span>
                    )}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="action-btn action-view"
                        title="View details"
                        onClick={() => onView(student)}
                      >
                        <Eye size={15} />
                      </button>
                      
                      {!isDeletedTab && (
                        <button
                          className="action-btn action-edit"
                          title="Edit student"
                          onClick={() => onEdit(student)}
                        >
                          <Edit3 size={15} />
                        </button>
                      )}

                      <button
                        className="action-btn action-delete"
                        title={isDeletedTab ? 'Permanently Delete' : 'Delete / Soft Delete'}
                        onClick={() => onDelete(student)}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Grid Card View */
        <div className="cards-grid">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className={`student-card-item ${isDeletedTab ? 'student-card-deleted' : ''}`}
            >
              <div className="card-top">
                <div className={`avatar-circle avatar-large ${isDeletedTab ? 'avatar-deleted' : ''}`}>
                  {student.name ? student.name.charAt(0).toUpperCase() : '?'}
                </div>
                <div className="card-top-badges">
                  <span className="badge badge-id">#{student.id}</span>
                  {isDeletedTab ? (
                    <span className="status-badge status-badge-deleted">
                      <AlertCircle size={11} />
                      Soft Deleted
                    </span>
                  ) : (
                    <span className="status-badge status-badge-active">
                      <CheckCircle2 size={11} />
                      Active
                    </span>
                  )}
                </div>
              </div>

              <h4 className={`card-student-name ${isDeletedTab ? 'student-name-deleted' : ''}`}>
                {student.name}
              </h4>

              <div className="card-details-list">
                <div className="card-detail-row">
                  <Hash size={14} />
                  <span>Roll: <strong>{student.rollnum}</strong></span>
                </div>
                <div className="card-detail-row">
                  <Calendar size={14} />
                  <span>Age: <strong>{student.age} yrs</strong></span>
                </div>
                <div className="card-detail-row">
                  <School size={14} />
                  <span className="truncate">{student.school}</span>
                </div>
              </div>

              <div className="card-footer-actions">
                <button
                  className="btn btn-sm btn-secondary btn-icon"
                  onClick={() => onView(student)}
                >
                  <Eye size={14} />
                  <span>View</span>
                </button>

                {!isDeletedTab && (
                  <button
                    className="btn btn-sm btn-primary-outline btn-icon"
                    onClick={() => onEdit(student)}
                  >
                    <Edit3 size={14} />
                    <span>Edit</span>
                  </button>
                )}

                <button
                  className="btn btn-sm btn-danger-outline btn-icon"
                  onClick={() => onDelete(student)}
                >
                  <Trash2 size={14} />
                  <span>{isDeletedTab ? 'Permanent Delete' : 'Delete'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table Footer / Counter */}
      {!isLoading && filteredStudents.length > 0 && (
        <div className="table-footer">
          <span>
            Showing {filteredStudents.length} of {currentDataset.length}{' '}
            {isDeletedTab ? 'soft-deleted' : 'active'} records
          </span>
        </div>
      )}
    </div>
  );
}
