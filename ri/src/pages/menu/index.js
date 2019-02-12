
import React from 'react';
// import Input from '@/components/Input/'
import {getCookie,goTo,setStorage,getStorage} from '@/static/public.js'
import './index.css'
/* eslint-disable */

class Menu extends React.Component{
    constructor(props){
        super(props);
        this.state={
            menu:[],
            isH:false,
        }
    }
    componentDidMount(){

       let menu = []
       menu=[
           {path:'/',title:'首页'},
           {path:'/login',title:'待办'},
           {path:'/',title:'天气'},
           {path:'/login',title:'登录'},
       ]
       this.setState({
           menu
       })
    }
    init=()=>{
        
    }
    changeRoute=(path)=>{
        (path)
    }
    changeHeight=()=>{
        const { isH } = this.state

        let menu = JSON.parse(JSON.stringify(styles.menu))
        isH==false
        ?menu.height="50px"
        :menu.height="200px"
        styles.menu=menu

        this.setState({
            isH:!isH
        })
    }
    render(){
        const { menu,isH } = this.state
        return (
            <div className="menu" style={styles.menu}>
                <div style={styles.list}>
                    <div style={styles.itemBar}>
                    {
                        menu.map((item,index)=>(
                            <p key={index} className={'menu-item-'+index} style={styles.item} onClick={()=>this.props.rou(item.path)}>
                                <span>
                                    {item.title}
                                </span>
                            </p>
                        ))
                    }
                    <p className='menu-item-more' style={styles.more}> 
                        <span style={{flex:1}}>
                            ...
                        </span>
                        <span style={{flex:1}} onClick={this.changeHeight}>
                            <i className={isH?"fa fa-angle-double-down":"fa fa-angle-double-up"}></i>
                        </span>
                    </p>
                    </div>
                </div>

            </div>
        )
    }

}

let styles={
    menu:{
        width:'100%',
        height:'200px',
        transition:'all .5s',
        backgroundColor:'#9BCD9B',
        position:'relative'
    },
    list:{
        width:'60%',
        maxWidth:'500px',
        height:'50px',
        background:'#FF7F50',
        position:'absolute',
        bottom:0,
        left:'50%',
        transform:'translate(-50%,0)',
        borderRadius:'3px'
    },
    itemBar:{
        width:'100%',
        height:'100%',
        display:'flex',
        alignItems:'center',
    },
    item:{
        flex:1,
        textAlign:'center',
    },
    more:{
        flex:1,
        display:'flex',
        textAlign:'center'
    }
}

export default Menu