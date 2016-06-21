
module.exports = function (sequelize, DataTypes) {
    var table = sequelize.define('InterviewSheetSelection',
      {
        version: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        questionId: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        selectionId: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        },
        answerCode: DataTypes.STRING,
        conditionType: DataTypes.INTEGER,
        nextQuestionId: DataTypes.STRING,
        selectionText: DataTypes.STRING,
        figureUrl: DataTypes.STRING

    }
    );
    return table;
};