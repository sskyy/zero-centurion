var Roof = require('roof-zeroql')

module.exports = Roof.createContainer({
  submit: function (e) {
    e.preventDefault()
    this.bus.fire('user.login',{name:'jason1',password:'123123'})
  },
  render: function () {
    return <form className='ant-form-horizontal'>
      <div className="ant-form-item  row-flex row-flex-center">
        <h1>Sign In</h1>
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
        <button className='ant-btn ant-btn-primary' onClick={this.submit}>Sign In</button>
      </div>

    </form>
  }
})