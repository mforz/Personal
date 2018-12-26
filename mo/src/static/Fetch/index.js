

export default (url,query,host)=> {

    host = !!host? host : 'http://localhost:2233'
    
    return fetch(`${host}${url}`,query).then(res=>{ return res.json()})

}