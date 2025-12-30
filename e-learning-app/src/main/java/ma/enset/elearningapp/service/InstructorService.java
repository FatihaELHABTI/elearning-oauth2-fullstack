package ma.enset.elearningapp.service;


import ma.enset.elearningapp.model.Instructor;

import java.util.List;

public interface InstructorService {
    List<Instructor> getAll();
    Instructor getById(Long id);
    Instructor save(Instructor instructor);
    Instructor update(Long id, Instructor instructor);
    void delete(Long id);
}