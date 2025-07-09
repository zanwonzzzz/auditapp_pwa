import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter()
const http = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-type': 'Application/json'
  }
});

http.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if(token)
    {
        config.headers.Authorization = `Bearer ${token}`
        return config
    }

    return router.push('/login')
})

//clase para poner todas las rutas y solo usarlas en los demas archivos aaa y destruir los componentes
export default http