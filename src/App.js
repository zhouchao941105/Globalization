import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Layout, Tabs, Icon, Divider, Upload, Input, Select, Pagination, Radio, Menu, Button, Card } from 'antd'
import axios from 'axios'
import MultiTable from './table';




class App extends Component {

  state = { list: [], branchList: [], moduleList: [], selectByBranch: true }
  componentDidMount() {
    axios.get('/branchList').then(data => {
      this.setState({
        branchList: data.data
      })
    })
    axios.get('/moduleList').then(data => {
      this.setState({
        moduleList: data.data
      })
    })
    this.getData = (branch, module, key, state) => {
      axios.get('/data', { params: { branch, module, key } }).then(data => {
        this.setState({
          list: data.data
        })
      })
    }

    this.getData('v1.0', '', '')
  }
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
          <Radio.Group defaultValue="1" onChange={() => this.setState({ selectByBranch: !this.state.selectByBranch })}>
            <Radio value="1">按版本</Radio>
            <Select defaultValue='v1.0' style={{ width: 120 }} onSelect={(val) => this.getData(val, '', '')} disabled={!this.state.selectByBranch}>
              {this.state.branchList.map(item => (<Select.Option key={item} value={item}>{item}</Select.Option>))}
            </Select>
            <Radio value="2">按模块</Radio>
            {/* <Dropdown overlay={ModuleList} trigger={['click']}> */}
            <Select defaultValue='首页' style={{ width: 120 }} onSelect={(val) => this.getData('', val, '')} disabled={this.state.selectByBranch}>
              {this.state.moduleList.map(item => (<Select.Option key={item} value={item}>{item}</Select.Option>))}
            </Select>
          </Radio.Group>
        </div>
        <div style={{ textAlign: 'left' }}>
          <span>版本/模块:</span>
          <span>招生</span>
          <Button style={{ float: 'right' }}>编辑</Button>
        </div>
        <div>
          <Card
            style={{ width: 320 }}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          ></Card>
        </div>
        <div>
          <MultiTable list={this.state.list} editable={true} ></MultiTable>
        </div>
        <div>
          <Button>取消</Button>
          <Button>保存</Button>
          <Button>生效</Button>

        </div>
      </div>
    );
  }
}

export default App;
