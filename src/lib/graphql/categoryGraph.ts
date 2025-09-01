import { gql } from "@apollo/client";


export const GET_CATEGORIES = gql`
    query Categories {
        categories {
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
export type MenuItemType = {
    _id: string;
    name: string;
    descraption: string;
    price: number;
    stock?: number;
    discount: number;
    finalPrice: number;
    createdAt?: string;
    image: {
        secure_url: string;
    }
}
export type CategoryType = {
    _id: string;
    name: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    menu: MenuItemType[]
}