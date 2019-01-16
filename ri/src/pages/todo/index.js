
import React from 'react';
import Input from '@/components/Input/'
import {getCookie,goTo,setStorage,getStorage} from '@/static/public.js'
import Message from '@/components/Message/'
/* eslint-disable */


class Todo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value:'',
            list:[],
        }
    }
    componentDidMount(){
   
    }
    init=()=>{
        Message.show('success','hello! welcome to todo')
    }
    keyPress=(e)=>{
        let {list,value} = this.state
        e.nativeEvent.keyCode==13&&
        list.push({
            id: list.length+1,
            con: value,
            status: 0,
        })&&
        this.setState({
            list,
            value:'',
        })
    }

    change = (v) => {
        this.setState({
        value: v ? v.target.value: ''
        })
    }

    render(){
        const { list,value} = this.state
        return (
            <div style={styles.todo}>
               <div style={styles.group}>

                   <header style={styles.header}>
                        <Input
                            clear
                            size="lager"
                            width="350px"
                            style={{width:'300px'}}
                            value={value}
                            placeholder="请输入待办"
                            onKeyPress={this.keyPress}
                            onChange={this.change}
                        />
                   </header>

                   <div style={styles.list}>
                       {
                           list.map((res,index)=>{
                               return(
                                    <p style={styles.item}>
                                        {res.con}
                                    </p>
                                )
                               
                           })
                       }
                       {
                           !list.length?
                           <p style={styles.notItem}>暂时没有待办的事情</p>
                           :''
                       }
                   </div>
                  <footer>

                  </footer>
               </div>
            </div>
        )
    }
}

export default Todo

const styles = {
    todo:{
        width:'100%',
        height:'100%',
        margin:'20px'
    },
    group:{
        width:'50%',
        margin:'0 auto',
    },
    header:{
        width:'100%',
        display:'flex',
        alignItems:'center',
        justifyContent: 'center',
    },
    list:{

    },
    item:{
        width:'100%',
        padding:'8px 0',
        fontSize:'13px',
        textAlign: 'left',
        borderBottom:'1px dashed #eee',
    },
    notItem:{
        textAlign:'center',
        color:'#b6b6b6',
        fontSize:'13px'
    }
}