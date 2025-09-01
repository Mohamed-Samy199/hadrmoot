import { gql } from "@apollo/client";


export const GET_USERS = gql`
    query Uesrs {
        uesrs {
            message
            status
            data {
                _id
                userName
                email
                role
                isConfirmed
                createdAt
            }
        }
    }
`;