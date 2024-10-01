module.exports = (sequelize, DataTypes) => {
    const Ubicacion = sequelize.define('Ubicacion',
    {
        idUbicacion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true,
        },
        calle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        numero: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dpto: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Perfil_idPerfil: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Localidad_idLocalidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'ubicacion',
        timestamps: false,
    },
    );
    Ubicacion.associate = function (models) {
        Ubicacion.belongsTo(models.Localidad, {
        as: 'localidad',
        foreignKey: 'Localidad_idLocalidad',
        });
        Ubicacion.belongsTo(models.Perfil, {
        as: 'perfil',
        foreignKey: 'Perfil_idPerfil',
        });
    };
    return Ubicacion;
}