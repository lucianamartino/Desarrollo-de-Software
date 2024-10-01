module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario',
    {
    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    },
    nombreUsuario: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contraseña: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    },
    {
        tableName: 'usuario',
        timestamps: false,
    },
    );
    return Usuario;
}