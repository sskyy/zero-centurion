'use strict'
require('core-js/modules/es6.array.from.js')
require('core-js/es6/map.js')
require('core-js/es6/set.js')
require('antd/lib/index.css')

var React = require("react")
var Roof = require('roof-zeroql')


var SignIn = require("./components/SignIn.jsx")
var SignUp = require('./components/SignUp.jsx')

//TODO 理一下 roof container 和实例之间的关系，backend 怎么针对每个实例单独生成？
module.exports = Roof.createRootContainer({
  backend : '/taurus/query',
  types : [
    require('../../common/types/user.js'),
    require('../../common/types/log.js'),
  ],
  events : [
    require('./events/client.js')
  ],
  serverEvents : [
    require('./events/registry.js')
  ],
  render: function(){
    return <div className='container'>
      <SignIn/>
      <SignUp />
    </div>
  }
})
