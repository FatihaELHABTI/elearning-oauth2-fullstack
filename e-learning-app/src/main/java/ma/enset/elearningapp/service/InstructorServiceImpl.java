package ma.enset.elearningapp.service;

import lombok.RequiredArgsConstructor;
import ma.enset.elearningapp.model.Instructor;
import ma.enset.elearningapp.repository.InstructorRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InstructorServiceImpl implements InstructorService {
    private final InstructorRepository repository;

    @Override public List<Instructor> getAll() { return repository.findAll(); }
    @Override public Instructor getById(Long id) { return repository.findById(id).orElse(null); }
    @Override public Instructor save(Instructor instructor) { return repository.save(instructor); }

    @Override
    public Instructor update(Long id, Instructor instructor) {
        Instructor existing = getById(id);
        if (existing != null) {
            existing.setName(instructor.getName());
            existing.setEmail(instructor.getEmail());
            existing.setBio(instructor.getBio());
            return repository.save(existing);
        }
        return null;
    }

    @Override public void delete(Long id) { repository.deleteById(id); }
}