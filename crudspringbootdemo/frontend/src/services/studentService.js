// Service to handle all HTTP API calls to the Spring Boot backend

const API_BASE_URL = '/api/students';

/**
 * Fetch all students from the backend
 */
export async function getAllStudents() {
  const response = await fetch(`${API_BASE_URL}/getall`);
  if (!response.ok) {
    if (response.status === 404) return [];
    throw new Error(`Failed to fetch students (Status: ${response.status})`);
  }
  return response.json();
}

/**
 * Fetch a single student by ID
 */
export async function getStudentById(id) {
  const response = await fetch(`${API_BASE_URL}/get/${id}`);
  if (!response.ok) {
    throw new Error(`Student with ID ${id} not found.`);
  }
  return response.json();
}

/**
 * Create a new student
 */
export async function createStudent(studentData) {
  const response = await fetch(`${API_BASE_URL}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: studentData.name,
      rollnum: Number(studentData.rollnum),
      age: Number(studentData.age),
      school: studentData.school,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create student (Status: ${response.status})`);
  }
  return response.json();
}

/**
 * Update an existing student by ID
 */
export async function updateStudent(id, studentData) {
  const response = await fetch(`${API_BASE_URL}/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: studentData.name,
      rollnum: Number(studentData.rollnum),
      age: Number(studentData.age),
      school: studentData.school,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update student (Status: ${response.status})`);
  }
  return response.json();
}

/**
 * Fetch all soft-deleted students from the backend (GET /api/students/retrieve)
 */
export async function getSoftDeletedStudents() {
  const response = await fetch(`${API_BASE_URL}/retrieve`);
  if (!response.ok) {
    if (response.status === 404) return [];
    throw new Error(`Failed to fetch soft deleted students (Status: ${response.status})`);
  }
  return response.json();
}

/**
 * Soft delete a student by ID (PATCH /api/students/soft-delete/{id})
 */
export async function softDeleteStudent(id) {
  const response = await fetch(`${API_BASE_URL}/soft-delete/${id}`, {
    method: 'PATCH',
  });

  if (!response.ok) {
    throw new Error(`Failed to soft delete student (Status: ${response.status})`);
  }
  return response.json();
}

/**
 * Permanently delete a student by ID (DELETE /api/students/delete/{id})
 */
export async function deleteStudent(id) {
  const response = await fetch(`${API_BASE_URL}/delete/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Failed to delete student (Status: ${response.status})`);
  }
  return response.json();
}
