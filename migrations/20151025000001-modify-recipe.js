'use strict';

module.exports = {
    up: function (migration, DataTypes) {
        /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

        migration.addColumn('Recipes', 'infoUrl1Name', DataTypes.STRING);
        migration.addColumn('Recipes', 'infoUrl2Name', DataTypes.STRING);
        migration.addColumn('Recipes', 'infoUrl3Name', DataTypes.STRING);
    },
    
    down: function (migration, DataTypes) {
        /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

        migration.removeColumn('Recipes', 'infoUrl1Name');
        migration.removeColumn('Recipes', 'infoUrl2Name');
        migration.removeColumn('Recipes', 'infoUrl3Name');

    }
};
