import { sequelize } from "../database/connection.js";
import { DataTypes } from "sequelize";

export const Students = sequelize.define(
  "students",
  {
    id_estudiante: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_estudiante'
    },
    nombre_1: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    nombre_2: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    apellido_1: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    apellido_2: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    genero: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    tipo_documento: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    numero_documento: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    clave: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY, // Utiliza DATEONLY para fechas sin tiempo
      allowNull: false,
      field: 'fecha_nacimiento' // La propiedad 'field' es para mapear el nombre de columna de la tabla
    },
    id_pais: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_provincia: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_canton: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    telefono_fijo: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    telefono_celular: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    correo_institucional: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    telefono_referencia: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    nombre_referencia: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    parentesco: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    referencia_direccion: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    celular_referencia: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    dt: {
      type: DataTypes.DATE, // Para campos TIMESTAMP en MySQL
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING(255),
      defaultValue: 'assets/fotos_perfil/user.png',
    },
    codigo_estudiante: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'codigo_estudiante' // Mapeo del nombre de columna
    }
  },
  {
    timestamps: false, // No se agregarán automáticamente createdAt y updatedAt
  }
);
