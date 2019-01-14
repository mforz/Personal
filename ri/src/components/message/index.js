import React from 'react';

const HOC = (InnerComponent) => class extends React.Component {
  render() {
    return ( < InnerComponent { ...this.props}/>)
    ,document.getElementById('root')
  }
}

class Mess extends React.Component {
  render(){
    return ( 
      <div className = "msg" >
        <div>
          {
            this.props.type == 'success'?
            <i className="success"> </i>:
            this.props.type == 'warn'?
            <i className = "warn" > </i>:
            this.props.type == 'error'?
            <i className = "error" > </i>:
            this.props.type == 'none'?
            <i className = "none" > </i>:
            <i>none</i>
          }
          <span className="con">{this.props.con}</span>
        </div>
      </div>
    )
  }
}

const msg = ()=> HOC(Mess)

export {
  msg,
}