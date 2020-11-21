import React from "react";
import { useQuery } from "react-query";

function useUserData() {
    const userVerify = async () => {
        let data = await axios.get("/api/email/verify");
        return data.data;
    };

    const { data } = useQuery("verify", userVerify);

    return data;
}

export default useUserData;
