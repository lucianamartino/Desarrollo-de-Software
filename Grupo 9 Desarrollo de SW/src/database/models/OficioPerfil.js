module.exports = (sequelize, DataTypes) => {
    const OficioPerfil = sequelize.define('OficioPerfil',
    {
        idOficioPerfil: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Perfil_idPerfil: {
            type: DataTypes.INTEGER,
            foreingKey: false,
            allowNull: false,
        },
        Oficio_idOficio: {
            type: DataTypes.INTEGER,
            foreingKey: false,
            allowNull: false,
        }
    },
    {
        tableName: 'oficioperfil',
        timestamps: false,
    },
    )
    OficioPerfil.associate = (models) => {  
        OficioPerfil.belongsTo(models.Perfil, {
            as: 'perfil',
            foreingKey: 'Perfil_idPerfil'
            });
        OficioPerfil.belongsTo(models.Oficio, {
            as: 'oficio',
            foreingKey: 'Odificio_idOficio'
            });
    };
    return OficioPerfil;
}