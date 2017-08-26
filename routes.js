'use strict'

const path = require('path')
const fs = require('fs')
const pug = require('pug')

let rootPath = __dirname

let sw = null

fs.readFile(path.join(rootPath, 'sw.js'), (err, text) => {
  if (err) throw err
  sw = text
})

let index = pug.compileFile(path.join(rootPath, 'index.pug'))

module.exports = app => {
  app.get('/', (req, res) => {
    res.status(200)
      .send(index({}))
  })
  app.get('/sw.js', (req, res) => {
    if (!sw) {
      res.sendStatus(404)
    } else {
      res.status(200)
        .type('js')
        .send(sw)
    }
  })
}
