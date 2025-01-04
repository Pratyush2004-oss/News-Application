import axios from "axios";

export const fetchFromAPI = async (url) => {
    const response = await axios.get(url, {
        headers: {
            Accept: "application/json",
        }
    });

    if (response.status !== 200) {
        throw new Error("Failed to fetech data from the API" + response.statusText);
    }
    return response.data;
};