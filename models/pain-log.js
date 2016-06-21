
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('PainLog',
      {
        userId: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        entriedAt: {
            type: DataTypes.DATE,
            primaryKey: true
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        },
        isBeforeTreatment: DataTypes.BOOLEAN,
        painRate: DataTypes.INTEGER
        
    });
    return User;
};