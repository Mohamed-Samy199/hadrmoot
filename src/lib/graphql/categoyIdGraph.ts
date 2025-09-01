import { gql } from "@apollo/client";

export const GET_CATEGORY_BY_ID = gql`
query GetCategoryById($id: ID!) {
    getCategoryById(id: $id) {
        message
        status
        data {
            _id
            name
            createdBy
            updatedBy
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
