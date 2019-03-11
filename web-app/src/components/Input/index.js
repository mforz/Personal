
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
    componentDidMount(){
       const { defaultValue }= this.props
       defaultValue?
       this.setState({
           value:defaultValue
       }):''
    }
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
        const path = "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
        const { placeholder,type,style,children,inputStyle,clear=true,maxLength,onBlur,search} = this.props
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
                    {
                        search&&
                        <i style={styles.search}>
                            <svg focusable="false" viewBox="0 0 24 24"
                                xmlns = "http://www.w3.org/2000/svg">
                                <path d={path} fill="#DB542F"></path>
                            </svg>
                        </i>
                    }
                </div>
            </div>
        )
    }

}

const styles = {
    input:{
        border:'none',
    },
    search: {
        width: '30px',
        height: '30px',
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)'
    }
}

export default Input