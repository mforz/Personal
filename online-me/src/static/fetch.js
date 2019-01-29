

const getFetch =(url)=>{
    try {
      let result = fetch(url, {
        // credentials: "omit",
        // headers: {
        //   "Access-Control-Allow-Origin": "*",
        //   Accept: "application/json, text/plain, */*"
        // },
        // mode: "cors"    // 设置允许cors跨域
      });
      return result.then(res=>res.json());
      
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
          // 'Content-Type': 'application/x-www-form-urlencoded'
          'Content-Type': 'application/json'
        },
        // body: obj2params(data)
        body: JSON.stringify(data)
      });
      return result.then(res=>res.json());
    }catch(err) {
      console.error(err);
    }
  }
  
  export{
    getFetch,
    postFetch
  }