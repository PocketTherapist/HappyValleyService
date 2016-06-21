
module.exports = function (sequelize, DataTypes) {
    var table = sequelize.define('UserStatus',
      {
        userId: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        },
        version: DataTypes.INTEGER,
        conditionType: DataTypes.INTEGER,
        painRate: DataTypes.INTEGER
    }
    );
    return table;
};