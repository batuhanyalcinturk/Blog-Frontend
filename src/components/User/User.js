import React from "react";
import { useParams } from "react-router-dom";

function User() {

    const { userId, userName } = useParams();
    return (
        <div>
            User! {userId} {userName}
        </div>
    )
}

export default User;