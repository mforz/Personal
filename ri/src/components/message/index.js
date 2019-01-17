
// mask.js
import React from 'react';
import ReactDOM from 'react-dom';
 
let styles = {
    warp:{
        position:'fixed',
        top: '15px',
        maxWidth:'280px',
        left:'50%',
        transform:'translate(-50%)',
        boxShadow:'0px 0px 8px 5px #eee',
        borderRadius: 4,
        backgroundColor:'#fff',
    },
    group:{
        padding:'8px 10px',
        margin:'2px 8px',
        overflow:'hideen',
        display:'flex',
        alignItems:'center',
        fontSize:'1.3rem'
    },
    ico:{
        width:'15px',
        height:'15px',
        display:'inline-block',
        borderRadius: 7.5,
    },
    con:{
        margin:'0 15px',
        padding:'0',
        display:'inline-block'
    }
};
 
export default {
    timer: null,
    dom: null, //被append的元素
    info ( type, con ) {
        this.close();
        this.dom = document.createElement('div');
        // JSX代码
        let JSXdom = (
            <div style={styles.warp} >
                <div style={styles.group}>
                    <span><i className={type} style={styles.ico}></i></span>
                    <p style={styles.con}>{con}</p>
                </div>
            </div>
        );
        ReactDOM.render(JSXdom, this.dom);
        document.body.appendChild(this.dom);
    },
 
    close () {
        this.dom && this.dom.remove();
        this.timer = null;
    },

    show( type, con, time=3000 ){

        if( this.timer ) {
            return
        }
        
        this.info(type,con)

        this.timer = setTimeout(()=>{
            this.close()
            this.timer = null
        },time)

    }
  }