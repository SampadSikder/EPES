module.exports = (sequelize, DataTypes) => {
    const Training = sequelize.define("Training", {
        type: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Training;
}