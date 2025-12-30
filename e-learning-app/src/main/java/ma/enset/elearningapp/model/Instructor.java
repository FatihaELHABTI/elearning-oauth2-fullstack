package ma.enset.elearningapp.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Instructor {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String bio;

    @OneToMany(mappedBy = "instructor", cascade = CascadeType.ALL)
    @JsonIgnore // Évite les boucles infinies lors de la conversion JSON
    private List<Course> courses;
}