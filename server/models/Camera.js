module.exports = (sequelize, DataTypes) => {
    const Camera = sequelize.define("Camera", {
        workplaceName: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        cameraURL: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    return Camera;
}