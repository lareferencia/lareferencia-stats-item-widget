import axios from "axios";
import { DEFAULT_BASE_URL, DEFAULT_BY_COUNTRY_WS, DEFAULT_EMBED_FUNCTION_NAME, DEFAULT_ITEM_WS } from "../config";



export const embedFunctionName = DEFAULT_EMBED_FUNCTION_NAME
export const baseUrl = DEFAULT_BASE_URL

export const itemWs = DEFAULT_ITEM_WS;
export const byCountryWs = DEFAULT_BY_COUNTRY_WS;




export const fetchData = async (
    ws: string ,
    identifier: string ,
    source: string,
    start_date: string,
    end_date: string,
    time_unit: string
) => {
    try {
        const params = {
            identifier,
            source,
            start_date,
            end_date,
            time_unit
        }
        const response = await axios.get(baseUrl + ws, { params })

        if (response) {
            return response.data
        } else {
            console.log("vino objeto vacio");
        }
    } catch (error) {
        console.log(error);
        throw error
    }
}