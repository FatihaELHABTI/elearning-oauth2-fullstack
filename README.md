# E-Learning Platform - Application Full-Stack avec Spring Boot & React

## Description du Projet

Cette application est une plateforme e-learning complète permettant la gestion de cours et d'instructeurs avec un système d'authentification et d'autorisation basé sur Keycloak. Le projet suit une architecture moderne avec un backend Spring Boot sécurisé et un frontend React moderne.

---

## Architecture Globale

### Diagramme d'Architecture

![Architecture](https://github.com/FatihaELHABTI/elearning-oauth2-fullstack/blob/main/imgs/diagram-export-31-12-2025-14_14_50.png)

Le diagramme illustre l'architecture complète du système :
- **Frontend React** (port 5173) : Interface utilisateur moderne
- **Backend Spring Boot** (port 8081) : API REST sécurisée
- **Keycloak** (port 8080) : Serveur d'authentification OpenID Connect
- **H2 Database** : Base de données en mémoire pour le développement

### Flux d'authentification OIDC

![Flux OIDC](https://github.com/FatihaELHABTI/elearning-oauth2-fullstack/blob/main/imgs/Untitled%20diagram-2025-12-31-131739.png)

Le flux d'authentification suit le standard OpenID Connect :
1. L'utilisateur accède à l'application React
2. Redirection automatique vers le formulaire de connexion Keycloak
3. Saisie des identifiants (admin1 ou user1)
4. Keycloak retourne un JWT (Access Token)
5. Le frontend inclut ce token dans l'en-tête Authorization de chaque requête
6. Le backend vérifie la signature et les rôles du token via les clés publiques
7. Accès aux données protégées selon les permissions

---

## Stack Technique

### Backend
- **Spring Boot 4.0.1**
- **Spring Security** avec OAuth2 Resource Server
- **Spring Data JPA** pour la persistance
- **H2 Database** (base de données en mémoire)
- **Lombok** pour réduire le code boilerplate
- **Maven** comme gestionnaire de dépendances

### Frontend
- **React 18** avec Vite
- **Keycloak-js** pour l'intégration SSO
- **Axios** pour les requêtes HTTP
- **Tailwind CSS** pour le design
- **Lucide React** pour les icônes

### Infrastructure
- **Keycloak 22.0.1** (conteneurisé avec Docker)
- **PostgreSQL 15** pour Keycloak
- **Docker Compose** pour l'orchestration

---

## Configuration Keycloak

### Interface d'administration Keycloak - Clients

![Keycloak Clients](https://github.com/FatihaELHABTI/elearning-oauth2-fullstack/blob/main/imgs/Capture%20d'%C3%A9cran%202025-12-30%20225631.png)

La capture montre la configuration du client `react-client` dans Keycloak. Ce client permet à l'application React de s'authentifier via le protocole OpenID Connect. L'URL de redirection est configurée sur `http://localhost:3000` pour le développement local.

### Configuration des Rôles

![Keycloak Roles](https://github.com/FatihaELHABTI/elearning-oauth2-fullstack/blob/main/imgs/Capture%20d'%C3%A9cran%202025-12-30%20225709.png)

Deux rôles principaux sont configurés dans le realm `elearning-realm` :
- **ADMIN** : Accès complet à toutes les fonctionnalités (CRUD sur cours et instructeurs)
- **STUDENT** : Accès en lecture seule aux cours et instructeurs

### Gestion des Utilisateurs

![Keycloak Users](https://github.com/FatihaELHABTI/elearning-oauth2-fullstack/blob/main/imgs/Capture%20d'%C3%A9cran%202025-12-30%20225906.png)

Deux utilisateurs de test ont été créés avec l'attribution des rôles mappés :
- **admin1** : Possède le rôle ADMIN
- **user1** : Possède le rôle STUDENT

---

## Interface Utilisateur

### Page de Connexion

![Login Page](https://github.com/FatihaELHABTI/elearning-oauth2-fullstack/blob/main/imgs/Capture%20d'%C3%A9cran%202025-12-31%20002944.png)

Page de connexion Keycloak avec le branding du realm `elearning-realm`. L'utilisateur saisit ses identifiants (username: user1, password: configuré dans Keycloak) pour accéder à l'application.

### Dashboard - Vue Admin

![Dashboard Admin](https://github.com/FatihaELHABTI/elearning-oauth2-fullstack/blob/main/imgs/Capture%20d'%C3%A9cran%202025-12-31%20002549.png)

Interface principale pour l'administrateur affichant :
- Message de bienvenue personnalisé "Bonjour, admin1"
- Badge "Plateforme Certifiée" avec icône Sparkles
- Statistiques rapides : 8 Cours Actifs, 4 Profs Experts, 1.2k Apprenants
- Grille de cours avec gradients colorés et niveaux de difficulté
- Bouton "Ajouter un Cours" visible uniquement pour les admins
- Sidebar avec navigation Dashboard/Instructeurs et bouton de déconnexion

### Catalogue de Cours - Vue Complète

![Catalogue Cours](https://github.com/FatihaELHABTI/elearning-oauth2-fullstack/blob/main/imgs/Capture%20d'%C3%A9cran%202025-12-31%20002609.png)

Vue étendue du catalogue montrant plusieurs cours :
- **Intelligence Artificielle** (Avancé) - Dr. Hassan El Bahi
- **Spring Boot Microservices** (Intermédiaire) - Prof. Amine Smith
- **React Native Masterclass** (Intermédiaire) - Mme. Sofia Rahimi
- **Cyber-sécurité : Ethical Hacking** (Avancé) - M. Yassine Mansouri
- **Design UI avec Figma** (Débutant) - Mme. Sofia Rahimi
- **Python pour la Data Science** (Débutant) - Dr. Hassan El Bahi

Chaque carte de cours affiche :
- Un gradient de couleur distinctif selon le cours
- Le niveau de difficulté en badge
- Le titre et la description
- L'instructeur assigné avec un bouton info pour voir sa biographie
- Icônes d'édition et de suppression pour les admins

### Détails d'un Instructeur

![Détails Instructeur](https://github.com/FatihaELHABTI/elearning-oauth2-fullstack/blob/main/imgs/Capture%20d'%C3%A9cran%202025-12-31%20002622.png)

Modal affichant les informations complètes d'un instructeur :
- Avatar avec initiale stylisée
- Nom complet : Dr. Hassan El Bahi
- Badge "Partenaire Certifié E-LAB"
- Biographie professionnelle : "Expert en Algorithmique, Data Science et IA. Docteur en Informatique."
- Email de contact : hassan@enset.ma

### Formulaire de Modification de Cours

![Modifier Cours](https://github.com/FatihaELHABTI/elearning-oauth2-fullstack/blob/main/imgs/Capture%20d'%C3%A9cran%202025-12-31%20002759.png)

Modal permettant la mise à jour d'un cours existant avec :
- Titre du module (pré-rempli : "Intelligence Artificielle")
- Description pédagogique (pré-remplie)
- Sélection du niveau (Débutant/Intermédiaire/Avancé)
- Sélection de l'instructeur parmi la liste disponible
- Bouton "CONFIRMER ET PUBLIER" pour sauvegarder les modifications

### Formulaire d'Ajout de Cours

![Ajouter Cours](https://github.com/FatihaELHABTI/elearning-oauth2-fullstack/blob/main/imgs/Capture%20d'%C3%A9cran%202025-12-31%20002848.png)

Modal pour créer un nouveau cours avec :
- Champs vides prêts à remplir
- Menu déroulant pour le niveau (Intermédiaire sélectionné)
- Menu déroulant pour assigner un instructeur (Prof. Amine Smith sélectionné)
- Interface cohérente avec le design global de l'application

### Gestion des Instructeurs - Vue Admin

![Gestion Instructeurs](https://github.com/FatihaELHABTI/elearning-oauth2-fullstack/blob/main/imgs/Capture%20d'%C3%A9cran%202025-12-31%20002907.png)

Page dédiée à la gestion des instructeurs visible uniquement pour les admins :
- Affichage en cartes avec avatars stylisés et initiales
- Informations : nom, email professionnel
- Bouton "CONSULTER BIO" pour voir les détails
- Bouton de suppression (icône poubelle rouge)
- Bouton "Ajouter un Prof" en haut à droite

### Formulaire d'Ajout d'Instructeur

![Ajouter Instructeur](https://github.com/FatihaELHABTI/elearning-oauth2-fullstack/blob/main/imgs/Capture%20d'%C3%A9cran%202025-12-31%20002917.png)

Modal pour créer un nouvel instructeur avec les champs :
- Nom de l'instructeur
- Email professionnel
- Bio / Spécialités
- Bouton "CONFIRMER ET PUBLIER"

### Dashboard - Vue Étudiant

![Dashboard Student](https://github.com/FatihaELHABTI/elearning-oauth2-fullstack/blob/main/imgs/Capture%20d'%C3%A9cran%202025-12-31%20003000.png)

Interface pour l'utilisateur "user1" avec le rôle STUDENT :
- Message de bienvenue "Bonjour, user1"
- Mêmes statistiques que la vue admin
- Catalogue de cours en lecture seule (pas de boutons d'édition/suppression)
- Absence du bouton "Ajouter un Cours"
- Sidebar sans l'option "Instructeurs"
- Badge "STUDENT" dans le profil utilisateur

### Catalogue de Cours - Vue Étudiant Détaillée

![Catalogue Student](https://github.com/FatihaELHABTI/elearning-oauth2-fullstack/blob/main/imgs/Capture%20d'%C3%A9cran%202025-12-31%20003013.png)

Vue étudiant montrant plus de cours avec :
- Accès à tous les cours disponibles
- Possibilité de consulter les informations des instructeurs
- Interface identique mais sans les fonctionnalités d'administration
- Focus sur la consultation et la navigation

---

## Structure du Projet

### Architecture Backend

L'organisation du code backend suit une architecture en couches :
- **Controller** : Endpoints REST avec annotations de sécurité
- **Service** : Logique métier et traitements
- **Repository** : Accès aux données avec Spring Data JPA
- **Model** : Entités JPA (Course, Instructor)
- **Security** : Configuration OAuth2 et conversion JWT
- **Exception** : Gestion centralisée des erreurs

### Structure Frontend

Organisation du projet React :
- **services/** : Configuration Axios et appels API
- **App.jsx** : Composant principal avec toute l'interface
- **Keycloak.js** : Configuration du client Keycloak
- **main.jsx** : Point d'entrée avec initialisation Keycloak
- **index.css** : Styles Tailwind CSS

---

## Modèle de Données

### Entité Course
```java
@Entity
public class Course {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;              // Titre du cours
    private String description;        // Description pédagogique
    private String level;              // Débutant/Intermédiaire/Avancé
    private Integer studentsCount;     // Nombre d'apprenants
    
    @ManyToOne
    private Instructor instructor;     // Relation Many-to-One avec Instructor
}
```

### Entité Instructor
```java
@Entity
public class Instructor {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;               // Nom de l'instructeur
    private String email;              // Email professionnel
    private String bio;                // Biographie/Spécialités
    
    @OneToMany(mappedBy = "instructor", cascade = CascadeType.ALL)
    @JsonIgnore                        // Évite les boucles infinies JSON
    private List<Course> courses;
}
```

---

## Configuration Backend

### application.yml
```yaml
server:
  port: 8081

spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: http://localhost:8080/realms/elearning-realm
          jwk-set-uri: http://localhost:8080/realms/elearning-realm/protocol/openid-connect/certs
  
  datasource:
    url: jdbc:h2:mem:elearningdb
    username: sa
    password:
  
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
  
  h2:
    console:
      enabled: true

logging:
  level:
    org.springframework.security: DEBUG
```

### Sécurité - SecurityConfig.java

Cette classe configure Spring Security pour :
- Accepter uniquement les requêtes authentifiées avec JWT
- Valider les tokens via Keycloak
- Gérer les rôles ADMIN et STUDENT
- Activer CORS pour le frontend React

```java
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth.anyRequest().authenticated())
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthConverter))
            )
            .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        return http.build();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```

### Extraction des Rôles - JwtAuthConverter.java

Cette classe convertit les rôles Keycloak en autorités Spring Security :

```java
@Component
public class JwtAuthConverter implements Converter<Jwt, AbstractAuthenticationToken> {
    
    @Override
    public AbstractAuthenticationToken convert(Jwt jwt) {
        Collection<GrantedAuthority> authorities = Stream.concat(
            jwtGrantedAuthoritiesConverter.convert(jwt).stream(),
            extractResourceRoles(jwt).stream()
        ).collect(Collectors.toSet());
        
        return new JwtAuthenticationToken(jwt, authorities, jwt.getClaimAsString("preferred_username"));
    }
    
    private Collection<? extends GrantedAuthority> extractResourceRoles(Jwt jwt) {
        Map<String, Object> realmAccess = jwt.getClaim("realm_access");
        if (realmAccess == null) return Set.of();
        
        Collection<String> roles = (Collection<String>) realmAccess.get("roles");
        return roles.stream()
            .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
            .collect(Collectors.toSet());
    }
}
```

---

## Endpoints API

### Courses

| Méthode | Endpoint | Rôles autorisés | Description |
|---------|----------|-----------------|-------------|
| GET | /api/courses | STUDENT, ADMIN | Récupérer tous les cours |
| POST | /api/courses | ADMIN | Créer un nouveau cours |
| PUT | /api/courses/{id} | ADMIN | Mettre à jour un cours |
| DELETE | /api/courses/{id} | ADMIN | Supprimer un cours |

### Instructors

| Méthode | Endpoint | Rôles autorisés | Description |
|---------|----------|-----------------|-------------|
| GET | /api/instructors | STUDENT, ADMIN | Récupérer tous les instructeurs |
| POST | /api/instructors | ADMIN | Créer un nouvel instructeur |
| DELETE | /api/instructors/{id} | ADMIN | Supprimer un instructeur |

---

## Configuration Frontend

### Keycloak.js
```javascript
import Keycloak from "keycloak-js";

const keycloakConfig = {
  url: "http://localhost:8080",
  realm: "elearning-realm",
  clientId: "react-client",
};

const keycloak = new Keycloak(keycloakConfig);
export default keycloak;
```

### Axios Interceptor (api.js)
```javascript
import axios from 'axios';
import keycloak from '../Keycloak';

const api = axios.create({
    baseURL: 'http://localhost:8081/api'
});

api.interceptors.request.use((config) => {
    if (keycloak.token) {
        config.headers.Authorization = `Bearer ${keycloak.token}`;
    }
    return config;
});

export const getCourses = () => api.get('/courses');
export const saveCourse = (course) => api.post('/courses', course);
export const updateCourse = (id, course) => api.put(`/courses/${id}`, course);
export const deleteCourse = (id) => api.delete(`/courses/${id}`);

export const getInstructors = () => api.get('/instructors');
export const saveInstructor = (inst) => api.post('/instructors', inst);
export const deleteInstructor = (id) => api.delete(`/instructors/${id}`);
```

---

## Installation et Démarrage

### Prérequis
- Java 17 ou supérieur
- Maven 3.8+
- Node.js 18+ et npm
- Docker et Docker Compose

### Étape 1 : Démarrer Keycloak

```bash
docker-compose up -d
```

Accédez à http://localhost:8080 et connectez-vous avec :
- Username: admin
- Password: admin

### Étape 2 : Configurer Keycloak

1. Créer un realm nommé `elearning-realm`
2. Créer un client `react-client` :
   - Client Protocol: openid-connect
   - Access Type: public
   - Valid Redirect URIs: http://localhost:5173/*
   - Web Origins: http://localhost:5173
3. Créer deux rôles :
   - ADMIN
   - STUDENT
4. Créer deux utilisateurs :
   - admin1 avec le rôle ADMIN
   - user1 avec le rôle STUDENT

### Étape 3 : Démarrer le Backend

```bash
cd e-learning-app
mvn clean install
mvn spring-boot:run
```

Le backend démarre sur http://localhost:8081

### Étape 4 : Démarrer le Frontend

```bash
cd elearning-frontend
npm install
npm run dev
```

Le frontend démarre sur http://localhost:5173

---

## Fonctionnalités

### Pour les Étudiants (STUDENT)
- Consulter la liste des cours disponibles
- Voir les détails des instructeurs
- Visualiser les informations des cours (niveau, nombre d'apprenants)

### Pour les Administrateurs (ADMIN)
- Toutes les fonctionnalités des étudiants
- Créer, modifier et supprimer des cours
- Créer et supprimer des instructeurs
- Gérer le catalogue complet de la plateforme

---

## Données de Démonstration

L'application initialise automatiquement :

### 4 Instructeurs
- Dr. Hassan El Bahi (Expert IA et Data Science)
- Prof. Amine Smith (Architecte Cloud Java/Spring)
- Mme. Sofia Rahimi (UX/UI Designer et Frontend)
- M. Yassine Mansouri (Cyber-sécurité)

### 8 Cours
- Intelligence Artificielle (Avancé, 450 étudiants)
- Spring Boot Microservices (Intermédiaire, 320 étudiants)
- React Native Masterclass (Intermédiaire, 210 étudiants)
- Cyber-sécurité : Ethical Hacking (Avancé, 180 étudiants)
- Design UI avec Figma (Débutant, 540 étudiants)
- Python pour la Data Science (Débutant, 890 étudiants)
- DevOps et Jenkins (Intermédiaire, 150 étudiants)
- React v19 & Tailwind CSS (Débutant, 410 étudiants)

---

## Gestion des Erreurs

### GlobalExceptionHandler.java
```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleRuntime(RuntimeException e) {
        return Map.of("error", e.getMessage());
    }
}
```

---

## Sécurité

### Points clés
- Authentification obligatoire via Keycloak
- Tokens JWT signés et vérifiés
- Gestion des rôles avec Spring Security
- Sessions stateless (pas de stockage côté serveur)
- CORS configuré pour le frontend React
- Protection CSRF désactivée (API REST stateless)

### Exemple de vérification des rôles
```java
@PreAuthorize("hasRole('ADMIN')")
public Course save(@RequestBody Course course) {
    return courseService.save(course);
}
```

---

## Tests

### Accès H2 Console
Visitez http://localhost:8081/h2-console
- JDBC URL: jdbc:h2:mem:elearningdb
- Username: sa
- Password: (vide)

### Test des endpoints avec curl

```bash
# Récupérer tous les cours (nécessite un token)
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:8081/api/courses

# Créer un cours (ADMIN uniquement)
curl -X POST -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
     -d '{"title":"Nouveau Cours","description":"Description","level":"Débutant","studentsCount":0}' \
     http://localhost:8081/api/courses
```

---

## Dépendances Principales

### pom.xml (Backend)
```xml
<dependencies>
    <!-- Spring Boot Web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-webmvc</artifactId>
    </dependency>
    
    <!-- Spring Security + OAuth2 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security-oauth2-resource-server</artifactId>
    </dependency>
    
    <!-- JPA + H2 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>com.h2database</groupId>
        <artifactId>h2</artifactId>
    </dependency>
    
    <!-- Lombok -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>
</dependencies>
```

### package.json (Frontend)
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "keycloak-js": "^22.0.1",
    "axios": "^1.5.0",
    "lucide-react": "^0.263.1"
  },
  "devDependencies": {
    "tailwindcss": "^3.3.0",
    "vite": "^4.4.5"
  }
}
```

---

## Améliorations Futures

- Ajout de la pagination pour les listes
- Système de recherche et filtres avancés
- Upload d'images pour les cours et instructeurs
- Gestion des inscriptions étudiants
- Tableau de bord avec statistiques
- Notifications en temps réel
- Tests unitaires et d'intégration
- Déploiement en production avec Kubernetes

---

## Auteur

Développé dans le cadre d'un projet académique ENSET - E-LAB Platform

---

## License

Ce projet est sous licence MIT - libre d'utilisation à des fins éducatives.
