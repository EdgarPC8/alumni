import { sequelize } from "../database/connection.js";
import { DataTypes } from "sequelize";

// NOMBRE	N. CEDULA	CARRERA	TELÉFONO	CORREO	MODALIDAD	FECHA GRADO	OCUPACIÓN ACTUAL	ESTUDIOS POST.	PERIODO


// -- Formacion Academica
export const Matriz = sequelize.define(
    "matrices",
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
        ci: {
            type: DataTypes.BIGINT,
          },
        career: {
            type: DataTypes.STRING(100),
            defaultValue: null,
        },
        phone: {
            type: DataTypes.STRING(15),
            defaultValue: null,
        },
        email: {
            type: DataTypes.STRING(100),
            defaultValue: null,
        },
        modality: {
            type: DataTypes.STRING(100),
            defaultValue: null,
        },
        grateDate: {
            type: DataTypes.STRING(100),
            defaultValue: null,
        },
        actualOcupation: {
            type: DataTypes.STRING(100),
            defaultValue: null,
        },
        postStudy: {
            type: DataTypes.STRING(100),
            defaultValue: null,
        },
        period: {
            type: DataTypes.STRING(100),
            defaultValue: null,
        },
    },
    {
        timestamps: false,
    }
);

