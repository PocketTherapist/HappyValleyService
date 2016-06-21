
module.exports = function (sequelize, DataTypes) {
    var table = sequelize.define('InterviewSession',
      {
        interviewSessionId: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        userId: {
            type: DataTypes.STRING
        },
        seq: {
            type: DataTypes.INTEGER
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        },
        sheetVersion: DataTypes.STRING,
        status: DataTypes.INTEGER,
        conditionType: DataTypes.INTEGER,
        closed: DataTypes.BOOLEAN

    }
    );
    return table;
};