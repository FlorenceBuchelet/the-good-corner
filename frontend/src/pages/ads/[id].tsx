import AdCard, { AdCardProp } from "@/components/AdCard";
import { GET_AD_BY_ID } from "@/graphQL/ads";
import { useQuery } from "@apollo/client";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

function AdId() {
    const [message, setMessage] = useState<string>("");
    const [total, setTotal] = useState<number>(0);
    const router = useRouter();
    const id = parseFloat(router.query.id as string)

    const { data, loading, error } = useQuery(GET_AD_BY_ID, {
        variables: { getAdByIdId: id }
    });
    console.log('👉👉 data', data);
    
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    
    const ad = data.getAdById;

    const handleGood = () => {
        if (ad) {
            const deleteAd = async () => {
                try {
                    const response = await axios.put<AdCardProp>(`http://localhost:4000/ads/${id}/star`)
                    if (response.status === 200) {
                        setTotal(total + 1);
                        setMessage(`Good boys get stars! Congrats ${ad.title}!`)
                    }
                } catch (err) {
                    console.error(`${ad.title} hasn't been deleted`);
                }
            }
            deleteAd();
        }
    }

    const handleBad = () => {
        if (ad) {
            const deleteAd = async () => {
                try {
                    const response = await axios.delete<AdCardProp>(`http://localhost:4000/ads/${id}`)
                    if (response.status === 200) {
                        setMessage(`Bad kittens get no mercy! ${ad.title} has been forever deleted!`)
                        setTimeout(() => {
                            router.push("/");
                        }, 3000);
                    }
                } catch (err) {
                    console.error(`${ad.title} hasn't been deleted`);
                }
            }
            deleteAd();
        }
    }

    return (
        <>
            <h1>The goodest of boys</h1>
            <section className="singleAd-card-container">
                {ad && <AdCard
                    picture={ad.picture}
                    id={ad.id}
                    price={total}
                    title={ad.title}
                />}
            </section>
            <h2>Has he truly been a good boy?</h2>
            <span className="adId__form">
                <button onClick={() => handleGood()} className="button">The bestest</button>
                <button onClick={() => handleBad()} className="button">Absolutely not</button>
            </span>
            {message && <p>{message}</p>}
        </>
    );
}

export default AdId;