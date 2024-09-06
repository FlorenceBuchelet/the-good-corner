/* eslint-disable react/display-name */
import { AuthContext, AuthRole } from "@/contexts/authContext";
import { useRouter } from "next/router";
import { useContext } from "react";

export default function withAuthorization(ChildPage: any, ...roles: AuthRole[]) {
    return (props: any) => {

        const router = useRouter()
        const { role } = useContext(AuthContext);
        const isLogged = role != undefined && (roles.length == 0 || roles.includes(role));

        if (!isLogged) {
            router.push({
                pathname: '/',
                query: { message: roles.length == 0 ? "You need to be connected to access this page" : `Unauthorized for this page, contact an administrator to become ${roles.join(', ')}` }
            });
        }

        return isLogged ? <ChildPage {...props} /> : null;
    };
}

// TODO: var args ...args nombre variable d'arguments