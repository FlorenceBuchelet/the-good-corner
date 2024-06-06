import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdCard, { AdCardProp } from "@/components/AdCard";


function CatId() {
    const [ads, setAds] = useState([])
    const router = useRouter();

    useEffect(() => {
        const fetchAds = async () => {
            try {
                const result = await fetch(`http://localhost:4000/ads?category=1`);
                const data = await result.json();
                setAds(data);
            } catch (err) {
                console.error("Error in fetching filtered (categories) ads: ", err);
                
            }
        }
        fetchAds();
    }, []);

    return (
        <>
        <h1 onClick={() => console.log(ads)}>
            This is category {router.query.catId}
            </h1>
        </>
    );
}

export default CatId;