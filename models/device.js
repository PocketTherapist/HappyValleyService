
module.exports = function (sequelize, DataTypes) {
    var table = sequelize.define('Device',
      {
        deviceId: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        },
        uniqId: DataTypes.STRING,
        ownerId: DataTypes.STRING
    }
    );
    return table;
};