
import React from 'react';
// import Route from '../../routers/'
import {goTo} from '../../static/public.js'


/* eslint-disable */
class Menu extends React.Component{
    constructor(props){
        super(props);
        this.state={
            word:'人生百态',
            menu:[],
        }
    }
    componentDidMount(){
       let menu =[
           { name:"小说", path:"/novel"},
           { name:"电影/解析", path:"/movie"},
           { name:"每日一文", path:"/essay"},
           { name:"天气", path:"/weather"},
           { name:"壁纸", path:"/wallpaper"},
           { name:"优惠", path:"/discount"},
           { name:"音乐", path:"/music"},
           { name:"工具", path:"/tools"},
       ]
       this.setState({menu})
    }
    render(){
        const { menu } = this.state
        return (
            <div className="menuBar">
              {
                  menu.map((res,i)=>(
                    <nav key={i} className="menu p" 
                        onClick={()=>{goTo(res.path)}}>
                        {res.name}
                    </nav>
                  ))
              }
            </div>
        )
    }

}
const styles ={
    home:{
        width:'100%',
        height:'100%',
        display:'flex'
    },
}

export default Menu