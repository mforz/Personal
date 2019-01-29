import React, { Component } from 'react';
import {getFetch} from '../../static/fetch'
import {tts} from '../../static/public'
import API from '../../static/api'
class Home extends Component {
  constructor(props){
    super(props);
    this.state={
      list:[]
    }
  }
  componentDidMount(){
   
  }
  randList=()=>{
    getFetch(API.migu+'/v2/async/audioplayer/getcmscasual')
    .then(res=>{
      this.setState({
        list:res.items
      })
    }).catch(err=>console.log(err))
  }
  play=(id)=>{
    getFetch(API.migu+'/v3/api/music/audioPlayer/getPlayInfo?copyrightId='+id)
    .then(res=>{
      // console.log(res)
      tts(null,res.walkmanInfo.playUrl)
    }).catch(err=>console.log(err))
  }

  render() {
    const {list} = this.state
    return (
      <div className="music" style={styles.musicPage}>
        <div style={styles.musicPage}>
          <div style={styles.left}>

          <div style={styles.musicBar}>
            <div className="ellipsis" style={styles.bar} onClick={this.randList}>随便听听</div>
          </div>

          <div style={styles.musicList}>
          {
            list.map((res,index)=>(
              <div key={index} onClick={()=>this.play(res.ext.crbtCopyrightId11)}>
              {
                res.nodeName||''
              }
              </div>
            ))
          }
          </div>

          {/* http://music.migu.cn/v3/api/video/mvAddress/632734Y0254/HD */}

          {/* http://music.migu.cn/v2/async/audioplayer/getcmscasual */}

          {/* music  http://www.migu.cn/exchange.do?type=20&columnId=30273&nodeId=0&limitSize=0&f=json */}
          {/* http://music.migu.cn/v3/api/music/audioPlayer/getPlayInfo?copyrightId=63254000804 */}
          {/* http://music.migu.cn/v3/api/music/audioPlayer/getLyric?copyrightId=63254000804 */}
          </div>

          <div style={styles.right}>

          </div>
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
    musicPage:{
        width:'100%',
        height:'100%',
    },
    left:{
      width:state.leftW,
      height:'100%',
      float:'left',
    },
    right:{
      width:state.rightW,
      height:'100%',
      overflow:'hidden',
    },
    musicBar:{
      width:'25%',
      height:'100%',
      float:'left',
      backgroundColor:'#fff'
    },
    bar:{
      width:'90%',
      margin:'10px auto',
      padding:'5px',
      textAlign:'center',
      height:'20px',
    },
    musicList:{
      overflow:'hidden',
      height:'100%',
    }
}
