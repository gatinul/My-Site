import { Icon, Row, Col, Input, Button, Modal, message } from  'antd';
import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import marked from 'marked';
import highlight from 'highlight.js'
import ModalForm from '../components/ModalForm.js'
import "../css/md-common.css";
import "../css/github.css";


marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false,
    highlight: code => {
        return highlight.highlightAuto(code).value;
    },
});
const hideStyle = {
    display:'none'    
}
const showStyle = {
    display:'block'
}
const fullStyle = {
    width: '80%',
    marginTop:'-10px',
    paddingLeft:'5px'
}
const halfStyle = {
    marginTop:'-10px',
    borderLeft:'1px dashed #444',
    paddingLeft:'20px'
}
const picStyle = {
    backgroundImage: 'url("../src/img/love.jpg")',
    backgroundSize: '100% 100%',
    borderRadius: '50%',
    display: 'block',
    height: '32px',
    margin: '0px 2em 0px -5px',
    width: '32px',
    float:'left'
}

class WriteMarkDown extends Component {
    state = {
        isEdit: true,
        previewStyle:showStyle,
        value:'## Hello Gatinul , write now ! \n > 20170613',
        count:0,
        screenStyle:halfStyle,
        ModalText: 'Content of the modal',
        visible: false,
    };
    changeEdit = ()=>{
        if(this.state.isEdit) {
            this.setState({
                isEdit:!this.state.isEdit,
                previewStyle:showStyle,
                screenStyle:halfStyle
            })
        }else{
            this.setState({
                isEdit:!this.state.isEdit,
                previewStyle:hideStyle,
                screenStyle:fullStyle
            })
        }
    }
    handleChange =() => {
        this.setState({value: ReactDOM.findDOMNode(this.refs.textarea).value});
    }
    keyDownEvent = (event)=>{
        if(event.keyCode == 9){
            event.preventDefault();
            var indent = '    ';
            var start = event.target.selectionStart;
            var end = event.target.selectionEnd;
            var selected = window.getSelection().toString();
            selected = indent + selected.replace(/\n/g, '\n' + indent);
            console.log(event.target);
            event.target.value = event.target.value.substring(0, start) + selected
                    + event.target.value.substring(end);
            event.target.setSelectionRange(start + indent.length, start
                    + selected.length);
        }
    }
    showModal =() =>{
        if(localStorage.getItem("name") == 'shixy'){
            this.setState({
                visible:true,
                ModalText:'Content of the modal'
            })
        }else{
            message.error('暂时只对白名单用户开放')
        }
        
    }
    handleUploadOk =() =>{
        this.setState({
            ModalText: '发布中...',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    }
    hideModal =() =>{
        this.setState({
            visible:false
        })
    }
    render() {    
        const {visible,ModalText,previewStyle,screenStyle,value} = this.state;
        return (
            <div>
                <a><Icon type="arrows-alt" style={{ float:'right',marginRight:'1.5em' }} onClick={this.changeEdit}/></a>
                <Row type="flex" justify="center" gutter={16}>
                    <Col span={11}>
                        <a href="/" style={picStyle}></a>
                        <Button  type="default"  size='large'>发布博客</Button>
                        <Button ghost type="primary" onClick={this.showModal} size='large' style={{marginLeft:'2em'}}>上传md</Button>
                        <Modal title="上传发布"
                            visible={visible}
                            onOk={this.handleUploadOk}
                            onCancel={this.hideModal}
                            footer={null}
                            >
                            <ModalForm setModalHide={this.hideModal}/>
                        </Modal>
                        <textarea
                            style={previewStyle}
                            className="markdown-textarea"
                            name="mkinput"
                            onChange={this.handleChange}
                            onKeyDown={this.keyDownEvent}
                            ref="textarea"
                            defaultValue={value}/>
                    </Col>
                    <Col span={11} style={screenStyle}>
                        <div
                            className="hljs"
                            dangerouslySetInnerHTML={{
                                __html: marked(value)
                            }}
                        />
                    </Col>
                </Row>
            </div>
        )
           
    }
}

export default WriteMarkDown