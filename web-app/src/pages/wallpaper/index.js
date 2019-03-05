
import React from 'react';
// import Route from '../../routers/'
import {scriptLoad, setStorage, getStorage,Sleep} from '../../static/public.js'
import { getFetch } from '../../static/fetch';
import API from '../../static/api';

const sleep = new Sleep()

// https://raw.githubusercontent.com/jokermonn/-Api/master/adesk.md
// - `limit`：返回数量
// - `adult`：布尔值，暂时未知
// - `first`：数字，如1
// - `skip`：略过数量
// - `order`：值 `hot`为favs， `new`

{/* <h2 id="vertical">不分类别获取壁纸接口</h2>
url：http://service.picasso.adesk.com/v1/vertical/vertical */}

{/* <h2 id="vertical-category">获取手机壁纸类别</h2>
url：http://service.picasso.adesk.com/v1/vertical/category */}

{/* <h2 id="category-img">获取某类手机壁纸下壁纸</h2>
url：http://service.picasso.adesk.com/v1/vertical/category/ + 类别ID */}


{/* <h2 id="pc-category">获取电脑壁纸类别</h2> 
url：http://service.picasso.adesk.com/v1/wallpaper/category */}

{/* <h2 id="category-wallpaper">获取类别下的电脑壁纸</h2>
url：http://service.picasso.adesk.com/v1/wallpaper/category/+ 类别ID +/wallpaper */}

{/* <h2 id="wallpaper-album">获取电脑壁纸专辑</h2>
url：http://service.picasso.adesk.com/v1/wallpaper/alb */}

{/* <h2 id="album-wallpaper">获取专辑下的壁纸</h2>
url：http://service.picasso.adesk.com/v1/wallpaper/album/+ 专辑ID +/wallpaper */}

{/* <h2 id="get-wallpaper-img">下载电脑壁纸</h2>
url：http://img5.adesk.com/ + 壁纸ID */}

/* eslint-disable */
class Wallpaper extends React.Component{
    constructor(props){
        super(props);
        this.state={
           data:[],
           limit:1,
           skip:0,
           order:'hot',
           phone:'vertical/vertical?',
           pc:'wallpaper/',

           category:'phone'
        }
    }
    componentDidMount(){
        let data = getStorage('wallpaper') || []
        if(data.length){
            this.setState({
                data
            })
        }else{
            this.init()
        }
        // this.init()
    }
    init=()=>{
        const {limit,skip,order,category} =this.state
        let param=`limit=${limit*30}&skip=${skip}&adult=false&first=0&order=${order}`
        getFetch(API.wallpaper+this.state[category]+param).then(res=>{
            let data=[],item=[]
            !!res.res&&!!res.res.vertical&&
            res.res.vertical.map((img,i)=>{
                item.push(img)
                if((i+1)%3==0){
                    data.push(item)
                    item = []
                }
            })
            this.setState({
                data
            },()=>{
                setStorage('wallpaper',data)
            })
        }).catch(err=>{
            this.setState({
                data:[]
            })
        })
    }
    exchange=()=>{

    }
    render(){
        const { data } = this.state
        return (
            <div className="wallpaper" style={{padding:'10px',overflow:'hidden'}}>
                <div style={{width:'90%',maxWidth:'450px',margin:'30px auto',display:'flex',textAlign:'left'}}>
                    
                    <nav style={{flex:1}}>
                        <i class="fa fa-exchange" onClick={this.exchange.bind(this,1)}></i>
                        <span style={{margin:'0 5px'}}>手机:</span>
                    </nav>
                    <nav style={{flex:1}}>热门</nav>
                    <nav style={{flex:1}}>最新</nav>
                    <nav style={{flex:1}}>分类</nav>
                </div>
                <div>
                    <div >
                        {
                            !!data.length&&
                            data.map((res,i)=>{
                                let a = Math.ceil(Math.random()*10%3)
                                return(
                                    <div key={i} style={{width:'80%',margin:'20px auto',height:'482px',display:'flex',overflow:'hidden'}}>
                                    {
                                        !!res.length&&
                                        res.map((item,j)=>(
                                        <div style={{flex:1,margin:'5px 10px'}}>
                                            <img key={j} style={{width:'100%',height:'100%'}} src={item.img} />
                                         </div>
                                        ))
                                    }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }

}
let active= {

}
const styles ={
   img1:[
       {
           width:'33.3%',
           height:'480px',
           position:'absolute',
           top:0,
           left:0,
           border:'1px solid #ccc',
       },{
            width:'33.3%',
            height:'480px',
            position:'absolute',
            top:0,
            left:'33.3%',
            border:'1px solid #ccc',
       },{
            width:'32%',
            height:'480px',
            position:'absolute',
            top:0,
            right:0,
            border:'1px solid #ccc',
       }
   ],
   img2:[
       {
        width:'49%',
        height:'240px',
        border:'1px solid #ccc',
        position:'absolute',
        top:0,left:0,
       },{
        width:'49%',
        height:'480px',
        border:'1px solid #ccc',
        position:'absolute',
        top:0,right:0,
       },{
        width:'49%',
        height:'240px',
        position:'absolute',
        border:'1px solid #ccc',
        bottom:0,left:0,
       }
   ],
   img3:[
       {
        width:'49%',
        height:'480px',
        border:'1px solid #ccc',
        position:'absolute',
        top:0,left:0,
       },{
        width:'49%',
        height:'240px',
        border:'1px solid #ccc',
        position:'absolute',
        top:0,right:0,
       },{
        width:'49%',
        height:'240px',
        border:'1px solid #ccc',
        position:'absolute',
        bottom:0,right:0,
       }
   ]

}

export default Wallpaper