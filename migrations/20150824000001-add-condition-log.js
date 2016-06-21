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
            'PainLogs',
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
          painRate: DataTypes.INTEGER,
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

        queryInterface.dropTable('PainLogs');

    }
};
