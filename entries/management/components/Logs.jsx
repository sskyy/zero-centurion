var Roof = require('roof-zeroql')
//var antd = require('antd')
//var Menu = antd.Menu;
//var Dropdown = antd.Dropdown;


module.exports=  Roof.createContainer({
  name : 'Logs',
  rootQueries : {
    logs : `Log{
      _id,
      content
    }`
  },
  render : function(){
    var logs =  <Menu>
      {this.props.logs.map(function( log ){
        return <Menu.Item>{log.get('content')}</Menu.Item>
      })}
    </Menu>

    return <Dropdown overlay={logs}>
      <button className="ant-btn ant-btn-menu">
        日志 <i className="anticon anticon-down"></i>
      </button>
    </Dropdown>

    //return null
  }
})