
module.exports = function (sequelize, DataTypes) {
    var Table = sequelize.define('InterviewSheet',
      {
        version: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        questionId: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        },
        templateType: DataTypes.STRING,
        questionText: DataTypes.STRING,
        figureUrl: DataTypes.STRING

    });
    return Table;
};