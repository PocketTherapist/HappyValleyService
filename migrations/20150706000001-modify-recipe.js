'use strict';

module.exports = {
    up: function (migration, DataTypes) {
        /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

      migration.renameColumn( 'Recipes', 'infoUrl', 'infoUrl1');
      migration.addColumn( 'Recipes', 'infoUrl2', DataTypes.STRING);
      migration.addColumn( 'Recipes', 'infoUrl3', DataTypes.STRING);



    },
    
    down: function (migration, DataTypes) {
        /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

      migration.removeColumn('Recipes', 'infoUrl3');
      migration.removeColumn('Recipes', 'infoUrl2');
      migration.renameColumn('Recipes', 'infoUrl1', 'infoUrl');
    }
};
