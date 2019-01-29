//音频播放
let audio = new Audio()
const tts= (tgt,url)=>{
    //  判断url非空
    if(!tgt && !!url){
        audio.src = url
        audio.play()
        return
    }
    let reg = /[\u4e00-\u9fa5a-zA-Z\d]/g, lan ='en'
    tgt = tgt.match(reg)?tgt.match(reg).join(""):'无法识别和读取';                       // 提取数字汉字字母
    escape(tgt).indexOf("%u")!==-1? lan='zh': lan='en'   // 判断是否为存在汉字
    //
    audio.src=`https://fanyi.baidu.com/gettts?lan=${lan}&text=${tgt}&spd=${lan=='en'?3:5}&source=web`
    audio.play()
    //监听播放完
    // ev = audio.addEventListener('ended',()=>{
    //     ev = null
    // })
}

export {tts}