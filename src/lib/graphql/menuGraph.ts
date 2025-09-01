import { gql } from "@apollo/client";


export const GET_MENUS = gql`
    query MenuList {
        menuList {
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