import { gql } from "@apollo/client";


export const GET_MENUS_PAGINATION = gql`
    query MenusByPagination($page: Int!, $limit: Int!) {
        menusByPagination(page: $page, limit: $limit) {
            message
            status
            totalCount
            data {
                _id
                name
                descraption
                price
                stock
                discount
                finalPrice
                isAvailable
                createdAt
                image {
                    secure_url
                    public_id
                }
                categoryId {
                    _id
                    name
                }
                createdBy {
                    _id
                    userName
                }
            }
        }
    }
`