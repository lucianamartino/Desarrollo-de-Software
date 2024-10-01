module.exports = (sequelize, DataTypes) => {
    const Perfil = sequelize.define('Perfil',
    {
        idPerfil: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true,
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        valoracionPromedio: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        telefono: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fechaNacimiento: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        Usuario_idUsuario: {
            type: DataTypes.INTEGER,
            foreingKey: false,
            allowNull: false,
        }
    },
    {
        tableName: 'perfil',
        timestamps: false,
    },
    )
    Perfil.associate = (models) => {
        Perfil.belongsTo(models.Usuario, {
            as: 'usuario',
            foreingKey: 'Usuario_idUsuario'
            });
    };
    return Perfil;
}
