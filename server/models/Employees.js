module.exports = (sequelize, DataTypes) => {
    const Employees = sequelize.define("Employees", {
        employeeID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Employees;
}