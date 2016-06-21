
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User',
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
        familyName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        age: DataTypes.INTEGER,
        sex: DataTypes.INTEGER,
        addressCode: DataTypes.INTEGER,
        password: DataTypes.STRING,
        passwordLastUpdatedAt: DataTypes.DATE,
        lastAccessedAt: DataTypes.DATE,
        temporaryPassword: DataTypes.BOOLEAN
    });
    return User;
};