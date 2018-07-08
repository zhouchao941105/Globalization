import React from 'react'
import { Table, Select, Input, Icon } from 'antd'
const columns = [{
    title: '中文名',
    dataIndex: 'name',
    key: 'name',
    width: 300
    // render: text => <a href="javascript:;">{text}</a>,
},

// {
//   title: '英文名',
//   dataIndex: 'eName',
//   key: 'eName',
//   width: 300

// }, 
{
    title: '历史翻译',
    dataIndex: 'history',
    key: 'history',
    render: () => {
        return <Select>
            <Select.Option value="1">1</Select.Option>
            <Select.Option value="2">2</Select.Option>

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
            // onChange={this.handleChange}
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
class MultiTable extends React.Component {
    componentDidMount() {
        !this.props.editable && columns.pop()
    }

    render() {
        return <Table rowKey="_id" dataSource={this.props.list} columns={columns} pagination={{ position: 'top' }}></Table>
    }
}
export default MultiTable