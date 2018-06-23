import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Layout,Tabs,Icon,Divider,Upload,Table,Input,Select,Pagination,Radio,Menu,Button,Card} from 'antd'
// import { Module } from 'module';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:;">Action 一 {record.name}</a>
      <Divider type="vertical" />
      <a href="javascript:;">Delete</a>
      <Divider type="vertical" />
      <a href="javascript:;" className="ant-dropdown-link">
        More actions <Icon type="down" />
      </a>
    </span>
  ),
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}];
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {/* <h1 className="App-title">Welcome to React</h1> */}
        </header>
        {/* <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        {/* <div style={{margin:'0 auto'}}> */}
        <div>
          <Radio.Group defaultValue='页面翻译'>
            <Radio.Button value='页面翻译'>页面翻译</Radio.Button>
            <Radio.Button value='翻译总表'>翻译总表</Radio.Button>
          </Radio.Group>
        </div>
        <div>
          <span>筛选：</span>
          <Radio.Group defaultValue="1">
            <Radio value="1">按版本</Radio>
            <Select defaultValue='1.0' style={{width:120}}>
              <Select.Option value="1.0">1.0</Select.Option>
              <Select.Option value="1.1">1.1</Select.Option>
              <Select.Option value="1.2">1.2</Select.Option>
              <Select.Option value="1.3">1.3</Select.Option>
              <Select.Option value="1.4">1.4</Select.Option>
              
            </Select>
            <Radio value="2">按模块</Radio>
            {/* <Dropdown overlay={ModuleList} trigger={['click']}> */}
            <Select defaultValue='首页' style={{width:120}}> 
              <Select.Option value="首页">首页</Select.Option>
              <Select.Option value="招生">招生</Select.Option>
              <Select.Option value="班级">班级</Select.Option>
              <Select.Option value="学生">学生</Select.Option>
              <Select.Option value="日程">日程</Select.Option>
              
            </Select>
            </Radio.Group>
        </div>
        <div style={{textAlign:'left'}}>
          <span>版本/模块:</span>
          <span>招生</span>
          <Button style={{float:'right'}}>编辑</Button>
        </div>
        <div>
        <Card
    
    style={{ width: 320 }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  ></Card>
        </div>
        <div>
          <Table dataSource={data} columns={columns}></Table>
        </div>
      </div>
    );
  }
}

export default App;
