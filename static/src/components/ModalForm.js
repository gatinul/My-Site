import {
  Form, Select, Button, Upload, Icon, Modal, message
} from 'antd';
import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;
import api from "../../api/index.js";
import { browserHistory } from 'react-router';



class PostForm extends Component {
  state = {
    data: [],
    value: '',
    uploading:false,
    fileList:[]
  }
  handleChange = (value) => {
    this.setState({ value });
    this.setState({
      data:[{value: 'rebecca',
        text: 'rebecca',}]
    })
  }
  resetModal = ()=>{
    this.setState({
      fileList:[]
    })
    this.props.form.setFieldsValue({
      select:''
    })
  }
  showConfirm = (data,values)=>{
    const self = this
    confirm({
      title: '此文件已存在，是否覆盖？',
      content: `${data.tag_name} / ${data.md} / ${data.remark}`,
      onOk() {
        api.updateFileTag({
          value:values,
          fileName:data.md
        }).then((res)=>{
          if(res.success){
            message.success('更新成功')
            self.successConfirm(data)
          }else{
            message.error('更新失败')
          }
        })
      },
      onCancel() {
        console.log('撤销更新');
      },
    });
  }
  successConfirm = (data)=>{
    const self = this
    confirm({
      title: '发布成功',
      content:`${data.md} 已发布成功, 是否跳转到博客首页`,
      onOk() {
        self.props.setModalHide()
        self.resetModal()
        window.open('http://localhost:7002')
      },
      onCancel() {
        self.props.setModalHide()
        self.resetModal()
      }
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { fileList } = this.state;
        const formData = new FormData();
        fileList.forEach((file) => {
          formData.append('file',file);
        });
        api.uploadFile(formData).then(res=> {
          console.log(res);
          if(res.success){
            api.isExist({
              fileName:formData.get('file').name
            }).then((res)=>{
              if(res.success){
                this.showConfirm(res.message,values)
              }else{
                api.addFileTag({
                  value: values,
                  fileName: formData.get('file').name
                }).then((res)=>{
                  if(res.success){
                    message.success('添加成功 ^_^')
                    this.successConfirm({
                      md:formData.get('file').name
                    })
                  }else{
                    message.error('添加失败，请重试~')
                  }
                })
              }
            })
          }else{
            message.error(res.message)
          }
        });
      }
    });
  }

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  handlePreview = (file)=> {
    console.log(file)
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const {uploading} = this.state;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const options = this.state.data.map(d => <Option key={d.value}>{d.text}</Option>);    
    const props = {
      action:'upload.do',
      onPreview:(file)=>{
        console.log(file)
      },
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file],
        }));
        return false;
      },
      fileList: this.state.fileList
    }
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="选择标签"
          hasFeedback
        >
          {getFieldDecorator('select', {
            rules: [
              { required: true, message: '请选择或新增标签' },
            ],
          })(
            <Select
              mode="combobox"
              notFoundContent=""
              style={this.props.style}
              defaultActiveFirstOption={false}
              showArrow={true}
              filterOption={false}
              onChange={this.handleChange}
            >
              {options}
            </Select>
          )}
        </FormItem>
        
        <FormItem
          {...formItemLayout}
          label="选择文件"
          extra=""
        >
          {(
            <Upload {...props}>
              <Button>
                <Icon type="upload" /> 点击上传
              </Button>
            </Upload>
          )}
        </FormItem>

        <FormItem
          wrapperCol={{ span: 12, offset: 6 }}
        >
          <Button type="primary" htmlType="submit">发布</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedPost = Form.create()(PostForm);

export default WrappedPost