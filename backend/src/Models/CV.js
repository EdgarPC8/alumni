import { sequelize } from "../database/connection.js";
import { DataTypes } from "sequelize";


// -- Formacion Academica
export const AcademicTraining = sequelize.define(
  "academic_training",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: null,
    },
    place: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    country: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    obtainedTitle: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    educationalInstitution: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    senescytRegistrationN: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
  },
  {
    timestamps: false,
  }
);
// -- Experiencia Docente
export const TeachingExperience = sequelize.define(
  "teaching_experience",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    educationalInstitution: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    subject: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      defaultValue: null,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      defaultValue: null,
    },
    modality: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    place: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    country: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
  },
  {
    timestamps: false,
  }
);
//   -- Cursos Talleres Seminarios etc
export const CoursesWorkshops = sequelize.define(
  "courses_workshops",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    name: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    organizedBy: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    place: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    duration: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    startDate: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    endDate: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    typeParticipation: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
  },
  {
    timestamps: false,
  }
);
// -- Produccion intelectual
export const IntellectualProduction = sequelize.define(
  "intellectual_production",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    name: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    typeAuthorship: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    date: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    webLink: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
  },
  {
    timestamps: false,
  }
);
//   -- Libros
export const Books = sequelize.define(
  "books",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    type: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    typeAuthorship: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    isbN: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    editorialName: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    editorialOrigin: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    year: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
  },
  {
    timestamps: false,
  }
);
// -- Meritos academicos y profesionales
export const AcademicProfessionalMerits = sequelize.define(
  "academic_professional_merits",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    date: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    type: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    grantedBy: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    country: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    location: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
  },
  {
    timestamps: false,
  }
);
//   -- Idiomas
export const Languages = sequelize.define(
  "languages",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    typeCertification: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    speakingLevel: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    writingLevel: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    comprehensionLevel: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
  },
  {
    timestamps: false,
  }
);
// -- Experiencia Profesional
export const ProfessionalExperience = sequelize.define(
  "professional_experience",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // nro: {
    //   type: DataTypes.STRING(11),
    //   defaultValue: null,
    // },
    companyInstitution: {
      type: DataTypes.STRING(50),
      defaultValue: null,
    },
    position: {
      type: DataTypes.STRING(50),
      defaultValue: null,
    },
    responsibilities: {
      type: DataTypes.STRING(50),
      defaultValue: null,
    },
    immediateHead: {
      type: DataTypes.STRING(50),
      defaultValue: null,
    },
    telephone: {
      type: DataTypes.STRING(10),
      defaultValue: null,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      defaultValue: null,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      defaultValue: null,
    },
  },
  {
    timestamps: false,
  }
);
