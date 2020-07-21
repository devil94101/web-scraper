import React, { Component } from 'react'
import Axios from 'axios'

export class History extends Component {

    state={
        tags:[]
    }
    async componentDidMount(){
        try{
            const res=await Axios.post("http://localhost:5000/getHistory")
            this.setState({
                tags:res.data.slice(0,20)
            })
            console.log(this.state.tags)
        }
        catch(err){
            throw err
        }
    }
    delete=(tag)=>{
        console.log(tag)
        Axios.post("http://localhost:5000/deleteHistory",{
            tags:tag
        }).then(res=>{
            const data =this.state.tags.filter(ele=>ele.tags===tag)
            this.setState(data)
        }).catch(err=>{
            throw err;
        })
    }
     render() {
        return (
            <div>
               {
                   Object.keys(this.state.tags).map((ele,i)=>{
                       return(
                        <button key={i} style={{
                            marginRight:"5px",
                            marginBottom:"5px"
                        }} type="button" className="btn btn-primary" onClick={()=>this.props.diffSub(this.state.tags[ele].tags)}>
                        {this.state.tags[ele].tags}
                      </button>
                       )
                   })
               }
            </div>
        )
    }
}

export default History
