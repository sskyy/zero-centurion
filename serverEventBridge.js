
var _ = require('lodash')

module.exports = function( events ){


  return function generatedInitializer( galaxies, types  ){

    return  _.zipObject( events, events.map(function(event){ return function *generatedListener(){
      console.log('go bridge fire ', event)

      var args = Array.prototype.slice.call(arguments)
      var that = this

      //转发到系统中的事件去
      var result = yield that.fire.apply( that, [event].concat(args) )

      //TODO 强行替换,要改
        this.data.data = result.data.data
      //this.data.set(`${event}.result`, data)

    }}))

  }
}