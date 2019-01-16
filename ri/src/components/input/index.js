
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
                if (num <= 0) {
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
        const { width,code,sms,label,size,
                type,value,onChange,maxlength,onKeyPress,
                placeholder,style,clear,codeChange,smsStyle} = this.props
        return (
            <div className="com-input" style={width?{width:width}:{}}>
                <span className="input-group">
                    {
                        label ?
                        <label className={(code||sms) ?'pd-right':''}>
                            { label}:
                        </label>
                        :''
                    }
                    <input
                        className={size? size==='small'?'sm':'lg' :''}
                        type={type?type:'text'}
                        required
                        value={value} 
                        onChange={onChange}
                        maxLength = {maxlength}
                        placeholder={placeholder}
                        style={style? style: {} }
                        onKeyPress={onKeyPress}
                    />
          
                    {   /* 清除 */
                        clear && !!this.props.onChange ?
                         <span 
                            className={code?'clear clear-code':sms?'clear clear-sms':'clear'}
                            onClick= {() => this.props.onChange('')}>
                         </span>
                        : ''
                    }

                    { /* 图形验证码 */
                        code ?
                            <span className ="code img">
                                <img
                                    title="看不清？点击换一个吧"
                                    alt = "error？点击试试"
                                    style={{width:'100%',height:'100%'}}
                                    src={code}
                                    onClick={codeChange}
                                />
                            </span>
                        : ''
                    }

                    { /* 手机验证码 */
                        this.props.sms?
                            <span className = {this.state.num?'code sms disabled':'code sms'}
                                style={smsStyle}
                                onClick={this.smsClick}
                            >
                            获取验证码{this.state.num?`(${this.state.num})`:''}
                            </span>
                        :''
                    }
                </span>
            </div>
        )
    }

}

export default Input