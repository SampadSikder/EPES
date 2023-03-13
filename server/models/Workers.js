module.exports = (sequelize, DataTypes) => {
    const Workers = sequelize.define("Workers", {
        workerID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        workerName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        specialization: {
            type: DataTypes.STRING,
            allowNull: false
        },
        kpi: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        assignedWork: {
            type: DataTypes.STRING,
            allowNull: true
        },
    });
    Workers.sync({ alter: true });
    return Workers;
}
