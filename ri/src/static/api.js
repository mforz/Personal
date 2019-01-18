
const host = 'http://'+ window.location.hostname + ':2233'

const API = {
  checkCode : `${host}/it120/verification/pic/check`,
  checkLogin: `${host}/it120/user/m/login`,
  register: `${host}/it120/user/m/register`,
  smsCode: `${host}/it120/verification/sms/get`,
  bdWeather: `${host}/bd-weather/`,
}

export default API