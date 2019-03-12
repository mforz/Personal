
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
            styles:{}
        }
    }
    componentDidMount(){

       let styles = {}

       isPhone() ? styles = phone : styles = pc

       this.setState({styles})

       history.pushState(null, null, document.URL);
        window.addEventListener('popstate', function () {
            history.pushState(null, null, document.URL);
        });
    }
    changeMenu(e,i){
        // switch(i){
        //     case 1:
        //     e.target.className.indexOf('left')!==-1
        //     ?e.target.className = 'fa fa-angle-double-right fa-2x'
        //     :e.target.className = 'fa fa-angle-double-left fa-2x'

        //     let leftBar = JSON.parse(JSON.stringify(styles.leftBar))
        //     e.target.className.indexOf('left') == -1
        //     ? (leftBar.width = 0 , leftBar.opacity = 0)
        //     : (leftBar.width ='20%', leftBar.opacity = 1)

        //     styles.leftBar = leftBar
        //     this.setState({
        //         word: e.target.className
        //     })
        //     break;

        //     case 2:
        //     e.target.className.indexOf('on')!==-1
        //     ?e.target.className = 'fa fa-toggle-off'
        //     :e.target.className = 'fa fa-toggle-on'

        //     let dom1 = document.getElementById('container')
        //     dom1.style.backgroundImage='none'

        //     let dom = document.getElementsByClassName('home')[0]
        //     dom.style.backgroundImage='none'

        //     break;
        //     default:
        //     break;
        // }
    }
  
    render(){
        const { styles } = this.state
        return (
            <div className="home" style={styles.home}>
                {
                    <div style={styles.leftBar}>
                        <div id="menu" style={styles.navBar}>
                            <Menu />
                        </div>
                    </div>
                }
                
                {/* <div style={styles.arrow}>
                    <i className="fa fa-angle-double-left fa-2x" onClick={(e)=>{this.changeMenu(e,1)}}></i>
                    <br/>
                    <br />
                    <i className="fa fa-toggle-on" style={{fontSize:'20px'}} onClick={(e)=>{this.changeMenu(e,2)}}></i>
                </div> */}

                <main style={styles.main}>
                    <div id="container" style={styles.container}>
                        <Route />
                    </div>
                </main>

            </div>
        )
    }

}
const pc ={
    home:{
        width:'100%',
        height:'100%',
        display:'flex',
        backgroundColor:'#e7ebee',
        overflow:'hidden',
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
        opacity:.9,
    },
    navBar: {
        width: '90%',
        float: 'right',
        height: '100%',
        backgroundColor: '#fff',
        borderRadius: '4px',
        overflow: 'auto',
        opacity:.9
    },
    main:{
        width:'80%',
        height:'100%',
        padding:'25px',
        paddingLeft:'10px',
        margin:'0 auto',
        overflow:'hidden',
        backgroundColor:'rgba(255,255,244,0)',
        transition:'all ease .5s'
    },
    container:{
        overflow:'hidden',
        height:'100%',
        borderRadius:'6px',
        backgroundColor:'rgba(255,255,255,.9)',
        transition:'all ease .5s',
        fontSize:'0.16rem'
    },
}

const phone ={

}

export default Home