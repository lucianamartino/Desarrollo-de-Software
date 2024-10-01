module.exports = (sequelize, DataTypes) => {
    const Localidad = sequelize.define('Localidad',
    {
    idLocalidad: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Provincia_idProvincia: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    },
    {
        tableName: 'localidad',
        timestamps: false,
    },
    )
         
    Localidad.associate = function (models) {
        Localidad.belongsTo(models.Provincia, {
        as: 'provincia',
        foreignKey: 'Provincia_idProvincia',
        });
    };

    return Localidad;
}

    
    
    