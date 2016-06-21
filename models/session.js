
module.exports = function (sequelize, DataTypes) {
    var Session = sequelize.define('Session',
      {
        sessionId: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        },
        ownerId: DataTypes.STRING,
        closed: DataTypes.BOOLEAN
    });
    return Session;
};