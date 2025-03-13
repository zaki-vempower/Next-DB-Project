import axios from "axios";

export const fetchTrucks = async () => {
    const res = await axios.get("/api/trucks/trucks");
    const data = await res.data;
    return data;
};