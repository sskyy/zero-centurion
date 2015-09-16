'use strict'
require('core-js/modules/es6.array.from.js')
require('core-js/es6/map.js')
require('core-js/es6/set.js')
require('antd/lib/index.css')
require('./index.less')


var React = require("react")
var Roof = require('roof-zeroql')


var Users = require("./components/Users.jsx")
//var Logs = require('./components/Logs.jsx')
//TODO 理一下 roof container 和实例之间的关系，backend 怎么针对每个实例单独生成？
module.exports = Roof.createRootContainer({
  backend : '/taurus/centurion/query',
  types : [
    require('../../common/types/user.js'),
    require('../../common/types/log.js')
  ],
  events : [
    require('./events/client-user.js')
  ],
  render: function(){
    //<Logs />
    return <div>

      <Users/>
    </div>
  }
})
