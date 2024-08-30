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

export const GET_AD_BY_ID = gql`
query GetAdById($getAdByIdId: Float!) {
    getAdById(id: $getAdByIdId) {
        id
        title
        description
        price
        picture
    }
}`
