
import React from 'react';
import './index.css'

class Input extends React.Component{
    constructor(props){
        super(props)
        this.state={
            num:'',
            timer:null,
        }
    }
    componentWillUnmount(){
        this.setState({
            timer:null
        })
    }
    smsClick = () => {
        let {num,timer} = this.state;
        if (num === '') {
            num = 30
            this.props.smsClick()
        }
        if (timer === null) {
            timer = setInterval(() => {
                num = num - 1
                if (num === 0) {
                    num = ''
                    timer = null
                    clearInterval(this.state.timer)
                }
                this.setState({
                    num,
                    timer
                })
            }, 1000)
        }
    
    }
   
    render(){
        return (
            <div className="com-input">
                <label>{this.props.label}：</label>
                <span className="input-group">
                <input
                    className="input"
                    type={this.props.type?this.props.type:'text'}
                    required
                    value={this.props.value} 
                    onChange={this.props.onChange}
                    maxLength = {this.props.maxlength}
                    placeholder={this.props.placeholder}
                    style={this.props.style? this.props.style: {} }
                />
                {
                    this.props.clear ?
                        <span className="clear" onClick= {() => this.props.onChange('')}> </span>
                    : ''
                }
                </span>
                {
                    this.props.code ?
                        < span className ="code">
                            <img
                                title="看不清？点击换一个吧"
                                alt = "error？点击试试"
                                style={{width:'100%',height:'100%'}}
                                src={'https://api.it120.cc/mforz/verification/pic/get?key=' + this.props.code }
                                onClick={ this.props.codeChange }
                            />
                        </span>
                    : ''
                }
                {
                    this.props.sms?
                        <span className = "code sms" 
                            style={this.props.smsStyle}
                            onClick={this.smsClick}
                        >
                         获取验证{this.state.num?`(${this.state.num})`:''}
                        </span>
                    :''
                }

            </div>
        )
    }

}

export default Input