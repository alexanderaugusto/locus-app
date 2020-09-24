const { User, Property, Image } = require('../models')

module.exports = {
  create: async (req, res) => {
    const { user_id, street, city, state, country, price, bedrooms, bathrooms, area, place, type } = req.body
    const { files = [] } = req

    Property.create({ user_id, street, city, state, country, price, bedrooms, bathrooms, area, place, type })
      .then((property) => {
        if (!property) {
          return res.status(400).json({
            cod: 400,
            message: 'Os dados fornecidos são inválidos. Por favor, verifique os dados enviados e tente novamente.'
          })
        }

        if (!files.length) {
          return res.json({ ...property.dataValues, images: [] })
        }

        const images = files.map((file) => {
          return {
            path: file.key,
            property_id: property.id
          }
        })

        Image.bulkCreate(images)
          .then((createdImages) => {
            return res.json({ ...property.dataValues, images: createdImages })
          })
          .catch((err) => {
            return res.json({
              ...property.dataValues,
              images: [],
              message: 'Seu imóvel foi inserido, porém houve um erro ao adicionar as imagens, tente enviá-las novamente.'
            })
          })
      })
      .catch((err) => {
        return res.status(500).json({
          cod: 500,
          msg: 'Ocorreu um erro inesperado ao criar um novo imóvel. Por favor, tentar novamente.'
        })
      })
  },

  list: async (req, res) => {
    const { property_id: id } = req.params

    Property.findByPk(id, {
      include: [
        { association: 'owner' },
        { association: 'images' }
      ]
    })
      .then((property) => {
        return res.json(property)
      })
      .catch((err) => {
        return res.status(500).json({
          cod: 500,
          msg: 'Ocorreu um erro inesperado ao listar o imóvel. Por favor, tentar novamente.'
        })
      })
  },

  update: async (req, res) => {
    const { property_id: id } = req.params
    const { street, city, state, country, price, bedrooms, bathrooms, area, place, type } = req.body

    Property.update({ street, city, state, country, price, bedrooms, bathrooms, area, place, type }, { where: { id } })
      .then(([updated]) => {
        if (!updated) {
          return res.status(400).json({
            cod: 400,
            message: 'Os dados fornecidos são inválidos. Por favor, verifique os dados enviados e tente novamente.'
          })
        }

        return res.status(204).json()
      })
      .catch((err) => {
        return res.status(500).json({
          cod: 500,
          msg: 'Ocorreu um erro inesperado ao atualizar o imóvel. Por favor, tentar novamente.'
        })
      })
  },

  delete: async (req, res) => {
    const { property_id: id } = req.params

    console.log(id)
    
    Property.destroy({ where: { id } })
      .then((deleted) => {
        if (!deleted) {
          return res.status(400).json({
            cod: 400,
            message: 'Não conseguimos apagar este imóvel. Por favor, tente novamente.'
          })
        }

        return res.status(204).json()
      })
      .catch((err) => {
        return res.status(500).json({
          cod: 500,
          msg: 'Ocorreu um erro inesperado ao apagar o imóvel. Por favor, tentar novamente.'
        })
      })
  }
}