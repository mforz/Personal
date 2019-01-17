
// mask.js
import React from 'react';
import ReactDOM from 'react-dom';
 
const styles = {
    mask: {
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        height: '100%',
        zIndex: 1000,
    },
    modalWrap: {
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        zIndex: 1000,
    },
    modal: {
        fontSize: 14,
        padding: 20,
        width: '90%',
        maxWidth:520,
        height: 200,
        margin: '100px auto 0',
        backgroundColor: '#fff',
        borderRadius: 4,
        overflow: 'hidden',
        textAlign: 'center',
        position:'relative'
    },
    btnGroup: {
       width: '80%',
       position: 'absolute',
       bottom: 30,
       left: '50%',
       transform:'translateX(-50%)'
    },
    btn:{
        display:'inline-block',
        border:'1px solid #ccc',
        borderRadius:6,
        padding:'4px 8px',
        margin:'0 30px',
        cursor: 'pointer',
    },
    close:{
        float:'right',
    }
};

const closeX=(
    <svg style={{width:'18px',height:'18px',fill:'#b6b6b6'}}>
        <use href="#close">
            <svg id="close" viewBox="0 0 1025 1024" width="100%" height="100%">
                <path d='M633.540714 512.009086L997.962651 876.48694a85.92372 85.92372 0 1 1-121.530561 121.474644L512.010153 633.482732 147.531301 997.961584A85.92372 85.92372 0 1 1 26.057655 876.431023l364.478852-364.421937L26.057655 147.530235A85.92372 85.92372 0 1 1 147.588216 26.056589l364.421937 364.477853L876.488006 26.056589a85.92372 85.92372 0 1 1 121.474645 121.530561L633.483799 512.009086z'>
                </path>
            </svg>
        </use>
    </svg>
)
 
export default {
    dom: null, //被append的元素
    success ({title, btn=true, content, onOk, onCancel}) {
        this.close();
        this.dom = document.createElement('div');
 
        // JSX代码
        const JSXdom = (
            <div>
              <div style={styles.mask} />
              
                <div style={styles.modalWrap}>

                  <div style={styles.modal}>

                      <i style={styles.close} onClick={()=>this.close()}> { closeX } </i>

                      <h2>{title}</h2>

                      <div>{content}</div>
                      {
                        btn ?
                        <footer style={styles.btnGroup}>
                            <span style={Object.assign(styles.btn, btn.style)} onClick={() => this.onCancel(onCancel)}>取消</span>
                            <span style={Object.assign(styles.btn, btn.style)} onClick={() => this.onOk(onOk)}>确定</span>
                        </footer>
                        :''
                      }
                    
                  </div>
              </div>
            </div>
        );
        ReactDOM.render(JSXdom, this.dom);
        document.body.appendChild(this.dom);
    },
 
    onCancel (onCancel) {
        (onCancel instanceof Function) && onCancel();
        this.close();
    },
 
    onOk (onOk) {
        (onOk instanceof Function) && onOk();
        this.close();
    },
 
    close () {
        this.dom && this.dom.remove();
    }
  }