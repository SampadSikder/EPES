module.exports = (sequelize, DataTypes) => {
    const Rewards = sequelize.define("Rewards", {
        coupon: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Rewards;
}