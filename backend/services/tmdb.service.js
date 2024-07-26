import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

export const fetchFromTmdb = async(url)=>{

    const options = {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.TMBD_API_KEY}`,
        }
      };


      const response = await axios.get(url,options)

      if(response.status!==200){
        throw new Error("failed to fetch data from tmdb "+response.statusText);
        
      }

      return response.data;
}