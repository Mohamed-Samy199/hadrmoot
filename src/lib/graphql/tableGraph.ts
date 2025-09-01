import { gql } from "@apollo/client";


export const GET_TABLE = gql`
    query TableList {
        tableList {
            message
            status
            data {
                _id
                tableNumber
                qrcode
                createdAt
                
            }
        }
    }
`