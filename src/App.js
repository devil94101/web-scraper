import React,{useState} from 'react';
import axios from 'axios'
import {BrowserRouter as Router,
  Switch,
  Route} from 'react-router-dom'
import Blog from './Blogs/Blogs'
import FullBlog from './Blogs/FullBlog'
function App() {
  const [name,setName]=useState('');
  const [result,setResult]=useState([]);
  const [searched,setSearch]=useState(false)
  const [pageNo,setPage]=useState(1)
  const postPerPage=10
  const last=pageNo*postPerPage
  const first=last-postPerPage
  let post=[]
  const cng=(e)=>{
    setName(e.target.value)
  }
  const submit=(e)=>{
    e.preventDefault()
    setSearch(true)
    setPage(1)
    setResult([])
    axios.post('http://localhost:5000/search',{
      tagName:name
    })
    .then((res)=>{
      setResult(res.data)
      setSearch(false)
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  const diffSub=(tag)=>{
    setSearch(true)
    setPage(1)
    setResult([])
    axios.post('http://localhost:5000/search',{
      tagName:tag
    })
    .then((res)=>{
      setResult(res.data)
      setSearch(false)
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  const paginate=(num)=>{
    setPage(num)
  }
 
  post=result.slice(first,last)
  return (
    <Router>
    <Switch>
  <Route path="/blog/:id" component={props => <FullBlog id={props.match.params.id} blogs={post}/>}>

      </Route>
          <Route path="/">
          <Blog submit={submit} paginate={paginate} result={result} post={post} cng={cng} postPerPage={postPerPage}
      searched={searched} diffSub={diffSub}
      ></Blog>
          </Route>
        </Switch>
    </Router>
  );
}
export default App;
