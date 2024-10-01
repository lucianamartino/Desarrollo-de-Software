module.exports = (sequelize, DataTypes) => {
    const UsuarioRol = sequelize.define('UsuarioRol',
    {
    idUsuarioRol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
        cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        },
        Rol_idRol: {
        type: DataTypes.INTEGER,
        foreingKey: false,
        allowNull: false,
        },
        Usuario_idUsuario: {
            type: DataTypes.INTEGER,
            foreingKey: false,
            allowNull: false,
        }
    },
    {
        tableName: 'usuariorol',
        timestamps: false,
    },
    )
    
    UsuarioRol.associate = (models) => {
        UsuarioRol.belongsTo(models.Usuario, {
            as: 'Usuario',
            foreingKey: 'idUsuario'
            });
        UsuarioRol.belongsTo(models.Rol, {
            as: 'Rol',
            foreingKey: 'idRol'
            });
    };
    return UsuarioRol;

}
