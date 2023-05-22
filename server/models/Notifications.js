module.exports = (sequelize, DataTypes) => {
    const Notifications = sequelize.define("Notifications", {
        notification: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });

    return Notifications;
}