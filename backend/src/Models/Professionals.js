import { sequelize } from "../database/connection.js";
import { DataTypes } from "sequelize";
import {
  AcademicProfessionalMerits,
  AcademicTraining,
  Books,
  CoursesWorkshops,
  IntellectualProduction,
  Languages,
  ProfessionalExperience,
  TeachingExperience,
} from "./CV.js";

export const Professionals = sequelize.define(
  "professionals",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ci: {
      type: DataTypes.BIGINT(11),
      allowNull: false, // No permite valores nulos
      unique: true, // Hace que el campo sea único
    },
    firstName: {
      type: DataTypes.STRING(50),
      defaultValue: null,
    },
    secondName: {
      type: DataTypes.STRING(50),
      defaultValue: null,
    },
    firstLastName: {
      type: DataTypes.STRING(50),
      defaultValue: null,
    },
    secondLastName: {
      type: DataTypes.STRING(50),
      defaultValue: null,
    },
    bloodType: {
      type: DataTypes.STRING(10),
      defaultValue: null,
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      defaultValue: null,
    },
    gender: {
      type: DataTypes.STRING(5),
      defaultValue: null,
    },
    civilStatus: {
      type: DataTypes.STRING(10),
      defaultValue: null,
    },
    nationality: {
      type: DataTypes.STRING(50),
      defaultValue: null,
    },
    placeBirth: {
      type: DataTypes.STRING(100),
      defaultValue: null,
    },
    placeResidence: {
      type: DataTypes.STRING(100),
      defaultValue: null,
    },
    direction: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    homePhone: {
      type: DataTypes.STRING(20),
      defaultValue: null,
    },
    cellPhone: {
      type: DataTypes.STRING(20),
      defaultValue: null,
    },
    personalEmail: {
      type: DataTypes.STRING(60),
      defaultValue: null,
    },
    institutionalEmail: {
      type: DataTypes.STRING(60),
      defaultValue: null,
    },
    image: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
  },
  {
    timestamps: false,
  }
);

Professionals.hasMany(AcademicTraining, {
  foreignKey: "professionalId",
  sourceKey: "id",
});

AcademicTraining.belongsTo(Professionals, {
  foreignKey: "professionalId",
  sourceKey: "id",
});

Professionals.hasMany(TeachingExperience, {
  foreignKey: "professionalId",
  sourceKey: "id",
});

TeachingExperience.belongsTo(Professionals, {
  foreignKey: "professionalId",
  sourceKey: "id",
});

Professionals.hasMany(CoursesWorkshops, {
  foreignKey: "professionalId",
  sourceKey: "id",
});

CoursesWorkshops.belongsTo(Professionals, {
  foreignKey: "professionalId",
  sourceKey: "id",
});

Professionals.hasMany(IntellectualProduction, {
  foreignKey: "professionalId",
  sourceKey: "id",
});

IntellectualProduction.belongsTo(Professionals, {
  foreignKey: "professionalId",
  sourceKey: "id",
});

Professionals.hasMany(Books, {
  foreignKey: "professionalId",
  sourceKey: "id",
});

Books.belongsTo(Professionals, {
  foreignKey: "professionalId",
  sourceKey: "id",
});

Professionals.hasMany(AcademicProfessionalMerits, {
  foreignKey: "professionalId",
  sourceKey: "id",
});

AcademicProfessionalMerits.belongsTo(Professionals, {
  foreignKey: "professionalId",
  sourceKey: "id",
});

Professionals.hasMany(Languages, {
  foreignKey: "professionalId",
  sourceKey: "id",
});

Languages.belongsTo(Professionals, {
  foreignKey: "professionalId",
  sourceKey: "id",
});

Professionals.hasMany(ProfessionalExperience, {
  foreignKey: "professionalId",
  sourceKey: "id",
});

ProfessionalExperience.belongsTo(Professionals, {
  foreignKey: "professionalId",
  sourceKey: "id",
});
