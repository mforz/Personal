import React, { Component } from 'react';

// import './list.css';
class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
          list:[]
        }
    }
    click(falg,v){
        this.props.click(falg,v)
    }
  render() {
   let { list } = this.props
    return (
     <div style={{margin:"50px",maxHeight:'500px',overflow:'auto',}}>
        <div style={{width:'70%',margin:'0 auto',}}>
            {
                list.length!==0?
                list.map((res,i )=>{
                    return(
                        <p style={{borderBottom:'1px dashed #eee',padding:'15px'}} key={i}>
                            <i style={{marginRight:'20px',color:'#ddeecc'}}>{res.id}</i>
                            <span style={res.style}>{res.con}</span>
                            <a href="javascript:void(0)" style={{float:'right',opacity:'.6'}} title="delete" onClick={this.click.bind(this,'del',res.id)}>X</a> 
                            <a style={{float:'right',margin:'0 10px',opacity:'.7'}} href="javascript:void(0)" title="done" onClick={this.click.bind(this,'done',res.id)}>√</a> 
                        </p>
                    )
                }):
                <h3 style={{color:'#ddd',textAlign:'center'}}>暂时没有需要做的事情，输入待办事项，按回车键添加</h3>
            }
        </div>
     </div>
    );
  }
}

export default List;
