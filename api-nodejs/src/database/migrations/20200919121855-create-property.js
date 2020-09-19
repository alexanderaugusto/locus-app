module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Property', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      street: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      bedrooms: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      bathrooms: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      area: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      place: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      type: {
        type: Sequelize.STRING,
        allowNull: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'User', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Property')
  }
}
