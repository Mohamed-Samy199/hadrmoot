import { gql } from "@apollo/client";


export const GET_MENU_BY_ID = gql`
    query MenuById($id: ID!) {
        menuById(id: $id) {
            message
            status
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
                createdBy {
                    _id
                    userName
                }
                categoryId {
                    _id
                    name
                }
            }
        }
    }
`