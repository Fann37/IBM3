// ===== COURSES =====
const COURSE_KEY = "lms_courses";

export const courseStore = {
  getCourses() {
    return JSON.parse(localStorage.getItem(COURSE_KEY)) || [];
  },

  addCourse(course) {
    const courses = this.getCourses();
    courses.push(course);
    localStorage.setItem(COURSE_KEY, JSON.stringify(courses));
  }
};

// ===== ENROLLMENTS =====
const ENROLL_KEY = "lms_enrollments";

export const enrollStore = {
  getEnrollments() {
    return JSON.parse(localStorage.getItem(ENROLL_KEY)) || [];
  },

  addEnrollment(enrollment) {
    const enrollments = this.getEnrollments();
    enrollments.push(enrollment);
    localStorage.setItem(ENROLL_KEY, JSON.stringify(enrollments));
  }
};
