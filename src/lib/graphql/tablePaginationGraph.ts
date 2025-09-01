import { gql } from "@apollo/client";


export const GET_TABLES_PAGINATION = gql`
    query TableListByPagination($page: Int!, $limit: Int!) {
        tableListByPagination(page: $page, limit: $limit) {
            message
            status
            totalCount
            data {
                _id
                tableNumber
                qrcode
                active
                createdAt
            }
        }
    }
`;
