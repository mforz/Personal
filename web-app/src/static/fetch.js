const getFetch =(url,obj)=>{
    try {
      let result = fetch(url, {});
      
      if(obj&&obj.type==='text')
        return result.then((res)=>res.text())
      else
        return result.then((res)=>res.json())
    }catch(err){
      console.error(err)
    }
}

const postFetch =(url,data)=> {
    let obj2params = (obj) => {
      let item, result = '';
      for (item in obj) {
        result += '&' + item + '=' + encodeURIComponent(obj[item]);
      }
      if (result) {
        result = result.slice(1);
      }
      return result;
    }
    try {
      let result = fetch(url, {
        method: 'POST',
        credentials: 'omit', //include,表示无论跨域还是同源请求都会带cookie {omit(忽略),same-origin(同源携带)}
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: obj2params(data)
      });
      return result.then((res)=>res.json());
    }catch(err) {
      console.error(err);
    }
}
  
export{
  getFetch,
  postFetch
}