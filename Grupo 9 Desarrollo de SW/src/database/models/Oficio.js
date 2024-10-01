module.exports = (sequelize, DataTypes) => {
    const Oficio = sequelize.define('Oficio',
    {
    idOficio: {
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
        descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
        },
    },
    {
        tableName: 'oficio',
        timestamps: false,
    },
    );
    return Oficio;
}