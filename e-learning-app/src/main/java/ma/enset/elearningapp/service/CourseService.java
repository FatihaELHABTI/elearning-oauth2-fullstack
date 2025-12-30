package ma.enset.elearningapp.service;


import ma.enset.elearningapp.model.Course;

import java.util.List;

public interface CourseService {
    List<Course> getAll();
    Course getById(Long id);
    Course save(Course course);
    Course update(Long id, Course course);
    void delete(Long id);
}