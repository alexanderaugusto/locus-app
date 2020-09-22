const fs = require('fs')
const path = require('path')

module.exports = (file) => {
  const pathname = path.resolve(__dirname, '../../tmp/uploads/' + file)
  if (!pathname)
    return
    
  fs.unlink(pathname, (err) => {
    if (err) {
      console.error(err)
      return
    }
  })
}