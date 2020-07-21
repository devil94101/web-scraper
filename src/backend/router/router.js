var router=require('express').Router()
var request=require('request-promise')
const cheerio=require('cheerio')
const db=require('../sqlserver')
router.get('/create',(req,res)=>{
    const sql1="DELETE FROM search WHERE tags = null"
    let query=db.query(sql1,(err,result)=>{
        if(err )throw(err)
        res.send(result)
    })
})
router.post("/deleteHistory",(req,res)=>{
    const sql1="DELETE FROM search WHERE tags =?";
    let query=db.query(sql1,req.body.tags,(err,result)=>{
        if(err )throw(err)
        res.send(result)
    })
})
router.post('/search',async(req,res)=>{
    let url="https://medium.com/search/posts?q="+req.body.tagName+"&count=100&ignore=2680ad8dd5ad&ignore=22bf5dadc3a5&ignore=3db32d5c86f2&ignore=ca84da25b9d2&ignore=ad22740df707&ignore=d046c1f5896b&ignore=f905845c732f&ignore=5b1b7a6094b2&ignore=ace7893af40c&ignore=50b70d393f15"
    
    request(url,async(err,response,html)=>{
    if(err){
        return res.send([{err:true,msg:"Check your internet connection or try again"}]);
    }
    const $=cheerio.load(html);
    if($('div.row.u-relative p').text()==="We couldn’t find any posts."){
        return res.send([{err:true,msg:"We couldn’t find any posts realted to this tag"}]);
    }
    let result=[]
    let tags=[]
    const body2=await request.get("https://medium.com/search/tags?q="+req.body.tagName)
    const sel=cheerio.load(body2)
    sel('div.col.u-size9of12.u-sm-size12of12 li').
    each((i,ele)=>{
        tags.push(sel(ele).find('a').text())
    })
    // console.log(tags)
    $('div.js-postListHandle div.u-paddingTop20.u-paddingBottom25.u-borderBottomLight.js-block').each((i,ele)=>{
        
        const creator=$(ele).find('div.postMetaInline.postMetaInline-authorLockup.ui-captionStrong.u-flex1.u-noWrapWithEllipsis a').text()
        const date=$(ele).find('a.link.link--darken time').text()
        let detail=$(ele).find('span.readingTime').attr('title')
        let title=$(ele).find('h3').text()
        let link=$(ele).find('a.button.button--smaller.button--chromeless.u-baseColor--buttonNormal').attr('href')
        if(title===""){
            title=$(ele).find('h4').text()
            if(title===""){
                title="title not avaliable"
            }
        }
        
        if(!link){
            link=$(ele).find('div.postArticle-content a').first().attr('href')
            // console.log(link)
        }

        if(!detail){
            detail="readtime not avaliable"
        }
        result.push({
            creator,
            date,
            title,
            detail,
            link,
            tags,
            index:i,
            isCompleted:"false"
        })
    })
    const sql="INSERT INTO search SET ?"
    const val={
        tags:req.body.tagName,
        time:new Date().toISOString().slice(0, 19).replace('T', ' ')
    }
    let query=db.query(sql,val,(err,result)=>{
        if(err )throw(err)
        console.log(result)
    })
    res.json(result)
})
})
router.post('/getHistory',(req,res)=>{
    const sql1="SELECT * FROM search ORDER BY time DESC"
    let query=db.query(sql1,(err,result)=>{
        if(err )throw(err)
        res.send(result)
    })
})
router.post('/full-blog',(req,res)=>{
    const {url}=req.body
    request(url,(err,response,html)=>{
        if(err){
            return res.send({
                err:true,
                "msg":"invalid url"
            })
        }
        $=cheerio.load(html)
        res.json({
            blog:$('article p').text()
        })
    })
})
module.exports=router