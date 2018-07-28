import React from 'react'
import { Table, Select, Input, Icon } from 'antd'

class MultiTable extends React.Component {
    // constructor() {
    //     super()
    //     this.state = {
    //         list: []
    //     }
    // }

    // componentDidUpdate() {
    //     if (this.props.list.length) {
    //         this.setState((prev, props) => ({
    //             list: prev.list.splice(1, 1, props)
    //         }))
    //     }
    //     console.log(this.props.list.length);
    //     console.log('updated');
    // }
    componentDidMount() {
        console.log('mount');
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
            return <Select placeholder="Please Select" style={{ width: '100%' }} onSelect={(val) => {
                console.log(src);
                src.eName = val;
                this.change(val, src)
                console.log(src.eName);
            }}>
                {item.map(unit => <Select.Option key={unit} value={unit}>{unit}</Select.Option>)}
            </Select>
        }
    }, {
        title: '英文名',
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
        title: '位置',
        dataIndex: 'module',
        key: 'module',
        width: 100

    }, {
        title: '生效状态',
        dataIndex: 'status',
        key: 'status',
        width: 100

    }];
    handleChange(s) {
        console.log(s);
    }
    change(val, src) {
        this.setState({
            list: [src]
        })
        // this.props.list.find(unit => unit._id === src._id).eName = val
        // this.props.list.unshift({ name: 1 })
    }
    render() {
        return <Table rowKey="_id" dataSource={this.props.list} columns={this.columns} onChange={src => this.props.getMore(src)} pagination={{ position: 'top', total: this.props.count }}></Table>
    }
}
export default MultiTable