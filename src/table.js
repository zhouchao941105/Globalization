import React from 'react'
import { Table, Select, Input, Icon, Button } from 'antd'
import axios from './net'
class MultiTable extends React.Component {
    constructor() {
        super()
        this.state = {
            list: []
        }
    }

    // componentDidUpdate() {
    //     if (this.props.list.length) {
    //         this.setState((prev, props) => ({
    //             list: prev.list.splice(1, 1, props)
    //         }))
    //     }
    //     console.log(this.props.list.length);
    //     console.log('updated');
    // }
    componentWillReceiveProps(props) {
        this.setState({ list: props.list })
    }
    componentDidMount() {
        !this.props.editable && this.columns.pop()
    }
    columns = [{
        title: '中文名',
        dataIndex: 'name',
        key: 'name',
        width: 300
        // render: text => <a href="javascript:;">{text}</a>,
    },
    {
        title: '历史翻译',
        dataIndex: 'history',
        key: 'history',
        width: 300,
        render: (item, src) => {
            return <Select placeholder="Please Select" style={{ width: '100%' }} onSelect={(val, a) => {
                // src.eName = val;
                // console.log(src.eName);
                this.change(val, src)
            }}>
                {item.map(unit => <Select.Option key={unit} value={unit}>{unit}</Select.Option>)}
            </Select>
        }
    }, {
        title: '英文名',
        dataIndex: 'eName',
        key: 'eName',
        width: 300,
        render: (value, a) => {
            return <Input
                value={value}
                onChange={this.handleChange}
                // onPressEnter={this.check}
                suffix={(
                    <Icon
                        type="check"
                    // className="editable-cell-icon-check"
                    // onClick={this.check}
                    />
                )}
            />
        }

    }, {
        title: '位置',
        dataIndex: 'module',
        key: 'module',
        width: 100

    }, {
        title: '生效状态',
        dataIndex: 'state',
        key: 'state',
        width: 100,
        render: val => {
            return val ? '已生效' : '未生效'
        }
    }];
    handleChange(v) {
        console.log(v);
    }
    change(val, src, a) {
        var temp = this.state.list
        temp.find(item => item._id === src._id).eName = val
        this.setState({
            list: temp
        })
        // this.props.list.find(unit => unit._id === src._id).eName = val
        // this.props.list.unshift({ name: 1 })
    }
    async save(list) {
        await axios.post('/save', { list: this.state.list.map(item => ({ _id: item._id, eName: item.eName })) })
        this.props.fresh()

    }
    async enable(list) {
        await axios.post('/enable', { list: this.state.list.filter(item => !item.state).map(item => item._id) })
        this.props.fresh()
    }
    render() {
        return <div>
            <Table rowKey="_id" dataSource={this.state.list} columns={this.columns} onChange={src => this.props.getMore(src)} pagination={{ position: 'top', total: this.props.count }}></Table>
            <Button>取消</Button>
            <Button onClick={() => this.save()}>保存</Button>
            <Button onClick={() => this.enable()}>生效</Button>
        </div>
    }
}
export default MultiTable