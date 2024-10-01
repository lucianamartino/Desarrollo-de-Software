module.exports = (sequelize, DataTypes) => {
    const Reseña = sequelize.define('Reseña',
    {
        idReseña: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true,
        },
        valoracion: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Post_idPost: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'reseña',
        timestamps: false,
    },
    )
    Reseña.associate = (models) => {
        Reseña.belongsTo(models.Post, {
            foreignKey: 'Post_idPost',
            as: 'post',
        });
    }
    return Reseña;
}