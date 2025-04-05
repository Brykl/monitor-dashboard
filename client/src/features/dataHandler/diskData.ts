import axios from "axios";


const memoryInfo = async () => {
    try {
        const response = await axios.get("http://localhost:8080/server/diskInfo");
        console.log(response.data)
        return response.data;
    } catch (e) {
        console.error(e);
        return null;
    }
};

export default memoryInfo;