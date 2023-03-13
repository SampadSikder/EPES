module.exports = (sequelize, DataTypes) => {
    const Ratings = sequelize.define("Ratings", {
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    });

    return Ratings;
}