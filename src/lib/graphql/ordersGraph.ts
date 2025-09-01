import { gql } from "@apollo/client";

export const GET_ORDERS = gql`
    query OrderList {
    orderList {
        message
        status
        data {
            _id
            userId {
                userName
                _id
            }
            tableNumber
            count
            reason
            tabelId
            phoneCustom
            address
            details
            note
            supTotale
            finalPrice
            paymentType
            status
            updatedBy
            createdAt
            menus {
                _id
                quntity
                menu {
                    _id
                    name
                    price
                    stock
                    discount
                    finalPrice
                    isAvailable
                    createdAt
                    image {
                        secure_url
                    }
                }
            }
            source
        }
    }
}
`