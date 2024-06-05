
export type AdCardProp = {
    id: number;
    title: string;
    description?: string;
    author?: string;
    price: number;
    createdAt?: Date;
    picture: string;
    city?: string;
    category?: {
        id: number;
        name: string;
    };
};

function AdCard({ picture, title, price, id}: AdCardProp) {

    return (
        <div className="ad-card-container">
            <a className="ad-card-link" href={`/ads/${id}`}>
                <img className="ad-card-image" src={picture} />
                <div className="ad-card-text">
                    <div className="ad-card-title">{title}</div>
                    <div className="ad-card-price">{price} €</div>
                </div>
            </a>
        </div>
    );
}

export default AdCard;