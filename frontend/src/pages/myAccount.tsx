import { AuthContext } from "@/contexts/authContext";
import withAuthorization from "@/hoc/withAuthorization";
import { useRouter } from "next/router";
import { useContext } from "react";



function MyAccount() {
    const { email, creationTime, expirationTime } = useContext(AuthContext);

    const router = useRouter()

    return (
        <>
            <h2>My informations</h2>

            {router.query.message}
            {email && `Your email: ${email}`}
            {/*         {expirationTime && `Logged until ${${expirationTime}.toIsoString()}`} // FIXME:
 */}        </>
    );
}

export default withAuthorization(MyAccount)