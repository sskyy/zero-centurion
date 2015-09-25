
require('./base.less')
var Roof = require('roof-zeroql')
var co = require('co')
var message = require('antd').message

module.exports = Roof.createContainer({
  componentDidMount : function(){
    window.galaxies = this.context.app.data

  },
  submit : function(e){
    //this.bus.fire('error.test').then(function(e){console.log(e)}).catch(function(e){
    //  console.log( e)
    //})
    e.preventDefault()
    this.bus.fire('user.register', {name:'jason',password : '123123'}).then(()=>{
      message.success('登录成功')
    }).catch(e=>{
      message.error('登录失败')
    })
  },
  render : function(){
    return <form className='ant-form-horizontal'>
      <div className="ant-form-item  row-flex row-flex-center">
        <h1>Sign up</h1>
      </div>

      <div className="ant-form-item  row-flex row-flex-center">
        <label htmlFor="userName" className="col-4" required>用户名：</label>
        <div className="col-20">
          <input className="ant-input" type="text" id="userName" placeholder="请输入用户名"/>
        </div>
      </div>


      <div className="ant-form-item row-flex row-flex-center">
        <label htmlFor="password" className="col-4" required>密码：</label>
        <div className="col-20">
          <input className="ant-input" type="password" id="password" placeholder="请输入密码"/>
        </div>
      </div>

      <div className="ant-form-item row-flex row-flex-center">
        <button className='ant-btn ant-btn-primary' onClick={this.submit}>Sign up</button>
      </div>

    </form>
  }
})