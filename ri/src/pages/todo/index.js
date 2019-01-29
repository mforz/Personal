
import React from 'react';
import Input from '@/components/Input/'
import {tts,getTime,setStorage,getStorage} from '@/static/public.js'
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
            edit:null,
            con:null,
        }
    }
    componentDidMount(){
        this.init()
        getTime()
    }
    init=()=>{
        let { list } = this.state
        list = getStorage('todolist')||[]
        this.setState({
            list,
            i:0,
        })
    }
    keyPress=(e)=>{
        let {list,value} = this.state
        const time = getTime()
        e.nativeEvent.keyCode==13&&
        value.trim()&&
        list.push({
            con: value,
            status: false,
            lock:false,
            time:`${time.year}-${time.month}-${time.day} ${time.hours}:${time.minutes}:${time.seconds}`
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

        let arr = getStorage('todolist')||[]

        if( !arr.length ){
            return
        }
        if( all=='all' ) {
              setStorage('todolist',[])
        } else {
            let list = arr.filter(item => {
                if(!item.status ) {
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
    changeStatus=(flag,index,value)=>{

        let { i ,list, edit, con } = this.state

        switch(flag){
            case 'del':
                !list[index+i].lock ? list.splice(i+index,1):''
            break
            case 'status':
                list[index+i].status= !list[index+i].status
            break
            case 'edit':
                edit= edit==index ? null:index
                list[index+i].con.trim()?'': list.splice(i+index,1)
            break
            case 'value':
                list[index+i].con = value.target.value
            break
            case 'enter':
                edit = value.nativeEvent.keyCode==13 ? null: edit
                list[index+i].con.trim()?'': list.splice(i+index,1)
            break
            case 'lock':
                list[index+i].lock=!list[index+i].lock
            break
            case 'showCon':
                con = con==index?null:index
            break
            case 'clear':
                list=list.filter(item => {
                    if(!item.status || item.lock) {
                        return true
                    }
                })
            break
            case 'clearAll':
                list=list.filter(item => {
                    if(item.lock) {
                        return true
                    }
                })
            break

            default:
            break
        }
        this.setState({
            edit,
            list,
            con
        },()=>{ setStorage('todolist',list) } )
    }

    render(){
        const { list,value,i,edit,con } = this.state
        let arr = JSON.parse(JSON.stringify(list))
        arr = arr.splice(i,12)
        return (
            <div style={styles.todo}>
               <div style={styles.group}>
                   <header style={styles.header}>
                        <Input
                            clear
                            size="lager"
                            comStyle={{width:"350px"}}
                            style={{width:'300px',margin:'0 auto'}}
                            value={value}
                            placeholder="请输入待办"
                            onKeyPress={this.keyPress}
                            onChange={this.change}
                        />
                   </header>
                   {/* <i style={styles.tag}>*点击可播放</i> */}
                   <span style={styles.list}>
                   <span style={styles.clear}>
                        <i style={{margin:'0 12px'}} onClick={this.changeStatus.bind(this,'clear')}> 清除已完成  </i>
                        <i onClick={this.changeStatus.bind(this,'clearAll')}> 清空 </i>
                    </span>
                       {
                           arr.map((res,index)=>{
                               if(index < 12 ){
                                    return(
                                        <span key={index} className="todo-item" style={styles.todoGroup}>
                                            {/* <i className="todo-index">{i+index+1} .</i> */}
                                            {
                                                res.lock?
                                                 <i className="fa fa-lock pull-left" onClick={this.changeStatus.bind(this,'lock',index)}></i>
                                                 :
                                                 <i className="fa fa-unlock pull-left" onClick={this.changeStatus.bind(this,'lock',index)}></i>
                                            }
                                            {
                                                edit==index?
                                                <div className={res.status?"p todo-dis":"p"} style={styles.con}>
                                                   <Input
                                                        style={styles.edit} value={res.con}
                                                        comStyle={{marginLeft:'0',width:'90%'}}
                                                        onChange={this.changeStatus.bind(this,'value',index)}
                                                        onKeyPress={this.changeStatus.bind(this,'enter',index)}
                                                        onBlur={this.changeStatus.bind(this,'edit',index)} />
                                                          {/* {res.con} */}
                                                </div>:
                                                <p className={con==index?res.status?"todo-dis":"":res.status?"p todo-dis":"p" } 
                                                    style={styles.con} 
                                                    onClick={this.changeStatus.bind(this,'showCon',index)}
                                                    // contentEditable={con==index?true:false}
                                                    >
                                                    {res.con}
                                                </p>
                                            }
                                            {
                                                res.status?
                                                <i className="fa fa-check-square-o pull-right" onClick={this.changeStatus.bind(this,'status',index)}></i>
                                                :<i className="fa fa-square-o pull-right" onClick={this.changeStatus.bind(this,'status',index)}></i>
                                            }
                                            <i className="fa fa-pencil-square-o pull-right" onClick={this.changeStatus.bind(this,'edit',index)}></i>
                                            <i className="fa fa-trash pull-right" onClick={this.changeStatus.bind(this,'del',index)}></i>
                                            <i className="fa fa-headphones pull-right" onClick={()=>tts(res.con)}></i>
                                            <i className="time">{res.time}</i>
                                        </span>
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
                   </span>
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
    todoGroup:{
        width:'100%',
        display:'flex',
        alignItems:'center',
        // justifyContent: 'center',
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
        position:'relative',
    },
    con:{
        width:'90%',
        padding:'15px 5px',
        fontSize:'13px',
        textAlign: 'left',
        borderBottom:'1px dashed #eee',
        cursor:'pointer',
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
    // tag:{
    //     fontSize:'12px',
    //     color:'#bfbbbb',
    //     transform:'scale(.8)',
    //     width:'60%',
    //     textAlign:'right',
    //     margin:'0 auto',
    //     display:'block',
    // },
    edit:{
        flex:1,
        height:20,
        padding:0,
        border:'none',
        borderRadius:0,
        borderBottom:'1px solid #CD6839',
    },
    show:{
        display:'block',
        position:'absolute',
        left:0,
        top:0,
        bottom:0,
        right:0,
        backgroundColor:'#fff',
    }
}