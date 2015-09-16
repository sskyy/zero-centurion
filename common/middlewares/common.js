
var _request = require('superagent')

function request( query, backend ){
  return new Promise( function( resolve, reject){
    _request
      .post(backend)
      .send({
        "statements": [{
          statement : query
        }]
      })
      .end(function( err, res){
        if( err ) return reject(err)
        return resolve( res )
      })

  })
}



function makePushQuery( node ){

  if( node.get( node.def.primary) ){
    //修改
  }else{
    //创建


  }

}



function makePullQuery( node ){}



function push( backend ){
  return request( makePushQuery(this), backend )
}


function pull( backend ){
  return request( makePullQuery(this), backend )
}


function partial(fn ){
  var partialArgs = Array.prototype.slice.call( arguments , 1)
  return function(){
    var args = Array.prototype.slice.call( arguments , 0)
    return fn.apply( this, partialArgs.concat( args ))
  }
}

module.exports = function( backend ){
  return {
    push : partial(push, backend),
    pull :  partial(pull, backend)
  }
}

