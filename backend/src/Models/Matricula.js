import { sequelize } from "../database/connection.js";
import { DataTypes } from "sequelize";
import { Students } from "./Students.js";
import { Quiz } from "./Quiz.js";
import { StudenstQuiz } from "./StudentsQuiz.js";
import { Carreers,Periods } from "./Matriz.js";

export const Matricula = sequelize.define(
  "matricula",
  {
    id_matricula: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_estudiante: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_especialidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_periodoac: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    beca: {
      type: DataTypes.FLOAT(10, 2),
      allowNull: false,
      defaultValue: 0.00,
    },
    fecha_matricula: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    total_pagar: {
      type: DataTypes.FLOAT(10, 2),
      defaultValue: null,
    },
    retirado: {
      type: DataTypes.STRING(2),
      allowNull: false,
      defaultValue: 'NO',
    },
    f_retiro: {
      type: DataTypes.STRING(10),
      defaultValue: null,
    },
    observacion: {
      type: DataTypes.STRING(500),
      defaultValue: ' ',
    },
  },
  {
    timestamps: false, // No se agregarán automáticamente createdAt y updatedAt
    tableName: 'matricula' // Asegura que Sequelize use el nombre exacto de la tabla
  }
);

export const AcademicPeriods = sequelize.define(
  "academic_periods",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(150),
      defaultValue: null,
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    active: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
  },
  {
    timestamps: false,
  },
);


Students.hasMany(Matricula, {
  foreignKey: "id_estudiante",
  sourceKey: "id_estudiante",
  onDelete: "CASCADE",
});

Matricula.belongsTo(Students, {
  foreignKey: "id_estudiante",
  sourceKey: "id_estudiante",
});



Carreers.hasMany(Matricula, {
  foreignKey: "id_especialidad",
  sourceKey: "idCarreer",
  onDelete: "CASCADE",
});

Matricula.belongsTo(Carreers, {
  foreignKey: "id_especialidad",
  sourceKey: "id_especialidad",
});

AcademicPeriods.hasMany(Matricula, {
  foreignKey: "id_periodoac",
  sourceKey: "id",
  onDelete: "CASCADE",
});

Matricula.belongsTo(AcademicPeriods, {
  foreignKey: "id_periodoac",
  sourceKey: "id_periodoac",
});


// // Relación muchos a muchos entre Students y Quiz
Matricula.belongsToMany(Quiz, {
  through: StudenstQuiz,
  foreignKey: "studentId",
  sourceKey: "id_matricula",
});

Quiz.belongsToMany(Matricula, {
  through: StudenstQuiz,
  foreignKey: "quizId",
  sourceKey: "idQuiz",
});



