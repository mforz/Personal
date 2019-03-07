
import React from 'react';
// import Route from '../../routers/'
import {imgdownLoad, setStorage, getStorage,Sleep} from '../../static/public.js'
import { getFetch } from '../../static/fetch';
import API from '../../static/api';

const _loading = require('../../assets/loading.gif')
const sleep = new Sleep()

// https://raw.githubusercontent.com/jokermonn/-Api/master/adesk.md
// - `limit`：返回数量
// - `adult`：布尔值，暂时未知
// - `first`：数字，如1
// - `skip`：略过数量
// - `order`：值 `hot`为favs， `new`

/* eslint-disable */
class Wallpaper extends React.Component{
    constructor(props){
        super(props);
        this.state={
           data:[],
           limit:1,
           skip:0,
           order:'hot',
           phone:'vertical',
           pc:'wallpaper',
           category:'phone',
           isCategory:false,
           categoryId:'',
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
        this.init()
    }
    init=(url)=>{
        const {limit,skip,order,category,isCategory,categoryId} =this.state

        let param = url ? url :`${categoryId}${this.state[category]}?limit=${limit*30}&skip=${skip}&adult=false&first=0&order=${order}`

        getFetch(API.wallpaper+this.state[category]+'/'+param).then(res=>{

            let data=[],item=[],arr=[]
            if(!!res.res &&(!!res.res.vertical||!!res.res.category||!!res.res.wallpaper)){
                arr = res.res.vertical || res.res.category || res.res.wallpaper||[]
            }
            arr.map((img,i)=>{
                item.push(img)
                if((i+1)%3==0){
                    data.push(item)
                    item = []
                }
            })
            this.setState({
                data
            },()=>{
                !isCategory?setStorage('wallpaper',data):''
            })
        }).catch(err=>{
            this.setState({
                data:[]
            })
        })
    }
    exchange=(i,data)=>{
        let { category,bgImg,order,isCategory,categoryId} =this.state
        categoryId = ''
        switch(i){
            //手机pc类别转换
            case 1:
                category=='phone'?category='pc':category='phone'
            break;
            //应用当前
            case 2:
            sleep.wait(()=>{
                let dom = document.getElementById('container')
                dom.style.backgroundImage=`url(${data})`
                dom.style.backgroundAttachment=`fixed`
                dom.style.backgroundSize = category=='pc'?'cover':'contain';
            },3000)
            break;
            //应用全部
            case 3:
            sleep.wait(()=>{
               let dom = document.getElementsByClassName('home')[0]
               dom.style.backgroundImage = `url(${data})`;
               dom.style.backgroundSize = category=='pc'?'cover':'contain';
            },3000)
            break;
            //下载
            case 4:
            sleep.wait(()=>{
              imgdownLoad(data)
            },3000)
            break;
            //点击类别
            case 'hot':
            case 'new':
            i!==order&&
            sleep.wait(()=>{
                this.setState({
                    order:i,
                    isCategory:false
                },()=>{this.init()})
            },2000)
            break;
            //点击分类
            case 'category':
            sleep.wait(()=>{
                this.setState({
                    isCategory:true
                },()=>{this.init(i)})
            },2000)
            break;
            //点击分类下类别
            case 'id':
            isCategory&&
            sleep.wait(()=>{
                this.setState({
                    categoryId:'category/'+data+'/',
                    isCategory:false
                },()=>{this.init()})
            },1000)
            break;

            default:
            break
        }
        this.setState({
            category,
            bgImg,
        })
    }

    render(){
        const { data,category,isCategory } = this.state
        return (
            <div className="wallpaper" style={{padding:'10px',overflow:'hidden',}}>

                {/* <div style={!phone?styles.arrow:{display:'none'}}>
                    <i className="fa fa-angle-double-left fa-2x" ></i>
                </div> */}

                <div style={{width:'90%',maxWidth:'450px',margin:'30px auto',display:'flex',textAlign:'left'}}>
                    <nav style={{flex:1}}>
                        <i className="fa fa-exchange" onClick={()=>{this.exchange(1)}}></i>
                        <span style={{margin:'0 8px'}}>
                            {category}
                        </span>
                    </nav>
                    <nav onClick={()=>{this.exchange('hot')}} style={{flex:1}}>热门</nav>
                    <nav onClick={()=>{this.exchange('new')}} style={{flex:1}}>最新</nav>
                    <nav onClick={()=>{this.exchange('category')}} style={{flex:1}}>分类</nav>
                </div>

                <div>
                    <div >
                        {
                            !!data.length&&
                            data.map((res,i)=>{
                                return(
                                    <div key={i} className={`wallpaper-item-${category}`} style={styles.wallpaperItem}>
                                    {
                                        !!res.length&&
                                        res.map((item,j)=>(
                                        <div key={j} className="wallpaper-item-img" style={styles.itemImg}>
                                            <img style={{width:'100%',height:'100%'}} src={item.img||item.cover}  onError={(e)=>{e.target.src=_loading}} onClick={()=>{this.exchange('id',item.id)}} />
                                            {
                                            !isCategory?
                                            <span className="down">
                                                <a style={{flex:0.5, fontSize:'13px'}} onClick={()=>{this.exchange(2,item.img)}}>应用当前</a>
                                                <a style={{flex:0.5, fontSize:'13px'}} onClick={()=>{this.exchange(3,item.img)}}>应用全部</a>
                                                <a style={{flex:1}}  onClick={()=>{this.exchange(4,item.wp)}} >下载</a>
                                            </span>:
                                            <span className="category">
                                                <a>{item.name}</a>
                                            </span>
                                            }
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
    wallpaperItem:{
        width:'80%',
        margin:'20px auto',
        display:'flex',
        overflow:'hidden'
    },
    itemImg:{
        flex:1,
        margin:'5px 10px',
        position:'relative'
    }

}

export default Wallpaper