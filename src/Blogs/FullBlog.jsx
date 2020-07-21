import React, { Component } from 'react'
import axios from 'axios'
export class FullBlog extends Component {

    state={
        loading:true
    }
   async componentDidMount(){
       try{
        const res =await axios.post('https://scrapetrial.herokuapp.com/full-blog',{
            url:this.props.blogs[this.props.id].link
        })
        this.props.blogs['blog']=res.data.blog
        this.setState({
            loading:false
        })
         console.log(res.data)
    }
    catch(err){
        console.log(err)
    }
        
   }
    render() {
       if(this.state.loading===false){
            return(
            <div>{this.props.blogs.blog}</div>
            )
       }
       else{
           return(
               <h2>Loading....</h2>
           )
       }
    }
}

export default FullBlog
