
import React from 'react';
import './index.css'

class Input extends React.Component{

    render(){
        return (
            <div className="com-input">

                <label>{this.props.label}：</label>

                <input
                    className="input"
                    type={this.props.type?this.props.type:'text'}
                    required
                    value={this.props.value} 
                    onChange={this.props.onChange}
                />

                <span className="clear" onClick={()=>this.props.onChange('')}></span>
                
            </div>
        )
    }

}

export default Input