module.exports = (sequelize, DataTypes) => {
    // class Manager {
    //     constructor() {
    //         this.employeeID = {
    //             type: DataTypes.INTEGER,
    //             allowNull: false,
    //             primaryKey: true
    //         },
    //             this.employeeName = {
    //                 type: DataTypes.STRING,
    //                 allowNull: false
    //             },
    //             this.department = {
    //                 type: DataTypes.STRING,
    //                 allowNull: false
    //             }
    //     }

    // }

    const Managers = sequelize.define("Managers", {
        managerID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        managerName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        department: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    Managers.sync({ alter: true });
    return Managers;
}