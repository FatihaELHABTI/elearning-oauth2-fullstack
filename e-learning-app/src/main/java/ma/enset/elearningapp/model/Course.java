package ma.enset.elearningapp.model;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Course {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private String level;
    private Integer studentsCount;

    @ManyToOne
    private Instructor instructor;
}
