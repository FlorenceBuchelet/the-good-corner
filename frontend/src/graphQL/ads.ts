import { gql } from "@apollo/client";

export const GET_ALL_ADS_QUERY = gql`
    query GetAllAds {
        getAllAds {
            id
            title
            description
            stars
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
            stars
            picture
        }
    }
`;


export const PUBLISH_AD = gql`
    mutation PublishAd(
        $title: String!,
        $description: String!,
        $owner: String!,
        $stars: Int!,
        $picture: String!,
        $location: String!,
        $categoryId: Int!,
        $tagsIds: [Int!]!
        ) {
        publishAd(adData: {
            title: $title,
            description: $description,
            owner: $owner,
            stars: $stars,
            picture: $picture,
            location: $location,
            categoryId: $categoryId,
            tagsIds: $tagsIds
        }) {
            id
            title
            description
            owner
            stars
            picture
            location
            category
            tags
            createdAt
        }
    }
`;