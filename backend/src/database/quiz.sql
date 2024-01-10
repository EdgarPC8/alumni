

-- tabla encuestas
CREATE TABLE quiz (
    id_quiz int (11)  PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100),
    description TEXT,
    date DATE
);
  INSERT INTO quizzes (title,description,date) VALUES
('ENCUESTA DE EMPLEABILIDAD A GRADUADOS','Escuesta para los graduados y egresados','2023-11-29');
CREATE TABLE question_types (
    id_question_type INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50)
);

INSERT INTO questionTypes (name) VALUES
('Preguntas Abierta'),
('Respuesta Corta'),
('Opción Múltiple (Selección Única)'),
('Opción Múltiple (Selección Múltiple)'),
('Escala de Likert');
-- tabla preguntas
CREATE TABLE questions (
    id_question int (11)  PRIMARY KEY AUTO_INCREMENT,
    id_quiz INT,
    id_question_type INT,
    question_text TEXT,
    FOREIGN KEY (id_quiz) REFERENCES quiz(id_quiz),
    FOREIGN KEY (id_question_type) REFERENCES question_types(id_question_type)
);
-- Pregunta de Opción Múltiple (Selección Única)
INSERT INTO questions (idQuestion,idQuiz, idQuestionType, questionText) VALUES
(1,1, 3, '¿Posee Titulo?'),
(2,1, 2, 'Carrera de la que Egreso'),
(3,1, 3, '¿Trabaja actualmente?'),
(4,1, 3, 'Tipo de Empresa'),
(5,1,2, 'Nombre de la Empresa'),
(6,1,2, 'Dirección del trabajo'),
(7,1,2, 'Teléfono en el trabajo'),
(8,1, 3, '¿Su cargo tiene relación con su perfil profesional?'),
(9,1, 3, 'Tiempo de servicio en la empresa'),
(10,1, 3, '¿Cuál es su situación laboral actual?'),
(11,1, 3, '¿Cuándo empezó a trabajar?'),
(12,1, 3, '¿Cuál es la relación del trabajo que tiene con la carrera que estudió?'),
(13,1, 3, '¿Cuál fue el factor que más contribuyo para que consiguiera su primer empleo?'),
(14,1,4, '¿Qué  conocimientos y habilidades son las más relevantes para el desempeño de sus actividades laborales actuales?'),
(15,1, 3, '¿Cuál es su percepción general de los/las profesionales del ITSFMS?'),
(16,1,4, 'En su opinión, ¿Cuáles son las principales carencias que tiene el programa académico de la carrera en que se graduó?'),
(17,1,2, 'En su opinión, ¿Cuáles son las principales carencias que tiene el programa académico de la carrera en que se graduó? Carrera'),
(18,1,1, 'En su opinión, ¿Cuáles son las principales carencias que tiene el programa académico de la carrera en que se graduó? Especifique'),
(19,1,4, '¿Que recomienda para estrechar las relaciones entre el ISTMS y los GRADUADOS?'),
(20,1,2, '¿Que recomienda para estrechar las relaciones entre el ISTMS y los GRADUADOS? Carrera'),
(21,1,1, '¿Que recomienda para estrechar las relaciones entre el ISTMS y los GRADUADOS? Especifique'),
(22,1, 3, '¿Ha realizado usted estudios posteriores?'),
(23,1, 2, '¿Ha realizado usted estudios posteriores? Carrera'),
(24,1, 2, '¿Ha realizado usted estudios posteriores? Centro de Estudio'),
(25,1, 2, '¿Ha realizado usted estudios posteriores? Año de titulación'),
(26,1, 2, '¿Ha realizado usted estudios posteriores? En Curso'),
(27,1, 3, '¿A qué actividades económicas se dedica la institución o empresa en la que trabaja?'),
(28,1, 3, 'En su desempeño laboral que tan necesario es el dominio del idioma inglés');
-- tabla opciones
CREATE TABLE options (
    id_option int (11)  PRIMARY KEY AUTO_INCREMENT,
    id_question INT,
    option_text TEXT,
    FOREIGN KEY (id_question) REFERENCES questions(id_question)
);

INSERT INTO options (idQuestion,optionText) VALUES
(10, 'Trabajo en un sector  relacionado a mi profesión'),
(10, 'Trabajo en un sector no relacionado a mi profesión'),
(10, 'Estoy  desempleado'),
(10, 'Otros'),
(11, 'Antes de graduarse'),
(11, 'Durante el primer año después de graduarse'),
(11, 'Un año después de graduarse'),
(11, 'No trabaja'),
(13, 'Título profesional'),
(13, 'Experiencia laboral'),
(13, 'Practicas preprofesionales'),
(13, 'Antecedentes que brinda la carrera'),
(13, 'Recomendación de terceras personas'),
(13, 'Otros'),
(14, 'Gestiona, transfiere y desarrolla soluciones informáticas para ambientes corporativos'),
(14, 'Explora problemas y genera diseños y soluciones inteligentes de sistemas informáticos mediante análisis de tecnología y costos de software y hardware'),
(14, 'Conforma equipos, procesos y sistemas de desarrollo de tecnologías informáticas con destreza y habilidad'),
(14, 'Conocimiento del lenguaje especializado de la ciencia'),
(14, 'Conoce los procedimientos de desarrollo, implementación y adecuación de medios informáticos'),
(14, 'Habilidad de trabajo en equipo y pro actividad, para adaptarse a los avances'),
(14, 'científicos y al desarrollo tecnológico.'),
(14, 'Conoce la importancia de la investigación en su propio proceso de formación'),
(14, 'Afronta y actúa con confianza y seguridad el análisis y la solución de problemas que se encuentran en la profesión'),
(14, 'Participa en procesos emprendedores'),
(16, 'Falta de actualización en nuevos temas'),
(16, 'Enseñanza de aplicaciones tecnológicas'),
(16, 'Actualización de los nuevos programas en software'),
(16, 'Capacitar continuamente al personal docente'),
(16, 'Otros'),
(19, 'Cursos de capacitación y actualización'),
(19, 'Hacer reuniones anuales de egresados'),
(19, 'Tener acceso a un directorio'),
(19, 'Otros');


-- tabla respuestas
CREATE TABLE responses (
    id_response int (11)  PRIMARY KEY AUTO_INCREMENT,
    id_quiz INT,
    id_question INT,
    user_id INT, -- si tienes un sistema de usuarios
    text_response TEXT,
    id_option INT, -- puede ser NULL para preguntas abiertas
    FOREIGN KEY (id_quiz) REFERENCES quiz(id_quiz),
    FOREIGN KEY (id_question) REFERENCES questions(id_question),
    FOREIGN KEY (id_option) REFERENCES options(id_option)
);





