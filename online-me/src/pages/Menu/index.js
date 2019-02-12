import React, { Component } from 'react';
import {getFetch} from '../../static/fetch'
import {tts} from '../../static/public'
import API from '../../static/api'
class Home extends Component {
  constructor(props){
    super(props);
    this.state={
      list:['随便听听']
    }
  }
  componentDidMount(){
   console.log('is load menu comp')
  }
 

  render() {
    const {list} = this.state
    return (
      <div className="menu" style={styles.menu}>
        <div style={styles.menuList}>
         {
             list.map((item,index)=>{
                 return(
                     <div 
                     key={'menu-item-'+index}
                     style={styles.menuItem}
                     >
                        {item}
                     </div>
                 )
             })
         }
        </div>
      </div>
    );
  }
}
export default Home;
let state={
  leftW:'70%',
  rightW:'30%'
}
const styles={
   
}
