module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    path: DataTypes.STRING
  })

  Image.associate = (models) => {
    Image.belongsTo(models.Property, { foreignKey: 'property_id', as: 'property' })
  }

  return Image
}