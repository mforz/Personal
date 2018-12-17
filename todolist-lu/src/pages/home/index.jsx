import React, { Component } from 'react';

import To from '../to'
import Do from '../do'
import List from '../list'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // item:'',
            list:[]
        }
    }

    componentWillMount(){
        this._loadList()
    }
    _loadList(){
        let list = JSON.parse(localStorage.getItem('list'))||[]
        if(list){
            this.setState({
                list
            })
        }
    }
    _saveList(list){
        localStorage.setItem('list',JSON.stringify(list))
    }


    change(v){
        let {list} = this.state
        let  i = list.length+1
        list.push({
            id:i,
            style:{},
            con:v,
            createdTime:(new Date()).getTime()
        })
        this.setState({
            list
        })
        this._saveList(list)
    }
    click(flag,id){
        let {list} = this.state
        list.forEach((res,i)=>{
            return flag==='del'? (res.id===id ? list.splice(i,1) : '' ) : (res.id===id? res.style={textDecoration:'line-through'}:'')
        })
        this.setState({
            list
        })
    }
    render() {
        const style={
            width:'100%',
            padding:'50px 0',
        }
        return (
        <div style={style}>
            <To change={this.change.bind(this)} />
            <List click={this.click.bind(this)} list={this.state.list} />
            <Do />
        </div>
        );
  }
}

export default Home;
