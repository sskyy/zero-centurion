module.exports = function( galaxies, types ){
  /*
   服务器端再触发的事件，就是纯服务器端事件了。
   */

  return {
    'user.create' : {fn:function updateUI( data ){

      var User = galaxies.getNodeClass('User')
      var Log = galaxies.getNodeClass('Log')
      var user  = new User(data )
      ////TODO  做些验证什么的工作来演示

      return user.push().then(function(){
        var log= new Log({content : `admin created user ${user.get('name')}`})
        return log.push().then(function(){
          galaxies.get('Users', 'users').refetch()
        })

      })


    },last:true}
  }
}