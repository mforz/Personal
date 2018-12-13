import React, { Component } from 'react';

import './index.css';
class To extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item:'',
        }

    }
    down(e){
        if(e.nativeEvent.keyCode===13){
            if(this.state.item!==""){
                this.props.change(this.state.item)
            }
            e.target.value="";
            this.setState({
                item:''
            })
        }
    }

    change(e){
        this.setState({
            item:e.target.value
        })

    }
    
  render() {
    return (
     <div style={{width:'100%',margin:'0 auto'}}>
        <input 
            style={{display:'block',width:'20%',minWidth:'160px',height:'25px',margin:'0 auto'}} 
            type="text" placeholder="输入待办" onChange={this.change.bind(this)} onKeyDown={this.down.bind(this)} />

     </div>
    );
  }
}

export default To;
