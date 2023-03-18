module.exports = (sequelize, DataTypes) => {
    const Ratings = sequelize.define("Ratings", {
        rating: {
            type: DataTypes.DOUBLE,
            allowNull: true
        }
    });

    return Ratings;
}