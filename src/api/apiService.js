import axios from "axios";


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
})

//clase para poner todas las rutas y solo usarlas en los demas archivos
//decodifica el token en ves ed guardar cada cosa en el localstorage
class apiService 
{

    ordenesPendientes(fk_auditor){return http.get(`/pendientes/${fk_auditor}`)}

    DetalleOrdenes(folio_pisa){return http.get(`/detalle/ordenes/${folio_pisa}/`)}

    Valores(folio_pisa,campos){return http.get(`/valores/${folio_pisa}/${campos}/`)}

    ValoresTecnico(folio_pisa,campos){return http.get(`/valores/tecnico/${folio_pisa}/${campos}/`)}

    Inserts(folio_pisa,data){return http.put(`/no/existe/${folio_pisa}`,data)}

    Copes(){return http.get(`/copes`)}

    Distritos(id_cope){return http.get(`/distritos/${id_cope}`)}

    Validarfolio(folio_pisa){return http.get(`/validar/folio/${folio_pisa}`)}

    Auditoria(folio_pisa,data){return http.post(`/nueva/auditoria/${folio_pisa}`,data)}
     
}
//estaba devolviendo la clase como tal y no una instancia
export default new apiService();