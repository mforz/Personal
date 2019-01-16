const getCookie =(name)=>{
    let arr
    ,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    arr = document.cookie.match(reg)
    if (arr)
        return unescape(arr[2]);
    else
        return null;
}
const setCookie =(name,value,day=0)=>{
    if (day !== 0) {  //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
        let expires = day * 24 * 60 * 60 * 1000
        ,date = new Date(+new Date() + expires);
        document.cookie = name + "=" + escape(value) + ";expires=" + date.toUTCString();
    } else {
        document.cookie = name + "=" + escape(value);
    }
}
const delCookie = (name)=> {

    let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    
    if(name)
        setCookie(name, ' ', -1);
    else
        if (keys) {
            for (let i = keys.length; i--;)
                document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
        }
};

const setStorage =(name,value)=>{
    if(window.localStorage)
        localStorage.setItem(name, JSON.stringify(value))
    else
        setCookie(name,value)
    
}
const getStorage =(name)=>{
    if (window.localStorage)
        return JSON.parse(localStorage.getItem(name))
    else
        getCookie(name)
}
const delStorage = (name)=>{
    if (window.localStorage)
        name ? localStorage.removeItem(name) : localStorage.clear()
    else
        delCookie(name)
}

const goTo = (to,from) =>{
    window.location.href = 'http://'+ window.location.host + to
}

export {
    getCookie,
    setCookie,
    delCookie,

    getStorage,
    setStorage,
    delStorage,
    
    goTo
}