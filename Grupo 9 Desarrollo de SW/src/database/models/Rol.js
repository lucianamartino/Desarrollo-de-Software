module.exports = (sequelize, DataTypes) => {
    const Rol = sequelize.define('Rol',
    {
        idRol: {
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
    },
    {
        tableName: 'rol',
        timestamps: false,
    },
    );
    return Rol;
}