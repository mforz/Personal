
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
           { name:"豆瓣电影", path:"/movie"},
           { name:"每日一文", path:"/essay"},
           { name:"音乐", path:"/music"},
           { name:"天气", path:"/weather"},
           { name:"优惠", path:"/discount"},
           { name:"工具", path:"/tool"},
           { name:"工具", path:"/tool"},
           { name:"工具", path:"/tool"},
           { name:"工具", path:"/tool"},
           { name:"工具", path:"/tool"},
           { name:"工具", path:"/tool"},
           { name:"工具", path:"/tool"},
       ]
       this.setState({menu})
    }
    handleClick=(path)=>{
        // console.log(path)
        goTo(path)
    }
    render(){
        const { menu } = this.state
        return (
            <div className="menuBar">
              {
                  menu.map((res,i)=>(
                    <nav key={i} className="nav-title p" 
                        onClick={()=>this.handleClick(res.path)}>
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