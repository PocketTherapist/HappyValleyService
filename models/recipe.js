
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('Recipe',
      {
        conditionType: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        version: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        },
        title: DataTypes.STRING,
        overview: DataTypes.STRING,
        infoUrl1: DataTypes.STRING,
        infoUrl2: DataTypes.STRING,
        infoUrl3: DataTypes.STRING,
        infoUrl1Name: DataTypes.STRING,
        infoUrl2Name: DataTypes.STRING,
        infoUrl3Name: DataTypes.STRING,
    });
    return User;
};