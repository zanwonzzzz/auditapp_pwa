import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "vue-router";

const router = useRouter()
const http = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  headers: {
    'Content-type': 'Application/json'
  }
});
//clase para poner todas las rutas y solo usarlas en los demas archivos
//decodifica el token en ves ed guardar cada cosa en el localstorage
class AuthService 
{

    login(user){return http.post('/login',user)}

    getIdAuditor(){ //mejorar esto
        const token = localStorage.getItem('token')
        const decoded = jwtDecode(token)
        const idAuditor = decoded.idAuditor

        return idAuditor
    }

     getUserAuditor(){
        const token = localStorage.getItem('token')
        const decoded = jwtDecode(token)
        const user = decoded.user

        return user
    }
     
}
//estaba devolviendo la clase como tal y no una instancia
export default new AuthService();