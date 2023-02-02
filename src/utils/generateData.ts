import { INodeElement, ShopingItemType } from "../App"

const shoppingItems: ShopingItemType[]= [{
    title: "Ao so mi",
    price: 20000,
    currency: 'VND',
    date: "23/07/2022"
}]
const nodeList: INodeElement[] = [{
    firstName: "Luc",
    lastName: "Vu",
    age: 22,
    birthDate: "11/08/2000",
    shoppingItemsList: shoppingItems
}]
export const getChat = () => {
    return {
        title: "List danh sach khach hang va san pham ho mua",
        nodesList: nodeList
    }
}