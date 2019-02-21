
const host = 'http://'+ window.location.hostname + ':2233'

const API = {
  checkCode : `${host}/it120/verification/pic/check`,
  checkLogin: `${host}/it120/user/m/login`,
  register  : `${host}/it120/user/m/register`,
  smsCode   : `${host}/it120/verification/sms/get`,
  bdWeather : `${host}/bd-weather/`,
  bdHot     : `${host}/bd-hotword/`,
  sgHot     : `${host}/sg-hotword/`,
  sinaHot   : `${host}/sina-hotword`,
  wbHot     : `${host}/wb-hotword/`,
  ttNews    : `${host}/toutiao-news/`,
  article    : `${host}/article/`,
  tuchong    : `${host}/tuchong`,
  test    : `${host}/test`,
}

export default API