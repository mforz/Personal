
import React from 'react';
import Route from '../../routers/'
import Menu from '../menu/'
import {isPhone, setStorage} from '../../static/public.js'
import { Socket } from 'net';


/* eslint-disable */
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            styles:{},
        }
    }
    componentDidMount(){
        document.onkeydown = function(evt) {
            evt = evt || window.event;
            if (evt.keyCode == 32) {
                var box = document.getElementById("messageBox");
                box.style.visibility="hidden";
            }
        };
    }
    

    render(){
        const { styles } = this.state
        return (
            <div className="game" style={styles.game}>

        
        
        </div>

        )
    }

}
const pc = {

}

const phone ={

}

export default Home