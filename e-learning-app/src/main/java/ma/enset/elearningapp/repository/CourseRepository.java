package ma.enset.elearningapp.repository;


import ma.enset.elearningapp.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    // Spring Data JPA génère automatiquement les méthodes CRUD
}