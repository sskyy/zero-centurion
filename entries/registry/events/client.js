module.exports = function( galaxies, types ){
  /*
   服务器端再触发的事件，就是纯服务器端事件了。
   */

  return {
    'error.test' : function *errorTest( data ){
      try{
        var result = yield this.fire('error.trigger')
      }catch(e){
        console.log('catch in generator' )
        console.log(e)
      }

    },
    'error.trigger' : {fn:function *errorTrigger(){
      return Promise.reject('aaaaaa')
    },async:true}
  }
}