import { gql } from "@apollo/client";

export const USER_LOGIN = gql`
    mutation UserLogin($password: String!, $email: String!) {
        login(password: $password, email: $email)
    }`
;