import axios from "axios";



export const getFeriadosChile = async (año) => {
    try {

      const response = await axios.get(`https://apis.digital.gob.cl/fl/feriados/${año}`);
      return response.data; 
    } catch (error) {
      console.error("Error al consultar la api  :", error);
      throw error; 
    }
  };
