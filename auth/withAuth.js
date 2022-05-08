import React, { useEffect } from "react";
import router from "next/router";
import "firebase/compat/auth";
import { getAuth } from "@firebase/auth";
import initFirebase from "../config";

initFirebase();
const auth = getAuth();

const withAuth = (Component) => (props) => {
    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if (!authUser) {
                router.push("/signin");
            }
        });
    }, []);

    return (
        <div>
            <Component {...props} />
        </div>
    );
};

export default withAuth;
