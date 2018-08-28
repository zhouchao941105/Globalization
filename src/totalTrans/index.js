import React from 'react'
import { Table, Select, Input, Icon } from 'antd'
import axios from '../net'

class TotalTrans extends React.Component {
    constructor() {
        super()
        this.state = {
            list: [],
            totalCount: 0
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
        console.log(11);
    }
    componentDidMount() {
        this.getList()
    }
    getList(page = 1) {
        axios.post('/getTransTotalList', { pageIdx: page, pageSize: 10 }).then(data => {
            this.setState({
                list: data.list,
                totalCount: data.totalCount
            })
        })
    }
    columns = [{
        title: '字段标识',
        dataIndex: '_id',
        key: '_id',
        width: 300
        // render: text => <a href="javascript:;">{text}</a>,
    },
    {
        title: '英文名称',
        dataIndex: 'eName',
        key: 'eName',
        width: 300,
        render: (value) => {
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
        title: '中文名称',
        dataIndex: 'name',
        key: 'name',
        width: 300,
        render: (value) => {
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

    }
        , {
        title: '位置',
        dataIndex: 'module',
        key: 'module',
        width: 100
    },
        // {
        //     title: '生效状态',
        //     dataIndex: 'status',
        //     key: 'status',
        //     width: 100

        // }
    ];
    handleChange(v) {
        console.log(v);
    }
    change(val, src, a) {
        var temp = this.state.list
        temp.find(item => item._id === src._id).eName = val
        console.log(temp);
        this.setState({
            list: temp
        })
        // this.props.list.find(unit => unit._id === src._id).eName = val
        // this.props.list.unshift({ name: 1 })
    }
    getMore(src) {
        this.getList(src.current)
    }
    render() {
        return <Table rowKey="_id" dataSource={this.state.list} columns={this.columns} onChange={src => this.getMore(src)} pagination={{ position: 'top', total: this.state.totalCount }}></Table>
    }
}
export default TotalTrans