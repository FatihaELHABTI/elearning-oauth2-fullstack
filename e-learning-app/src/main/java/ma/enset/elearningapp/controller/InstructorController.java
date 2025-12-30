package ma.enset.elearningapp.controller;


import lombok.RequiredArgsConstructor;
import ma.enset.elearningapp.model.Instructor;
import ma.enset.elearningapp.service.InstructorService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/instructors")
@RequiredArgsConstructor
@CrossOrigin("*")
public class InstructorController {
    private final InstructorService instructorService;

    @GetMapping
    @PreAuthorize("hasAnyRole('STUDENT', 'ADMIN')")
    public List<Instructor> getAll() { return instructorService.getAll(); }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Instructor save(@RequestBody Instructor instructor) { return instructorService.save(instructor); }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable Long id) { instructorService.delete(id); }
}