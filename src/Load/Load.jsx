import React, { Component } from 'react'
import Loader from 'react-loader-spinner';
export class Load extends Component {
    render() {
        if(this.props.search===false){
            return<React.Fragment></React.Fragment>
        }
        else if(this.props.search){
            return <div
                  style={{
                    width: "100%",
                height: "100",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
                </div>
        }
    }
}

export default Load
