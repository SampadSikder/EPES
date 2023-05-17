module.exports = (sequelize, DataTypes) => {
    const Notifications = sequelize.define("Notifications", {
        workplaceName: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });

    return Notifications;
}