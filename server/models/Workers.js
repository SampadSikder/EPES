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
    Workers.associate = (models) => {
        Workers.hasMany(models.CriticalLogs);
        Workers.hasOne(models.Assignments);
        Workers.hasOne(models.Ratings);
        Workers.hasMany(models.Training);
        Workers.hasMany(models.Rewards);
    }
    return Workers;
}
