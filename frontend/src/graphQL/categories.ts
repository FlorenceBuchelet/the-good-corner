import { gql } from "@apollo/client";

export const GET_ALL_CATEGORIES = gql`
query GetAllCategories {
    getAllCategories {
        id
        name
    }
}
`

export const GET_ONE_CATEGORY = gql`
query GetCategoryById($getCategoryByIdId: Float!) {
    getCategoryById(id: $getCategoryByIdId) {
        id
        name
        ads {
            title
            stars
        picture
        owner
        location
        id
        description
        }
    }
}`