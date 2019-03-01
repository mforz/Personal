
import React from 'react';

import Route from '../../routers/'

import Menu from '../menu/'

import {isPhone, setStorage} from '../../static/public.js'


/* eslint-disable */

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            word:'人生百态',
        }
    }
    componentDidMount(){
       console.log(isPhone())

       setStorage('state',JSON.stringify({}))
    }
    init=()=>{
        
    }
    render(){
        const { word } = this.state
        const phone = isPhone()

        return (
            <div className="home" style={styles.home}>
              
                {
                    !phone     //左侧
                    ?<div style={styles.leftBar}>
                        <div style={styles.navBar}><Menu /></div>
                    </div>
                    :<div style={styles.leftBar}>
                        <div style={styles.navBar}><Menu /></div>
                    </div>
                }
                <main style={styles.main}>
                    <div id="container" style={styles.container}>
                        <Route />
                    </div>
                </main>
                {/* {
                    !phone&&   //右侧
                    <footer style={styles.footer}>
                       <div style={styles.footerBar}>nothing</div>
                    </footer>
                } */}
               
            </div>
        )
    }

}
const styles ={
    home:{
        width:'100%',
        height:'100%',
        display:'flex',
        backgroundColor:'#e7ebee',
        overflow:'hidden',
    },
    phoneM:{
        width:'90%',
        height:'100%',
        margin:'0 auto',
    },
    leftBar:{
        width:'20%',
        height:'100%',
        padding:'25px',
    },
    navBar:{
        width:'90%',
        float:'right',
        height:'92%',
        backgroundColor:'#fff',
        borderRadius:'4px',
    },
    main:{
        width:'80%',
        height:'100%',
        padding:'25px',
        paddingLeft:'10px',
        overflow:'hidden',
    },
    container:{
        overflow:'auto',
        height:'92%',
        borderRadius:'6px',
        backgroundColor:'#fff'
    },
    footer:{
        width:'10%',
        float:'right',
        height:'92%',
        padding:'25px 0',
    },
    footerBar:{
        width:'100%',
        height:'92%',
        backgroundColor:'#fff'
    },
}

export default Home