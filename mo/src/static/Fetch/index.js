

export default (url,query,host)=> {

    host = !!host? host : 'http://localhost:2233'

    const q ={
        method: !!query&&query.method?query.method:'get',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(!!query&&query.body)||'',
    }

    return fetch(`${host}${url}`,q.method=='post'? q : null ).then(res=>{ return res.json()})

}