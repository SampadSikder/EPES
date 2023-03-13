module.exports = (sequelize, DataTypes) => {
    const CriticalLogs = sequelize.define("CriticalLogs", {
        log: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });

    return CriticalLogs;
}