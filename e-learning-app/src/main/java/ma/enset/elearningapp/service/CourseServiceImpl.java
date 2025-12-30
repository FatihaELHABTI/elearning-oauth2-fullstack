package ma.enset.elearningapp.service;




import lombok.RequiredArgsConstructor;
import ma.enset.elearningapp.model.Course;
import ma.enset.elearningapp.model.Instructor;
import ma.enset.elearningapp.repository.CourseRepository;
import ma.enset.elearningapp.repository.InstructorRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {
    private final CourseRepository repository;
    private final InstructorRepository instructorRepository;

    @Override public List<Course> getAll() { return repository.findAll(); }
    @Override public Course getById(Long id) { return repository.findById(id).orElse(null); }
    @Override
    public Course save(Course course) {
        // On vérifie si un instructeur est fourni avec un ID
        if (course.getInstructor() != null && course.getInstructor().getId() != null) {
            // On récupère le vrai instructeur depuis la DB pour éviter les erreurs de mapping
            Instructor inst = instructorRepository.findById(course.getInstructor().getId())
                    .orElseThrow(() -> new RuntimeException("Instructeur non trouvé"));
            course.setInstructor(inst);
        }
        return repository.save(course);
    }

    @Override
    public Course update(Long id, Course course) {
        Course existing = getById(id);
        if (existing != null) {
            existing.setTitle(course.getTitle());
            existing.setDescription(course.getDescription());
            existing.setLevel(course.getLevel());
            existing.setStudentsCount(course.getStudentsCount());
            existing.setInstructor(course.getInstructor());
            return repository.save(existing);
        }
        return null;
    }

    @Override public void delete(Long id) { repository.deleteById(id); }
}