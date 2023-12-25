import axios from 'axios'

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
    return Promise.reject(new Error(res.msg || '未知错误'))
  } else {
    return res.data
  }
})

export default request
