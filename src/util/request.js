import axios from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false, // 跨域请求时是否需要使用cookie凭证
  timeout: 8000
})

// request.interceptors.request.use(
//     error => {
//         ElMessage.error(error.message);
//         return Promise.reject(error);
//     }
// );

request.interceptors.response.use((response) => {
  const res = response.data
  if (res.code !== 200) {
    ElMessage.error(res.msg || '未知错误')
    return Promise.reject(new Error(res.msg || '未知错误'))
  } else {
    if (res.msg != null) {
      ElMessage.success(res.msg)
    }
    return res.data
  }
})

export default request;
