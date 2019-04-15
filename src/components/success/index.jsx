import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Success extends Component {
    componentWillMount = () => {
        if(window.localStorage.getItem("success") !== 'true') {
            this.props.history.push("/");
        }
    }
    
    render() {
        return (
            <div style={{overflow: 'hidden'}}>
                <video style={{width: '100vw', height: '99vh'}} autoPlay>
                    <source src="success.mp4" type="video/mp4"/>
                </video>
            </div>
        );
    }
}

export default withRouter(Success);