import { ref  } from 'vue';
import axios from 'axios';

let apiServer = '/server/api'
const handleChangeAPI = () => {
  console.log(`env:`, import.meta.env )
  let { VITE_API } = import.meta.env
  // console.log(`VERSION:`, VITE_API ) // VERSION: /api2

  if (VITE_API !== undefined) {
    import.meta.env.VITE_API = apiServer
    // console.log(`ChangeAPI:`, import.meta.env.VITE_API) // API: server/api
  }
}
handleChangeAPI()

export const useApiServer = () =>{
  const data = ref([]);
  const errorMessage = ref("");

  const FetchInit = async(url) =>{
    const apiUrl = apiServer + url
    console.log(`apiUrl:`, apiUrl)
    // FullapiUrl = 'https://localdb-1w4g.onrender.com/api/users'

    try {
      const res = await axios.get(apiUrl);
      data.value = res.data.data
    }
    catch (error) {
      console.log('catch', error.message);
      errorMessage.value = "API 發生錯誤"
    }
  }
  return{
    data , errorMessage , FetchInit
  }
}
