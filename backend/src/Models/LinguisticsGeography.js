import { sequelize } from "../database/connection.js";
import { DataTypes } from "sequelize";


export const Cod_country_lenguage = sequelize.define(
  "cod_country_lenguages",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    codLP: {
      type: DataTypes.STRING(5),
      defaultValue: null,
    },
    description: {
      type: DataTypes.STRING(60),
      defaultValue: null,
    },
  },
  {
    timestamps: false,
  }
);

export const Country = sequelize.define(
  "country",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    iso: {
      type: DataTypes.CHAR(2),
      defaultValue: null,
    },
    name: {
      type: DataTypes.STRING(80),
      defaultValue: null,
    },
  },
  {
    timestamps: false,
  }
);

export const Province = sequelize.define(
  "provinces",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    province: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
  },
  {
    timestamps: false,
  }
);
export const Canton = sequelize.define(
  "cantons",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    canton: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    idProvince: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
  },
  {
    timestamps: false,
  }
);
export const Parish = sequelize.define(
  "parishes",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    parish: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    idCanton: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
  },
  {
    timestamps: false,
  }
);

// Definición de relaciones entre modelos

Province.hasMany(Canton, { foreignKey: "idProvince", sourceKey: "id" });
Canton.belongsTo(Province, { foreignKey: "idProvince", sourceKey: "id" });

Canton.hasMany(Parish, { foreignKey: "idCanton", sourceKey: "id" });
Parish.belongsTo(Canton, { foreignKey: "idCanton", sourceKey: "id" });

// Sincronizar los modelos con la base de datos
// sequelize.sync();

// export { Quiz, Question_types, Questions, Options, Responses };
