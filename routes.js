'use strict'

const path = require('path')
const fs = require('fs')
const pug = require('pug')

let rootPath = __dirname

let style = null

let script = null

let money = null

fs.readFile(path.join(rootPath, 'style', 'main.css'), (err, text) => {
  if (err) throw err
  style = text
})

fs.readFile(path.join(rootPath, 'script', 'main.js'), (err, text) => {
  if (err) throw err
  script = text
})

fs.readFile(path.join(rootPath, 'script', 'money.min.js'), (err, text) => {
  if (err) throw err
  money = text
})

let index = pug.compileFile(path.join(rootPath, 'index.pug'))

module.exports = app => {
  app.get('/', (req, res) => {
    res.status(200)
      .send(index({}))
  })

  app.get('/style/main.css', (req, res) => {
    res.type('css')
      .send(style)
  })

  app.get('/script/main.js', (req, res) => {
    res.type('js')
      .send(script)
  })

  app.get('/script/money.min.js', (req, res) => {
    res.type('js')
      .send(money)
  })
}
