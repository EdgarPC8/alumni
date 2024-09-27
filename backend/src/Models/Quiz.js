import { sequelize } from "../database/connection.js";
import { DataTypes } from "sequelize";

const Questions = sequelize.define(
  "questions",
  {
    idQuestion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idQuiz: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    idQuestionType: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    questionText: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
  },
  {
    timestamps: false,
  },
);
const Options = sequelize.define(
  "options",
  {
    idOption: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idQuestion: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    optionText: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
  },
  {
    timestamps: false,
  },
);
// -- tabla respuestas
const Responses = sequelize.define(
  "responses",
  {
    idResponse: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idQuiz: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    idQuestion: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      //osea no le puedo poner aqui como parametro con cual va relacionado??
    },
    userId: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    textResponse: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    idOption: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
  },
  {
    timestamps: false,
  },
);
// tipo de preguntas
const QuestionTypes = sequelize.define(
  "questionTypes",
  {
    idQuestionType: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
  },
  {
    timestamps: false,
  },
);

// -- Encuesta
const Quiz = sequelize.define(
  "quiz",
  {
    idQuiz: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: null,
    },
    document: {
      type: DataTypes.JSON,
      defaultValue: null,
    },
  },
  {
    timestamps: false,
  },
);

// Definición de relaciones entre modelos
Quiz.hasMany(Questions, { foreignKey: "idQuiz", sourceKey: "idQuiz" });
Questions.belongsTo(Quiz, { foreignKey: "idQuiz", sourceKey: "idQuiz" });

QuestionTypes.hasMany(Questions, {
  foreignKey: "idQuestionType",
  sourceKey: "idQuestionType",
});
Questions.belongsTo(QuestionTypes, {
  foreignKey: "idQuestionType",
  sourceKey: "idQuestionType",
});

Questions.hasMany(Options, {
  foreignKey: "idQuestion",
  sourceKey: "idQuestion",
});
Options.belongsTo(Questions, {
  foreignKey: "idQuestion",
  sourceKey: "idQuestion",
});

Quiz.hasMany(Responses, { foreignKey: "idQuiz", sourceKey: "idQuiz" });
Responses.belongsTo(Quiz, { foreignKey: "idQuiz", sourceKey: "idQuiz" });

Questions.hasMany(Responses, {
  foreignKey: "idQuestion",
  sourceKey: "idQuestion",
});
Responses.belongsTo(Questions, {
  foreignKey: "idQuestion",
  sourceKey: "idQuestion",
});
Options.hasMany(Responses, { foreignKey: "idOption", sourceKey: "idOption" });
Responses.belongsTo(Options, {
  foreignKey: "idOption",
  sourceKey: "idOption",
});

export { Quiz, QuestionTypes, Questions, Options, Responses };
