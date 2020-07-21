import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export class Table extends Component {

    render() {
        // console.log(this.props.result.length)
       if(this.props.search===false&&this.props.result.length===0){
            return (<h2>Nothing searched yet</h2>)
       }
       else if(this.props.result[0]&&this.props.result[0].err){
            return(<h2>{this.props.result[0].msg}</h2>)
       }
       else{
            return(<table className="table table-striped table-responsive">
                <thead>
                    <tr>
                        <th>Creator</th>
                        <th>Title</th>
                        <th>Post Date</th>
                        <th>Read Time</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                   {Object.keys(this.props.result).map((ele,i)=>{
                    return(<tr key={i}>
                            <td>{this.props.result[ele].creator} </td>
                                <td>{this.props.result[ele].title}</td>
                                <td>{this.props.result[ele].date}</td>
                                <td>{this.props.result[ele].detail}</td>
                                <td><Link to={`blog/${i}`}>Click to read Full blog</Link></td>
                            </tr>)
                   })}
                </tbody>
            </table>)
       }    
    }
}

export default Table
