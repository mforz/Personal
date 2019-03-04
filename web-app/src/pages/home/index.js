
import React from 'react';
import Route from '../../routers/'
import Menu from '../menu/'
import {isPhone, setStorage} from '../../static/public.js'


/* eslint-disable */
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            random:null,
        }
    }
    componentDidMount(){
    //    console.log(isPhone())
    //    fullScreen()
       setStorage('state',JSON.stringify({}))
    }
    init=()=>{
        
    }
    changeMenu(e){
        e.target.className.indexOf('left')!==-1
        ?e.target.className = 'fa fa-angle-double-right fa-2x'
        :e.target.className = 'fa fa-angle-double-left fa-2x'

        let leftBar = JSON.parse(JSON.stringify(styles.leftBar))
        e.target.className.indexOf('left') == -1
        ? (leftBar.width = 0 , leftBar.opacity = 0)
        : (leftBar.width ='20%', leftBar.opacity = 1)

        styles.leftBar = leftBar
        this.setState({
            word: e.target.className
        })
    }
  
    render(){
        const { word } = this.state
        const phone = isPhone()
        return (
            <div className="home" style={styles.home}>
                {
                    <div style={!phone?styles.leftBar:styles.leftBar2}>
                        <div id="menu" style={!phone?styles.navBar:styles.navBar2}>
                            <Menu />
                        </div>
                    </div>
                }
                
                <div style={!phone?styles.arrow:{display:'none'}}>
                    <i className="fa fa-angle-double-left fa-2x" 
                       onClick={(e)=>{this.changeMenu(e)}}></i>
                </div>

                <main style={!phone?styles.main:styles.main2}>
                    <div id="container" style={styles.container}>
                        <Route />
                    </div>
                </main>

            </div>
        )
    }

}
let styles ={
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
    arrow:{
        position: 'fixed', 
        top: '25px', left: '1%',
        color:'#ff7f2c',
        opacity:'.5',
    },
    leftBar:{
        width:'20%',
        height:'100%',
        padding:'25px',
        overflow:'hidden',
        transition: 'all 0.3s',
        opacity:1,
    },
    navBar: {
        width: '90%',
        float: 'right',
        height: '92%',
        backgroundColor: '#fff',
        borderRadius: '4px',
        overflow: 'auto',
    },
    leftBar2:{
        width:'90%',
        height:'60px',
        margin:'0 auto',
        overflow:'hidden',
        position:'absolute',
        top:'5px',left:'5%',
    },
    navBar2:{
        width:'100%',
        height:'100%',
        backgroundColor:'#fff',
        borderRadius:'4px',
        overflow:'auto',
    },
    main:{
        width:'80%',
        height:'100%',
        padding:'25px',
        paddingLeft:'10px',
        margin:'0 auto',
        overflow:'hidden',
    },
    main2:{
        width:'90%',
        height:'95%',
        padding:'10px',
        margin:'60px auto',
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