'use strict';

module.exports = {
    up: function (migration, DataTypes) {
        /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

      migration.changeColumn( 'UserStatuses', 'version', DataTypes.STRING);

    },
    
    down: function (migration, DataTypes) {
        /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

      migration.removeColumn('UserStatuses', 'version');
      migration.addColumn('UserStatuses', 'version', DataTypes.INTEGER);

    }
};
