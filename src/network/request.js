import axios from 'axios'
export function request(config) {
  //创建一个axios的实例
  const instance = axios.create({
    baseURL:'http://106.54.54.237:8000/api/hy',
    // baseURL:'http://123.207.32.32:8000/api/hy',
    timeout:5000
  })
  //请求拦截
  instance.interceptors.request.use(config =>{
    return config
  },err =>{} );
  //响应拦截
  instance.interceptors.response.use(res=>{
    return res.data
  },err=>{});
  return  instance(config)
}
