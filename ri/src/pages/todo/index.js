
import React from 'react';
import Input from '@/components/Input/'
import {getCookie,getTime,setStorage,getStorage} from '@/static/public.js'
import './index.css'
/* eslint-disable */

class Todo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            list:[],
            i:null,
            start:0,
            end:5,
            page:[],
        }
    }
    componentDidMount(){
        this.init()
    }
    init=()=>{
        let {list,page,end} =this.state
        list = getStorage('todo') || []
        const n = list.length % end ? Math.floor(list.length / end) + 1 : Math.floor(list.length / end)
        page = [...(new Array(n)).keys()]
        this.setState({
            list,
            page
        })
    }
    onChange=(v)=>{
        if( v.trim() ){
            let { list,end,page } =this.state
            const time = getTime()
            const item = {
                status: false,
                lock: false,
                detail: v,
                newTime: '',
                orgTime:`${time.year}-${time.month}-${time.day} ${time.hours}:${time.minutes}:${time.seconds}`,
            }
            list.push(item)
            setStorage('todo', list)
            &&this.init()
        }
    }
    handleClick= (f,v)=>{
        let {i,list,start,end} = this.state
        switch(f){
            case 'click':
            i = i== v ? null :v
            break;
            case 'status':
            list[v+start].status = !list[v+start].status
            setStorage('todo', list)
            break;
            case 'del':
            list.splice(v+start, 1)
            setStorage('todo',list)
            &&this.init()
            break;
            case 'page':
             start= v*end
            break;
           
            default:
            break;

        }
        this.setState({
            i,
            start,
            list,
        })
    }
    render(){
        const {list,i,start,end,page} =this.state
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
                        list.slice(start, start+end).map((res, index) => (
                            <div key={index} style={{width:'100%',margin:'20px auto'}}> 
                                <p className={i==index?'detail':'p'} style={styles.detail}>
                                    <i style={{userSelect:'none',marginRight:'4px',fontSize:'13px',color:'#ff7f50'}}>{start+index+1}. </i>
                                    <span style={res.status?styles.had:{}} onClick={this.handleClick.bind(this,'click',index)}>
                                    { res.detail }
                                    </span>
                                    <span style={styles.option}>
                                       
                                        {
                                            res.status
                                            ? <i className = "fa fa-check-square" onClick = {this.handleClick.bind(this,'status', index)}></i>
                                            :<i className="fa fa-check-square-o" onClick = {this.handleClick.bind(this,'status', index)}></i>
                                        }
                                         <i className="fa fa-trash-o" onClick = {this.handleClick.bind(this,'del', index)}></i>
                                    </span>
                                </p>
                                <span style={styles.time}>{ res.orgTime }</span>
                            </div>
                        ))
                    }
                    {
                        list.length>end
                        &&<div style={{textAlign:'center'}}>
                            <i className="fa fa-angle-double-left"></i>
                            <i className="fa fa-angle-left"></i>
                            {
                               page.map((res,index)=>(
                                    <i  key={index} style={styles.pageNum} 
                                        className={start/end==index?'color':''}
                                        onClick={this.handleClick.bind(this,'page',index)}>
                                        {index+1}
                                    </i>
                                ))
                            }
                            {
                                <i>...</i>
                            }
                            <i className="fa fa-angle-right"></i>
                            <i className="fa fa-angle-double-right"></i>
                        </div>
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
        paddingRight:'50px',
        position:'relative'
    },
    option:{
        position:'absolute',
        right:0,
        top:'50%',
        transform:'translateY(-50%)',
    },
    time:{
        fontSize:'12px',
        float:'right',
        color:'#ccc',
    },
    pageNum:{
        fontSize:'12px',
        margin:'0 5px'
    },
    had:{
        textDecoration:'line-through',
        color:'#ccc'
    }
}

export default Todo