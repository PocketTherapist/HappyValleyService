
module.exports = function (sequelize, DataTypes) {
    var table = sequelize.define('GlobalInfo',
      {
        infoId: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        },
        intValue: DataTypes.INTEGER,
        strValue: DataTypes.STRING
    }
    );
    return table;
};