require('./User.less')
var Roof = require('roof-zeroql')
var antd = require('antd')
var Modal = antd.Modal
var Radio = antd.Radio
var RadioGroup = antd.Radio.Group
var InputNumber = antd.InputNumber;

module.exports = Roof.createContainer({
  getInitialState : function(){
    return {
      showModal : false,
      user : {}
    }
  },
  componentDidMount : function(){
    this.setState({
      user : this.props.user.toObject()
    })
  },
  userChangeHandler : function( key, value ){
    if( typeof value === 'object' && value.target !== undefined){
      value = value.target.value
    }
    var userState = this.state.user
    userState[key] = value
    this.setState({user : userState})
  },
  queries: {
    user: `
    Users{
    }
  `
  },
  renderModal : function(){
    console.log('visible', this.state.showModal)
    return <Modal
      title='修改用户信息'
      visible={this.state.showModal}
      onOk={this.updateUser}>
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
    return <div className='row user'>
        <div className='col-4'>{this.props.user.get('_id') }</div>
        <div className='col-4'>{this.props.user.get('name') || '未填写'}</div>
        <div className='col-4'>{this.props.user.get('age') || '未填写'}</div>
        <div className='col-4'>{this.props.user.get('gender')|| '未填写'}</div>
        <div className='col-4'>{'暂无备注'}</div>
        <div className='col-4'>
          <div className="ant-btn-group">
            <button className="ant-btn " onClick={this.showModal}>编 辑</button>
            <button className="ant-btn " onClick={this.removeUser}>删 除</button>
          </div>
        </div>
      {this.renderModal()}
    </div>
  },
  showModal : function(){
    this.setState({showModal:true})
  },
  updateUser : function(){
    this.props.user.set( this.state.user )
    this.props.user.stage()
    this.props.user.push().then(function(){
      this.setState({showModal:false})
    }.bind(this))
  },
  removeUser : function(){
    //antConfirm({
    //  title : '你确定要删掉该用户',
    //  content : `删除操作不可逆`,
    //  onOk : ()=>{
        this.props.user.destroy()
        this.props.user.push()
      //}
    //})

  }
})