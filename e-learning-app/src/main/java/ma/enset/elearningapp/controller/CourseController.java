package ma.enset.elearningapp.controller;


import lombok.RequiredArgsConstructor;
import ma.enset.elearningapp.model.Course;
import ma.enset.elearningapp.service.CourseService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
@CrossOrigin("*")
public class CourseController {
    private final CourseService courseService;

    @GetMapping
    @PreAuthorize("hasAnyRole('STUDENT', 'ADMIN')")
    public List<Course> getAll() { return courseService.getAll(); }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Course save(@RequestBody Course course) { return courseService.save(course); }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Course update(@PathVariable Long id, @RequestBody Course course) { return courseService.update(id, course); }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable Long id) { courseService.delete(id); }
}