
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
                    ?<header style={styles.header}>
                        <Menu />
                    </header>
                    :<header style={styles.header}>
                        <Menu />
                    </header>
                }
                <main style={phone?styles.phoneM:styles.main}>
                    <Route />
                </main>

                {
                    !phone&&   //右侧
                    <footer style={styles.footer}>
                       nothing
                    </footer>
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
    header:{
        width:'20%',
        height:'100%',
        border:'1px solid #ccc'
    },
    phoneM:{
        width:'90%',
        height:'100%',
        margin:'0 auto',
    },
    main:{
        width:'60%',
        height:'100%',
    },
    footer:{
        width:'20%',
        height:'100%',
       
    },
}

export default Home