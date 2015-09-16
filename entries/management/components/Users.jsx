var Roof = require('roof-zeroql')
var User = require('./User.jsx')
var antd = require('antd')
var Pagination = antd.Pagination
var Modal = antd.Modal
var Radio = antd.Radio
var RadioGroup = antd.Radio.Group
var InputNumber = antd.InputNumber;
require('./Users.less')

module.exports = Roof.createContainer({
  name : 'Users',
  getInitialState : function(){
    return {
      showModal : false,
      user : {
        age : 21,
        gender : 'male'
      }
    }
  },
  rootQueries: {
    users: `
    User( _limit:10){
      ${User.getQuery('user')}
    }
  `
  },
  renderModal : function(){
    return <Modal
      title='新增用户'
      visible={this.state.showModal}
      onOk={this.addUser}>
      <form className="ant-form-horizontal">
        <div className="ant-form-item ant-form-item-compact">
          <label htmlFor="userName" className="col-6" required>用户名：</label>
          <div className="col-6">
            <input className="ant-input" type="text" id="userName" value={this.state.user.name} onChange={this.userChangeHandler.bind(this, 'name')}/>
          </div>
        </div>
        <div className="ant-form-item ant-form-item-compact">
          <label htmlFor="userName" className="col-6" required>年龄：</label>
          <div className="col-6">
            <InputNumber min={1} max={150} value={this.state.user.age||20} onChange={this.userChangeHandler.bind(this, 'age')}/>
          </div>
        </div>
        <div className="ant-form-item ant-form-item-compact">
          <label htmlFor="userName" className="col-6" required>性别：</label>
          <div className="col-6">
            <RadioGroup value="male">
              <Radio value="male">男</Radio>
              <Radio value="female">女</Radio>
            </RadioGroup>
          </div>
        </div>
      </form>
    </Modal>
  },
  render: function () {

    return <div className='container'>
      <h1>Users</h1>

      <div className='actions row'>
          <button className="ant-btn ant-btn-primary " onClick={this.showModal}>新建</button>
      </div>

      <div className='users'>
        {this.props.users.map(function (user) {
        return <User user={user}/>
      })}

      </div>

      <div className='pagination'>
        <Pagination total={50} pageSize={10} onChange={this.changePage} current={Math.floor(parseInt(this.props.users.query.getAttr('_skip')||0)/10)+1}/>

      </div>

      {this.renderModal()}

    </div>
  },
  changePage : function( page ){
    this.props.users.query.setAttrs(`User(_limit:10,_skip:${10*(page-1)})`)
  },
  userChangeHandler : function( key, value ){
    if( typeof value === 'object' && value.target !== undefined){
      value = value.target.value
    }

    var userState = this.state.user
    userState[key] = value
    this.setState({user : userState})
  },
  showModal : function(){
    this.setState({showModal:true})
  },
  addUser : function(){
    console.log( this.state.user )
    this.bus.fire('user.create', this.state.user)
  }
})