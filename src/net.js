import axios from 'axios'
axios.interceptors.response.use(res => {
    return res.data
}, err => {
    if (err.response.status === 401) {
        alert('login')
        window.location.href = '/login'
    }
    return Promise.reject(err.response)
})
export default axios