
import React from 'react';
import './index.css'


 /* eslint-disable */
class Input extends React.Component{
    constructor(props){
        super(props)
        this.state={
            value:''
        }
    }
    componentWillUnmount(){
       const { defaultValue }= this.props
       defaultValue?
       this.setState({
           value:defaultValue
       }):''
    }
    // smsClick = () => {
    //     let {num,timer} = this.state;
    //     const {time} =this.props
    //     if (!num) {
    //         num = time || 30
    //         this.props.smsClick()
    //     }
    //     if (timer === null) {
    //         timer = setInterval(() => {
    //             num = num - 1
    //             if (num <= 0) {
    //                 num = ''
    //                 timer = null
    //                 clearInterval(this.state.timer)
    //             }
    //             this.setState({
    //                 num,
    //                 timer
    //             })
    //         }, 1000)
    //     }
    // }

    onChange=(i,v)=>{
        let { value } = this.state
        switch(i){
            case 'input':
                value = v.target.value
            break;

            case 'clear':
                value = ''
            break;

            case 'key':
                const {enter} =this.props
                v.nativeEvent.keyCode===13
                &&(enter&&enter(value),value='')

            break;

            default:
            break;
        }
        this.setState({
            value
        })
    }
   
    render(){
        const { placeholder,type,style,children,inputStyle,clear=true,maxLength,onBlur} = this.props
        const { value } = this.state
        return (
            <div className="comp-input" >
                <div className="input-bar" style={style||{}}>
                   <input
                    required
                    autoFocus
                    style={inputStyle||{}}
                    type={type||'text'}
                    value={value}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    onChange={this.onChange.bind(this,'input')}
                    onKeyPress={this.onChange.bind(this,'key')}
                    onBlur={onBlur}
                   />
                    { children }
                    {
                        clear?
                        <i className="fa fa-times-circle clear" onClick={this.onChange.bind(this,'clear')}></i>
                        :''
                    }
                    
                </div>
            </div>
        )
    }

}

const styles = {
    input:{
        border:'none',
    }
}

export default Input