'use strict';

module.exports = {
    up: function (migration, DataTypes) {
        /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

      migration.createTable(
            'GlobalInfos',
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
        migration.createTable(
            'Users',
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
                lastAccessedAt: DataTypes.DATE
            }
        );
        
        migration.createTable(
            'UserStatuses',
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
                conditionType: DataTypes.INTEGER
            }
        );
        
        migration.createTable(
            'Devices',
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
        migration.createTable(
            'Sessions',
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
            }
        );
        
        migration.createTable(
            'InterviewSheets',
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

            }
        );
        
        migration.createTable(
            'InterviewSheetSelections',
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
        migration.createTable(
            'InterviewSessions',
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
        
        migration.createTable(
            'InterviewLogs',
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


    },
    
    down: function (queryInterface, DataTypes) {
        /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

        queryInterface.dropTable('InterviewLogDetails');
        queryInterface.dropTable('InterviewLogs'); 
        queryInterface.dropTable('InterviewSheetSelections');
        queryInterface.dropTable('InterviewSheets');
        queryInterface.dropTable('Devices');
        queryInterface.dropTable('Sessions');
        queryInterface.dropTable('UserStatuses');
        queryInterface.dropTable('Users');
        queryInterface.dropTable('GlobalInfos');
    }
};
