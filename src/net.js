import axios from 'axios'
axios.interceptors.response.use(res => {
    if (res.data.to) {
        window.location.href = res.data.to
    } else {
        return res.data

    }
}, err => {
    return Promise.reject(err)
})
export default axios