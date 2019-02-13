
import React from 'react';
import Input from '@/components/Input/'
import {getCookie,getTime,setStorage,getStorage} from '@/static/public.js'

/* eslint-disable */

class Todo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            list:[],
            i:null,
        }
    }
    componentDidMount(){
        
       
    }
    init=()=>{
        
    }
    onChange=(v)=>{
        if( v.trim() ){
            let { list } =this.state
            const time = getTime()
            const item = {
                id: list.length+1,
                status: false,
                lock: false,
                detail: v,
                newTime: '',
                orgTime:`${time.year}-${time.month}-${time.day} ${time.hours}:${time.minutes}:${time.seconds}`,
            }
            list.push(item)
            this.setState({list})
        }
    }
    handleClick=(index)=>{

        this.setState({
            i:index
        })
    }
    render(){
        const {list,i} =this.state
        return (
            <div className="todo">
                <div style={styles.inputBar}>
                    <Input 
                        style={styles.input} 
                        enter={this.onChange}
                        placeholder="请输入待办"
                    />
                </div>
                
                <div style={styles.listBar}>
                    {
                        list.map((res,index)=>(
                            <div key={res.id||index} style={{width:'100%',margin:'20px auto'}}> 
                                <p className={i==index?'':'p'} onClick={this.handleClick.bind(this,index)} style={styles.detail}>
                                    <span>{ res.detail }</span>
                                    <span style={{position:'absolute',right:0}}>
                                        <i className="fa fa-trash-o"></i>
                                        {
                                            res.status
                                            ?<i className="fa fa-check-square"></i>
                                            :<i className="fa fa-check-square-o"></i>
                                        }
                                    </span>
                                </p>
                                   
                                <span style={styles.time}>{ res.orgTime }</span>
                            </div>
                        ))
                    }
                    {
                        !list.length &&
                        <p style={styles.tip}>暂时没有需要做的事情，输入待办事项，按回车键添加</p>
                    }
                    
                </div>
            </div>
        )
    }
}
const styles={
    inputBar:{
        width:'60%',
        textAlign:'center',
        margin:'30px auto'
    },
    input:{
        width:'100%',
        maxWidth:'350px',
        height:'40px',
        fontSize:'16px',
        margin:'0 auto'
    },
    listBar:{
        width:'100%',
        maxWidth:'400px',
        textAlign:'left',
        margin:'30px auto'
    },
    tip:{
        color: '#b6b6b6',
        textAlign:'center',
        fontSize:'15px',
    },

    detail:{
        fontSize:'18px',
        paddingRight:'30px',
        position:'relative'
    },
    
    time:{
        fontSize:'12px',
        float:'right',
    }
}

export default Todo