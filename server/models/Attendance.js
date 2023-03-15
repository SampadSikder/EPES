module.exports = (sequelize, DataTypes) => {
    const Attendance = sequelize.define("Attendance", {
        present: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    });

    return Attendance;
}