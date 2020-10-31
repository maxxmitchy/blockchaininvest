import React from "react";
import { useQuery } from "react-query";
import { Redirect } from "react-router-dom";

const VerifyEmail = () => {
    const isVerified = async () => {
        const data = await axios.get("/api/email/verify");
        return data;
    };

    const { data } = useQuery("login", isVerified);

    const redirect = <Redirect to="/dashboard" />;

    return data?.data.verified ? (
        redirect
    ) : (
        <div className="container mt-5 pt-5">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt
            cupiditate non quisquam, esse sint odio voluptatum distinctio
            commodi. Natus autem placeat magni quia dolore, deleniti dolores
            eligendi vero tempore voluptates ad officia voluptatum, distinctio
            illum accusamus fuga hic ea unde doloribus at nam laboriosam.
            Assumenda ullam voluptate animi dicta eum, deserunt, earum illum
            repellat excepturi fugiat consectetur veritatis reiciendis
            repudiandae similique qui, nemo quae dolorum. Blanditiis, alias
            delectus possimus provident, natus hic fuga eaque expedita at porro
            mollitia molestiae, inventore error ea sapiente enim facere impedit
            ut! Minima, amet. Repellendus cumque molestias cum. Veniam eos,
            sapiente itaque explicabo tempora mollitia!
        </div>
    );
};

export default VerifyEmail;
