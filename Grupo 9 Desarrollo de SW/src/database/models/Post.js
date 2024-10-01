module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post',
    {
        idPost: {
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
        foto: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Rubro_idRubro: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Usuario_idUsuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        valoracion: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'post',
        timestamps: false,
    },
    )
    Post.associate = (models) => {
        Post.belongsTo(models.Rubro, {
            foreignKey: 'Rubro_idRubro',
            as: 'rubro',
        });
        Post.belongsTo(models.Usuario, {
            foreignKey: 'Usuario_idUsuario',
            as: 'usuario',
        });
    }
    return Post;
}