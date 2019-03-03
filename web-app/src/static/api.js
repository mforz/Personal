
const host = 'http://'+ window.location.hostname + ':2233'

const API = {
  doubanMovie: `${host}/douban-movie`, //https://api.douban.com/v2/movie/search?callback=data&q=d&_=1551466076897
  zys    : `${host}/zys/`,
  article: `${host}/article/`,
  movieVip: `${host}/movie-vip`,
  weather: `${host}/bd-weather/`,
}

export default API