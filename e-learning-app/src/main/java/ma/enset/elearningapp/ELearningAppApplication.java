package ma.enset.elearningapp;

import ma.enset.elearningapp.model.Course;
import ma.enset.elearningapp.model.Instructor;
import ma.enset.elearningapp.repository.CourseRepository;
import ma.enset.elearningapp.repository.InstructorRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class ELearningAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(ELearningAppApplication.class, args);
    }

    @Bean
    CommandLineRunner start(CourseRepository courseRepository, InstructorRepository instructorRepository) {
        return args -> {
            // 1. Création de 4 Instructeurs avec des spécialités différentes
            Instructor inst1 = Instructor.builder()
                    .name("Dr. Hassan El Bahi")
                    .email("hassan@enset.ma")
                    .bio("Expert en Algorithmique, Data Science et IA. Docteur en Informatique.")
                    .build();

            Instructor inst2 = Instructor.builder()
                    .name("Prof. Amine Smith")
                    .email("amine@enset.ma")
                    .bio("Architecte Cloud et expert Java/Spring Boot avec 15 ans d'expérience.")
                    .build();

            Instructor inst3 = Instructor.builder()
                    .name("Mme. Sofia Rahimi")
                    .email("sofia@enset.ma")
                    .bio("UX/UI Designer Senior et experte en développement Frontend moderne (React/Vue).")
                    .build();

            Instructor inst4 = Instructor.builder()
                    .name("M. Yassine Mansouri")
                    .email("yassine@enset.ma")
                    .bio("Spécialiste en Cyber-sécurité et Ethical Hacking.")
                    .build();

            instructorRepository.saveAll(List.of(inst1, inst2, inst3, inst4));

            // 2. Création d'un catalogue de cours varié
            courseRepository.saveAll(List.of(
                    Course.builder().title("Intelligence Artificielle").description("Fondamentaux du Machine Learning et Deep Learning.").level("Avancé").studentsCount(450).instructor(inst1).build(),
                    Course.builder().title("Spring Boot Microservices").description("Architecture distribuée et déploiement avec Docker/K8s.").level("Intermédiaire").studentsCount(320).instructor(inst2).build(),
                    Course.builder().title("React Native Masterclass").description("Développer des applications mobiles cross-platform.").level("Intermédiaire").studentsCount(210).instructor(inst3).build(),
                    Course.builder().title("Cyber-sécurité : Ethical Hacking").description("Sécurisez vos infrastructures contre les attaques modernes.").level("Avancé").studentsCount(180).instructor(inst4).build(),
                    Course.builder().title("Design UI avec Figma").description("Apprendre à créer des interfaces modernes et ergonomiques.").level("Débutant").studentsCount(540).instructor(inst3).build(),
                    Course.builder().title("Python pour la Data Science").description("Analyse de données avec Pandas, Numpy et Matplotlib.").level("Débutant").studentsCount(890).instructor(inst1).build(),
                    Course.builder().title("DevOps et Jenkins").description("Automatisation du cycle CI/CD pour vos projets Informatiques.").level("Intermédiaire").studentsCount(150).instructor(inst2).build(),
                    Course.builder().title("React v19 & Tailwind CSS").description("Maîtrisez les dernières nouveautés du Frontend.").level("Débutant").studentsCount(410).instructor(inst3).build()
            ));

            System.out.println(">>> Catalogue E-LAB initialisé avec 4 profs et 8 cours !");
        };
    }
}