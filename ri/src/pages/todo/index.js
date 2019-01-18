
import React from 'react';
import Input from '@/components/Input/'
import {tts,goTo,setStorage,getStorage} from '@/static/public.js'
import Message from '@/components/Message/'
import './index.css'
/* eslint-disable */


class Todo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value:'',
            list:[],
            i:0,
        }
    }
    componentDidMount(){
        this.init()
    }
    init=()=>{
        let { list } = this.state
        list = getStorage('todolist')
        this.setState({
            list,
            i:0,
        })
    }
    keyPress=(e)=>{
        let {list,value} = this.state

        e.nativeEvent.keyCode==13&&
        value.trim()&&
        list.push({
            con: value,
            status: false,
        })&&
        this.setState({
            list,
            value:'',
            i: (Math.ceil(list.length/12)-1)*12

        },()=>{ setStorage('todolist',list)} )
    }
    //输入
    change = (v) => {
        this.setState({
            value: v ? v.target.value: ''
        })
    }
    //清空
    clear=( all )=>{

        let arr = getStorage('todolist')
        if( !arr.length ){
            return
        }
        if( all=='all' ) {
              setStorage('todolist',[])
        } else {
            let list = arr.filter(item => {
                if(!item.status) {
                    return true
                }
            })
            setStorage('todolist',list)
        }
        this.init()
    }
    //上下页
    changePage=(flag)=>{

        let { i,list } =this.state

        flag=='top'? i = i-12 : i = i + 12

        i > list.length ? i= list.length - (list.length % 12) : ''

        i <= 0 ? i = 0 : ''

        this.setState( { i } )
    }
    //改变状态
    changeStatus=(flag,index)=>{
        let { i ,list } = this.state
        if(flag=='del'){
            list.splice(i+index,1)
        }
        if(flag=='0'||flag=='1'){
            list[index+i].status= !list[index+i].status
        }
        this.setState({
            list
        },()=>{ setStorage('todolist',list) } )
    }
    play=(v)=>{
        tts(v)
    }

    render(){
        const { list,value,i } = this.state
        let arr = JSON.parse(JSON.stringify(list))
        arr = arr.splice(i,12)
        return (
            <div style={styles.todo}>
               <div style={styles.group}>
                   <header style={styles.header}>
                        <Input
                            clear
                            size="lager"
                            width="350px"
                            style={{width:'300px',margin:'0 auto'}}
                            value={value}
                            placeholder="请输入待办"
                            onKeyPress={this.keyPress}
                            onChange={this.change}
                        />
                   </header>
                   <i style={styles.tag}>*点击可播放</i>
                   <div style={styles.list}>
                   <span style={styles.clear}>
                        <i style={{margin:'0 12px'}} onClick={this.clear.bind(this)}> 清除已完成  </i>
                        <i onClick={this.clear.bind(this,'all')}> 清空 </i>
                    </span>
                       {
                           arr.map((res,index)=>{
                               if(index < 12 ){
                                    return(
                                        <div key={index} className="todo-item" style={styles.header}>
                                            <i className="todo-index">{i+index+1} .</i>
                                            <p className={res.status?"p todo-dis":"p"} style={styles.con} onClick={()=>tts(res.con)}>
                                                {res.con}
                                            </p>
                                            {
                                                res.status?
                                                <i className="fa fa-check-square-o pull-right" onClick={this.changeStatus.bind(this,'1',index)}></i>
                                                :<i className="fa fa-square-o pull-right" onClick={this.changeStatus.bind(this,'0',index)}></i>
                                            }
                                            <i className="fa fa-trash pull-right" onClick={this.changeStatus.bind(this,'del',index)}></i>
                                        </div>
                                    )
                               }
                           })
                       }
                       {
                           ! list.length ?
                           <p style={styles.notItem}>暂时没有待办的事情</p>
                           : list.length >= 12 ? 
                           <div style={styles.btnGroup} >
                                <div className="btn" style={styles.btn} onClick={this.changePage.bind(this,'top')}>上一页</div>
                                <div > </div>
                                <div className="btn" style={styles.btn} onClick={this.changePage.bind(this,'bottom')}>下一页</div>
                            </div>
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
        margin:'80px auto 0',
    },
    group:{
        width:'90%',
        margin:'0 auto',
    },
    header:{
        width:'80%',
        margin: '0 auto',
        display:'flex',
        alignItems:'center',
        justifyContent: 'center',
    },
    clear:{
        width:'60%',
        display:'block',
        float:'right',
        fontSize:'12px',
        transform:'scale(.85)',
        color:'#555',
        textAlign:'right',
        padding:'0 18px',
    },
    list:{
        width:'100%',
        maxWidth:'600px',
        padding:'30px 10px 0',
        margin:'0 auto',
    },
    con:{
        width:'90%',
        padding:'8px 5px',
        fontSize:'13px',
        textAlign: 'left',
        borderBottom:'1px dashed #eee',
    },
    notItem:{
        margin:'40px auto 0',
        textAlign:'center',
        color:'#b6b6b6',
        fontSize:'13px'
    },
    btnGroup:{
        display:'flex',
        margin:'20px auto 0',
        textAlign:'center',
        justifyContent:'center'
    },
    btn:{
        fontSize:'13px',
        margin:'0 20px'
    },
    tag:{
        fontSize:'12px',
        color:'#bfbbbb',
        transform:'scale(.8)',
        width:'60%',
        textAlign:'right',
        margin:'0 auto',
        display:'block',
    }
}