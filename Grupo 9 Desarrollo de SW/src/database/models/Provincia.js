module.exports = (sequelize, DataTypes) => {
    const Provincia = sequelize.define('Provincia',
    {
        idProvincia: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'provincia',
        timestamps: false,
    },
    );
    return Provincia;
}