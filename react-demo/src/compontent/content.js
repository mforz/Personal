
//添加统一样式的高阶组件
import React from 'react';


 export default  (Component,fixed)=>{

     class Lulu extends React.Component{
        constructor(props) {
            super(props);
            this.state = {
            }
        }

        render(){
            console.log(Component)
            return (
                <div style={{ background: '#eee', padding:"5px 24px", margin: 0 }}>
                <div>
                    我是来自高阶组件
                </div>
                <Component />
                </div>

            )
        }
     }
     return Lulu
     
 }

//  if(!fixed){
//     return (
//         <div style={{ background: '#eee', padding:"5px 24px", margin: 0 }}>
//             {Component}
//         </div>
//     )
// }else {
//     return (
//         <div ref="aaa" style={{ background: '#eee',padding:"5px 24px",height:8000,position:"fixed",top:112}}>
//             {Component}
//         </div>
//     )
// }