import { gql } from "@apollo/client";


export const GET_USERS_PAGINATED = gql`
    query UesrsByPagintion($page: Int!, $limit: Int!) {
        uesrsByPagintion(page: $page, limit: $limit) {
            message
            status
            totalCount
            data {
                _id
                userName
                email
                password
                role
                isConfirmed
                createdAt
            }
        }
    }
`;
