import { useRouter } from "next/router";

function AdDetailComponent() {
    const router = useRouter();
    console.log(router);

    return (
        <p>The id of this ad is {router.query.id}</p>
    );
}

export default AdDetailComponent;