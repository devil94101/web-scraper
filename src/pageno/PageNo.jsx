import React, { Component } from 'react'

export class PageNo extends Component {
    
    render() {
        const {totalPage,postPerPage,paginate}=this.props
        const pageno=[]
    for(let i=1;i<=Math.ceil(totalPage/postPerPage);i++){
        pageno.push(i)
    }
    return (
        <div>
            <nav >
                <ul className="pagination"  style={{
                    width: "100%",
                height: "100",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                    {
                        pageno.map(ele=>{
                        return(<li key={ele} className="page-item">
                            <div style={{
                                cursor:"pointer"
                  }} className="page-link" onClick={()=>paginate(ele)}>{ele}</div>
                        </li>)
                        })
                    }
                </ul>
            </nav>
        </div>
    )
    }
}

export default PageNo
