
import React from 'react';
// import Route from '../../routers/'
import {imgdownLoad,scriptLoad,removeDom, setStorage, getStorage,Sleep,Scroll} from '../../static/public.js'
import { getFetch } from '../../static/fetch';
import API from '../../static/api';
import Input from '../../components/Input'
const _loading = require('../../assets/loading.gif')
const sleep = new Sleep()
const scroll = new Scroll()

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
           qrcode:null,
           act:0,
           word:''
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
        scriptLoad('qr', 'http://static.runoob.com/assets/qrcode/qrcode.min.js',()=>{
            let qrcode = new QRCode(document.getElementById('qrcode'), {
                text: 'heello',
                width: 256,
                height: 256,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            });
            this.setState({
                qrcode
            })
        })
        // 
    }
    componentWillUnmount(){
        removeDom('qr')
    }
    //获取数据
    init=(url,on)=>{
        let {limit,skip,order,category,isCategory,categoryId,data} =this.state

        let param = url ? url :`${categoryId}${this.state[category]}?limit=${limit*30}&skip=${skip}&adult=false&first=0&order=${order}`

        let wall = !! on ? url : API.wallpaper + this.state[category] + '/' + param
        
        getFetch(wall).then(res=>{
            let item=[],arr=[]
            if(!!res.res &&(!!res.res.vertical||!!res.res.category||!!res.res.wallpaper)){
                arr = res.res.vertical || res.res.category || res.res.wallpaper||[]
            }
            arr.map((img,i)=>{
                img.qr=''
                item.push(img)
                if((i+1)%3==0){
                    data.push(item)
                    item = []
                }
            })
            console.log(data)
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
    //各种点击事件
    exchange=(i,d,o)=>{
        let { category,bgImg,order,isCategory,categoryId,word,data,qrcode,act} =this.state
        categoryId = '',word=''
        switch(i){
            //手机pc类别转换
            case 1:
                category=='phone'?category='pc':category='phone'
            break;
            //应用当前
            case 2:
            sleep.wait(()=>{
                let dom = document.getElementById('container')
                dom.style.backgroundImage=`url(${d})`
                dom.style.backgroundAttachment=`fixed`
                dom.style.backgroundSize = category=='pc'?'cover':'contain';
            },3000)
            break;
            //应用全部
            case 3:
            sleep.wait(()=>{
               let dom = document.getElementsByClassName('home')[0]
               dom.style.backgroundImage = `url(${d})`;
               dom.style.backgroundSize = category=='pc'?'cover':'contain';
            },3000)
            break;
            //下载
            case 4:
            sleep.wait(()=>{
              imgdownLoad(d)
            },3000)
            break;
            case 5:
            sleep.wait(()=>{
                qrcode.makeCode(d)
                let src = document.getElementById('qrcode').lastChild.src
                data[o.i][o.j].qr ?
                data[o.i][o.j].qr= '':
                data[o.i][o.j].qr = src
            },500)
            break;
            //点击类别
            case 'new' :
            case 'hot' :
            (i !== order || !!isCategory) &&
            sleep.wait(()=>{
                this.setState({
                    data : [],
                    order:i,
                    act:d,
                    isCategory:false
                },()=>{this.init()})
            },1000)
            break;
            //点击分类
            case 'category':
            sleep.wait(()=>{
                this.setState({
                    data : [],
                    act:d,
                    isCategory:true
                },()=>{this.init(i)})
            },1000)
            break;
            //点击分类下类别
            case 'id':
            isCategory&&
            sleep.wait(()=>{
                this.setState({
                    data : [],
                    act: order=='hot'?0:1,
                    categoryId:'category/'+d+'/',
                    isCategory:false
                },()=>{this.init()})
            },1000)
            break;

            default:
            break
        }
        this.setState({
            category,
            categoryId,
            word,
            bgImg,
        })
    }
    handleScroll=()=>{
        let {skip,limit,data,isCategory,word}=this.state
        ! isCategory&&
        sleep.wait(()=>{
            if(data.length < 100){
                skip += limit*30
                this.setState({
                    skip,
                    limit
                },()=>{ 
                  word?this.search(word):this.init() 
                })
            }
        },2000)
    }
    search=(word) => {
        if(word && word.trim()){
            const {limit,skip,order,data} =this.state
            let w = API.wallpaperSearch+`search/wallpaper/resource/${word}?limit=${limit*30}&skip=${skip}&adult=false&first=0&order=${order}`
            word!==this.state.word
            ?this.setState({
                word,
                data:[]
            },()=>{
                this.init(w, true)
            }): this.init(w, true)
            
        }
    }
    
    render(){
        const path = "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
        const { data,category,isCategory,act } = this.state
        const active = [null,null,null]
        active[act]='active'
        return (
            <div className="wallpaper" style={{padding:'0 10px',overflow:'hidden',height:'100%'}} >
                <div style={{width:'100%',overflow:'hidden'}}>
                    <Input clear={false} 
                        style={styles.inputBar}
                        enter={this.search}
                        placeholder = "输入关键词搜索 ..."
                        inputStyle={{border:'none',width:'85%',padding:0,}}
                    >
                        {/* search icon */}
                        <i style={styles.search}>
                        <svg focusable="false" viewBox="0 0 24 24"
                            xmlns = "http://www.w3.org/2000/svg">
                            <path d={path} fill="#DB542F"></path>
                        </svg>
                        </i>
                    </Input>
                </div>

                <div style={styles.wallHeader}>
                    <nav style={{flex:1,fontSize:'12px'}} onClick={()=>{this.exchange(1)}}>
                        <i className="fa fa-exchange"></i>
                        <span style={{margin:'0 8px'}}>
                            {category}
                        </span>
                    </nav>
                    <nav  onClick={()=>{this.exchange('hot',0)}} style={{flex:1}}>
                    <span className={active[0]}>热门</span>
                    </nav>
                    <nav  onClick={()=>{this.exchange('new',1)}} style={{flex:1}}>
                    <span className={active[1]}>最新</span>
                    </nav>
                    <nav onClick={()=>{this.exchange('category',2)}} style={{flex:1}}>
                    <span className={active[2]}>分类</span>
                    </nav>
                </div>

                <div style={{overflow:'hidden',height:'90%'}}>
                    <div className="wallpaper-bar"
                    ref={body=>this.dom=body} 
                    style={{overflow:'auto',height:'90%'}}
                    onScroll={()=>{scroll.to(this.dom,this.handleScroll)} }>
                    <div id="qrcode"></div>
                        {
                            !!data.length?
                            data.map((res,i)=>{
                                return(
                                    <div key={i} className={`wallpaper-item-${category}`} style={styles.wallpaperItem}>
                                    {
                                        !!res.length&&
                                        res.map((item,j)=>(
                                        <div key={j} className="wallpaper-item-img" style={styles.itemImg}>
                                            
                                            <img onError={(e)=>{e.target.src=_loading}}
                                            style={{width:'100%'}} src={item.qr||item.img||item.cover}
                                            onClick={()=>{this.exchange('id',item.id)}} />
                                            
                                            {
                                            !isCategory?
                                            <span className="down">
                                                <a style={{flex:0.5, fontSize:'13px'}} onClick={()=>{this.exchange(2,item.img)}}>应用当前</a>
                                                <a style={{flex:0.5, fontSize:'13px'}} onClick={()=>{this.exchange(3,item.img)}}>应用全部</a>
                                                <a style={{flex:0.4}}  onClick={()=>{this.exchange(4,item.wp)}} >下载</a>
                                                <a style={{flex:0.5, fontSize:'13px'}} onClick={(e)=>{this.exchange(5,item.img,{i,j})}}>
                                                <i className="fa fa-qrcode" aria-hidden="true"></i>
                                                </a>
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
                            }):
                            <div style={{width:'100%',textAlign:'center'}}>
                                <img style={{width:'80%',height:'100%'}} src={_loading} />
                            </div>
                        }
                        {
                            data.length==100&&
                            <div style={styles.overTip}>
                                <span>
                                    更多美图，请下载
                                    <a target="_block" href="https://www.wandoujia.com/apps/com.androidesk">'安卓壁纸'</a>
                                     app,或访问<a target="_block" href="http://www.androidesk.com/">官网</a>

                                </span>
                            </div>
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
    },
    inputBar:{
        width: '50%',
        height: '32px', 
        margin: '15px auto', 
        border: '1px solid #ccc', 
        borderRadius: '3px'
    },
    wallHeader:{
        width: '90%', 
        maxWidth: '450px', 
        margin: '10px auto', 
        display: 'flex', 
        alignItems:'center',
        textAlign: 'center'
    },
    overTip:{
        width: '90%', 
        height: '45px', 
        textAlign: 'center', 
        lineHeight: '45px',
        margin: '55px auto'
    },
    search: {
        width: '30px',
        height: '30px',
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)'
    }
}

export default Wallpaper