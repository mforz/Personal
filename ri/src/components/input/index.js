
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
                v.nativeEvent.keyCode===13
                &&(this.props.enter(value),value='')

            break;

            default:
            break;
        }
        this.setState({
            value
        })
    }
   
    render(){
        const { placeholder,type,style,children} = this.props
        const { value } = this.state
        return (
            <div className="comp-input" >
                <div className="input-bar" style={style||{}}>
                   <input
                    required
                    type={type||'text'}
                    value={value}
                    placeholder={placeholder}
                    onChange={this.onChange.bind(this,'input')}
                    onKeyPress={this.onChange.bind(this,'key')}
                   />
                    { children }
                    <i className="fa fa-times-circle clear" onClick={this.onChange.bind(this,'clear')}></i>
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