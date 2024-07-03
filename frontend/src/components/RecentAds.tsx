import AdCard, { AdCardProp } from "./AdCard";
import { useState } from "react";
import 'dotenv/config';
import { useQuery } from "@apollo/client";
import { GET_ALL_ADS_QUERY } from "@/graphQL/ads";


function RecentAds() {
    const [total, setTotal] = useState<number>(0);

    const { data, loading, error } = useQuery(GET_ALL_ADS_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    console.log('Retour de apollo client suite à la requête GraphQL ' , data);

    return (
        <>
            <h2>Cute babies</h2>
            <p>Total of stars earned : {total} ⭐</p>
            <section className="recent-ads">
                {data.getAllAds.map((ad: AdCardProp) => (
                    <article
                        key={ad.id}
                    >
                        <AdCard
                            picture={ad.picture}
                            id={ad.id}
                            price={ad.price}
                            title={ad.title}
                        />
                        <button
                            className="button"
                            onClick={() => setTotal(total + ad.price)}
                        >
                            Add stars to total
                        </button>
                    </article>
                ))}
            </section>
        </>
    );
}

export default RecentAds;