
import React from 'react';
// import Input from '@/components/Input/'
import {color,goTo,setStorage,getStorage} from '@/static/public.js'

/* eslint-disable */

class Color extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }
    componentDidMount(){
        let dom = document.getElementById('bg')
        let height= document.body.clientHeight-dom.clientHeight
        this.setState({
            height
        })
       
    }
    init=()=>{
        
    }
    render(){
        const {height} =this.state
        return (
            <div className="color" style={{height:height,overflow:'auto',padding:'10%'}}>
            {
               color.map((res,i)=>(
                   <div key={i} style={styles.list}>
                        <div style={styles.divBar}>
                            <span style={Object.assign({backgroundColor:res},styles.div)}></span>
                            <code>{res}</code>
                       </div>
                    </div>
               ))
            }
            </div>
        )
    }
}
const styles={
    list:{
        width:'25%',
        float:'left',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    divBar:{
        display: 'flex',
        margin: '5px auto',
        alignItems: 'center'
    },
    div:{
        display: 'inline-block',
        width: '25px',
        height: '25px',
        marginRight:'2px'
    }

}

export default Color