import { gql } from "@apollo/client";

export const GET_ALL_ADS_QUERY = gql`
query GetAllAds {
    getAllAds {
        id
        title
        description
        price
        picture
    }
}
`;

