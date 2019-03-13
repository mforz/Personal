
import React from 'react';
import Route from '../../routers/'
import Menu from '../menu/'
import {isPhone, setStorage} from '../../static/public.js'


/* eslint-disable */
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            styles:{},
        }
    }
    componentDidMount(){
        //判断样式
       let styles = {}
       isPhone() 
       ? styles = JSON.parse(JSON.stringify(phone)) 
       : styles = JSON.parse(JSON.stringify(pc))
       this.setState({styles})
      //禁用后退
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', function () {
            history.pushState(null, null, document.URL);
        });
    }
    changeMenu=(e)=> {
        let dom = document.getElementById('menuBar')
        e.currentTarget.className.indexOf('active')!==-1?
        (
            e.currentTarget.className = 'menu-button',
            dom.style.width=0,dom.style.opacity = 0 
        ):(
            e.currentTarget.className = 'menu-button is-active',
            dom.style.width='20%',dom.style.opacity = 1
        )
    }

    render(){
        const { styles } = this.state
        return (
            <div className="home" style={styles.home}>

                <div style={styles.header}>

                    <div style={{width:'50px',margin:'0 62px',textAlign:'center',fontSize:'0.16rem'}}>
                       <button className="menu-button is-active" 
                        onClick={(e)=>{this.changeMenu(e)}}>
                           <span></span>
                           <span></span>
                           <span></span>
                       </button>
                    </div>
                </div>

                <div id="menuBar" style={styles.leftBar}>
                    <div id="menu" className="scroll" style={styles.navBar}>
                        <Menu arrow={this.changeMenu} />
                    </div>
                </div>

                <main style={styles.main}>
                    <div id="container" className="scroll" style={styles.container}>
                        <Route />
                    </div>
                </main>

            </div>
        )
    }

}
const pc = {
    home:{
        width: '100%',
        height: '100%',
        display: 'flex',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#e7ebee',
    },
    header:{
        width: '100%',
        height:'60px',
        minWidth:'580px',
        top: 0,
        position: 'fixed', 
        display:'flex',
        color:'#000',
        zIndex:'100',
        overflow:'hidden',
        backgroundColor: '#fff',
    },
    leftBar:{
        width: '20%',
        height: '100%',
        minWidth: '90px',
        padding: '25px',
        paddingTop:'70px',
        paddingBottom:'10px',
        overflow: 'hidden',
        transition: 'all ease-in-out 0.5s',
        opacity:.9,
    },
    navBar: {
        width: '85%',
        minWidth: '70px',
        float: 'right',
        height: '100%',
        backgroundColor: '#fff',
        borderRadius: '4px',
        overflow: 'auto',
        opacity:.9
    },
    main:{
        width: '80%',
        minWidth: '490px',
        height: '100%',
        paddingRight: '25px',
        paddingTop:'70px',
        paddingBottom:'10px',
        margin: '0 auto',
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,244,0)',
        transition: 'all ease .5s'
    },
    container:{
        overflow: 'hidden',
        height: '100%',
        borderRadius: '6px',
        backgroundColor: 'rgba(255,255,255,.9)',
        transition: 'all ease .5s',
        fontSize: '0.16rem'
    },
}

const phone ={

}

export default Home