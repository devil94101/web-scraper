import React from 'react'
import Table from '../table/Table'
import Load from '../Load/Load'
import PageNo from '../pageno/PageNo'

function blogs({submit,name,paginate,cng,post,postPerPage,searched,result,blogPage,diffSub}) {

    return (
        <div style={{
            marginTop:"50px"
             }}>
            <div className="container-fluid">
            <form onSubmit={(e)=>submit(e)} className="form-inline " >
                  <div className="form-group">
                  <input type="text" value={name} onChange={(e)=>cng(e)} className="form-control" placeholder="search" required></input>
                  <button type="submit" className="btn btn-primary">Search</button>
                  </div>
                 
                </form>
            <div className="row"  style={{
                marginTop:"50px"
                 }}>
              <div className="col-sm-7">
              <Table result={post} search={searched} blogPage={blogPage}></Table>
              <Load search={searched}></Load>
              </div>
              <div className="col-sm-3 offset-md-1">
               <div className="row">
                  <h1>Nothing searched yet</h1>
  
               </div>
              </div>
            </div>
            </div>
            
            <PageNo totalPage={result.length<=1? 0:result.length} postPerPage={postPerPage} paginate={paginate}></PageNo>
          </div>
    )
}

export default blogs
