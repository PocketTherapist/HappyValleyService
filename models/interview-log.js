
module.exports = function (sequelize, DataTypes) {
    var table = sequelize.define('InterviewLog',
      {
        interviewSessionId: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        step: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        userId: {
            type: DataTypes.STRING,
        },
        seq: {
            type: DataTypes.INTEGER,
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        },
        sheetVersion: DataTypes.STRING,
        questionId: DataTypes.STRING,
        selectedId: DataTypes.INTEGER
    }
    );
    return table;
};