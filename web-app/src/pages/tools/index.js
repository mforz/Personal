
import React from 'react';
// import Route from '../../routers/'
import {apiData, scriptLoad, removeDom} from '../../static/public.js'

import State from '../../static/static'



/* eslint-disable */
class Tools extends React.Component{
    constructor(props){
        super(props);
        this.state={
            type:0
        }
    }
    componentDidMount(){
    //   this.fontLoad()
    }
    fontLoad=(i)=>{
        if(i){
            let key = State.font[i]
            scriptLoad('font',State.fontLint[0],()=>{
                $youziku.load("div",key,'');
                $youziku.draw();
            })
        }
    }
    qrLoad =()=>{
        scriptLoad('qr',State.qr[0],()=>{
            let qrcode = new QRCode(document.getElementById('qrcode'), {
                text: '',
                width: 256,
                height: 256,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            });
            this.setState({
                qrcode
            })
        })
    }
    
    render(){
        const { type } = this.state
        return (
            <div className="tools" style={{width:'100%',height:'100%'}}>
              <div style={{width:'100%',height:'50px',background:'#ccc'}}>
                
              </div>
              <div style={{overflow:'hidden',height:'90%'}}>
                <div className="scroll" style={{overflow:'auto',height:'100%'}}>
                    {
                        State.imgBase64.map((res,i)=>(
                            <div key={i} onClick={()=>{this.fontLoad(i)}} style={{margin:'10px 0',width:'250px',height:'50px'}}>
                                <img src={res} style={{width:'100%',height:'100%'}} />
                            </div>
                        ))
                    }
                </div>
              </div>
            </div>
        )
    }

}
const styles ={
    tools:{
        width:'100%',
        height:'100%',
    },
}

export default Tools