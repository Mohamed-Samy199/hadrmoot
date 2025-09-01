import { gql } from "@apollo/client";

export const GET_CATEGORIES_PAGINATED = gql`
    query CategoriesByPagination($page: Int!, $limit: Int!) {
        categoriesByPagination(page: $page, limit: $limit) {
            message
            status
            totalCount
            data {
                _id
                name
                createdAt
                menu {
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
                }
            }
        }
    }
`;
