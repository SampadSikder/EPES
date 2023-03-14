module.exports = (sequelize, DataTypes) => {
    const Supervisors = sequelize.define("Supervisors", {
        supervisorID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        supervisorName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        department: {
            type: DataTypes.STRING,
            allowNull: false
        },
        team: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Supervisors;
}