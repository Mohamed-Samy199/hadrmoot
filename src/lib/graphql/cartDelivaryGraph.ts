import { gql } from "@apollo/client";

export const GET_CART_DELIVARY = gql`
  query CartList($authorization: String!) {
    cartList(authorization: $authorization) {
      status
      message
      totalOfCarItems
      data {
        _id
        userId
        tableNumber
        createdAt
        menus {
          _id
          quntity
          menuId {
            _id
            name
            finalPrice
            image {
              secure_url
            }
            categoryId {
              _id
              name
            }
          }
        }
      }
    }
  }
`;


export type CartItem = {
  _id: string;
  quntity: number;
  menuId: {
    _id: string;
    name: string;
    finalPrice: number;
    image: { secure_url: string };
    categoryId: { name: string };
  };
};


