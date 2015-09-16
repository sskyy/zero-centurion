'use strict'

require('node-jsx').install({extension: '.jsx'})
var path = require('path')
var passport = require('koa-passport')
var LocalStrategy = require('passport-local')
var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID
var serverEventBridge = require('./serverEventBridge')
var Galaxies = require('roof-zeroql/lib/Galaxies')
var co = require('co')
var print = require('pretty-log-2').pp

var centurion = {
  types: [require('./common/types/user.js')],
  entries: {
    path: path.join(__dirname, 'entries'),
    container: require('./Page.jsx'),
    spec: {
      registry: {
        serverEvents: [
          serverEventBridge(['user.register', 'user.login']),
        ],
        types: [
          require('./common/types/user.js'),
          require('./common/types/log.js'),
          require('./common/types/todo.js')
        ]
      },
      management: {
        serverEvents: [
          require('./entries/management/events/user')
        ],
        types: [
          require('./common/types/user.js'),
          require('./common/types/log.js'),
          require('./common/types/todo.js')
        ]
      }
    }
  },
  assets: [{
    path: path.join(__dirname, 'public'),
  }],
  listen: {
    'user.login': function *centurionUserLogin(identity) {

      console.log('trying to login', identity)
      var User = centurion.galaxies.getNodeClass('User')
      var user = yield User.from({name: identity.name, password: identity.password})
      if (!user) {
        console.log('user not exist')
        return this.error(406, {msg: 'user not exist'})
      }


      this.req.session.user = {name: identity.name,id:user.get('id')}
      console.log('set session', this.req.session)
      this.data.set('user.login.result', {name: identity.name})
    },
    'user.logout': function () {

    },
    'user.register': function *centurionUserRegister(data) {
      console.log('user.register fired', data)
      var User = centurion.galaxies.getNodeClass('User')
      var user = new User(data)

      //同名检测
      var isExist = yield User.exist({name: data.name})
      if (isExist) {
        console.log('user exist')
        return this.error(406, {msg: 'user exist'})
      }

      yield user.push()
      this.data.set('user.register.result', user.toObject())
    },
    'user.destroy': function () {

    }
  },
  backendHandler: function (type, args) {

    //TODO roof-zeroql 不支持 generator
    //var that = centurion
    var taurus = centurion.deps.taurus.collections['centurion']
    return co(function *() {
      if (type === 'query') {
        let result = {}
        for (let queryName in args) {
          result[queryName] = yield taurus.pull(args[queryName])
        }
        return result

      } else if (type === 'push') {
        return yield taurus.push(args.ast, args.rawNodesToSave, args.trackerRelationMap)

      } else if (type === 'destroy') {
        return yield taurus.destroy(args.type, args.id)
      }
    })
  },
  bootstrap: function (app) {
    this.galaxies = new Galaxies(centurion.backendHandler, centurion.types)
  },
  connection: {
    host: 'localhost',
    user: 'root',
    socketPath: '/tmp/mysql.sock',
    database: 'taurus'
  }
}


module.exports = centurion