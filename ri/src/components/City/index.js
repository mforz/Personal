
import React from 'react';
import city from '@/static/city.js'
import './index.css'
/* eslint-disable */
class CityCom extends React.Component{
    constructor(props){
        super(props)
        this.state={
            show:false
        }
    }
  
    showCity=(index)=>{
        const {show} = this.state
        index===show ? index=false : ''
        this.setState({
            show: index
        })
    }
   
    render(){
        const {show} =this.state
        return (
            <div className="citys" style={styles.city}>
                <div style={styles.panel}>
                    {
                        city.provinces.map((res,index)=>{
                            return(
                                <div key={index} style={styles.provinces}>
                                    <p style={styles.provinceName} onClick={this.showCity.bind(this,index)}>{res.provinceName}</p>
                                    {
                                        show===index?
                                        res.citys.map((res,index)=>{
                                            return <p key={index} className="city" onClick={()=>this.props.onChange(res.citysName)}>{res.citysName} </p>
                                        }):''
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

}
const styles ={
    city:{
        width:'100%',
        maxWidth:'300px',
        margin:'0 auto',
        textAlign:'left',
        height:'300px',
        overflow:'hidden',
        fontSize:'13px',
    },
    panel:{
        width:'100%',
        height:'100%',
        overflowY: 'scroll',
    },
    provinces:{
        margin:'8px auto',
        padding:'1px 10px',
        border:'1px solid #ccc',
        borderRadius:10,
        cursor:'pointer',
    },
    provinceName:{
        width:'90%',
        margin:'5px'
    },
   
}
export default CityCom