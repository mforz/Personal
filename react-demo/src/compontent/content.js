
//添加统一样式的高阶组件
import React from 'react';


 export default  (Component,fixed)=>{
     if(!fixed){
         return (
             <div style={{ background: '#eee', padding:"5px 24px", margin: 0 }}>
                 {Component}
             </div>
         )
     }else {
         return (
             <div ref="aaa" style={{ background: '#eee',padding:"5px 24px",height:8000,position:"fixed",top:112}}>
                 {Component}
             </div>
         )
     }
 }