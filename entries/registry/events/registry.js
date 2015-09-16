module.exports = function( galaxies, types ){
/*
服务器端再触发的事件，就是纯服务器端事件了。
 */

  return {
    'user.signup' : [function *saveUser( data ){
      var User = galaxies.getNodeClass('User')
      var user  = new User(data )
      ////TODO  做些验证什么的工作来演示
      var pushResult = yield user.push()
      this.data.set('serverResult', user.toObject() )
      return pushResult
    }]
  }
}