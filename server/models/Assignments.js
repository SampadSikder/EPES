module.exports = (sequelize, DataTypes) => {
    const Assignments = sequelize.define("Assignments", {
        assignedWorkplace: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        workplaceType: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return Assignments;
}