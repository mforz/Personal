
import React from 'react';
import Route from '../../routers/'
import {isPhone,goTo} from '../../static/public.js'


/* eslint-disable */

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            word:'人生百态',
            menu:[],
        }
    }
    componentDidMount(){
       let menu =[
           {
               name:"小说",
               path:"/novel"
           },
           {
               name:"电影",
               path:"/movie"
           }
       ]

       this.setState({menu})
    }
    handleClick=(path)=>{
        console.log(path)
        goTo(path)
    }
    render(){
        const { menu } = this.state

        return (
            <div className="menu">
              {
                  menu.map((res,i)=>(
                    <nav className="nav-title" key={i} onClick={()=>this.handleClick(res.path)}>
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

export default Home