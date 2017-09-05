import { Timeline } from 'antd';
import React, { Component, PropTypes } from "react";

class TimeLinePart extends Component{
    state = {

    };
    render(){
        return(
            <Timeline pending={<a href="">未来...</a>}>
                <Timeline.Item>过去</Timeline.Item>
                <Timeline.Item>现在</Timeline.Item>
            </Timeline>
        );
    }
}

export default TimeLinePart