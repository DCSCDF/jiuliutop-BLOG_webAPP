//天气api
import axios from 'axios'

const noAuthAxios = axios.create({
    baseURL: 'https://devapi.qweather.com', // 可设置第三方API基础路径
    timeout: 8000
})

export default noAuthAxios