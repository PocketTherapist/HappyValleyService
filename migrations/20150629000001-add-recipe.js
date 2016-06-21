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
            'Recipes',
      {
                conditionType: {
                    type: DataTypes.INTEGER,
                    primaryKey: true
                },
                version: {
                    type: DataTypes.INTEGER,
                    primaryKey: true
                },
                createdAt: {
                    type: DataTypes.DATE
                },
                updatedAt: {
                    type: DataTypes.DATE
                },
                title: DataTypes.STRING,
                overview: DataTypes.STRING,
                infoUrl: DataTypes.STRING
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

        queryInterface.dropTable('Recipes');

    }
};
