import React, { useState } from "react";
import "./App.css";
import { getChat } from "./utils/generateData";
export type ShopingItemType = {
  title: string;
  price: number;
  currency: string;
  date: string;
};
export interface INodeElement {
  firstName: string;
  lastName: string;
  age: number;
  birthDate: string;

  shoppingItemsList?: ShopingItemType[];
}
type Chat = {
  title: string;
  nodesList: INodeElement[];
};
// external data types
type Timestamp = {
  seconds: number;
  nanos: number;
};
type ExtShopingItemType = {
  Title: string;
  Price: number;
  Currency: string;
  Date: Timestamp;
};
interface IExtNodeElement {
  FirstName: string;
  LastName: string;
  Age: number;
  BirthDate: Timestamp;
  ShoppingItems: ExtShopingItemType[];
}
type ExtChat = {
  Title: string;
  ChatItems: IExtNodeElement[];
};

function App() {
  const convertDateStringToTimestamp = (date: string) => {
    const [day, month, year] = date.split("/");
    const dateObject = new Date(`${year}/${month}/${day}`);
    const dateInMs = dateObject.getTime();
    const timestamp: Timestamp = {
      seconds: dateInMs * 0.001, // 1 ms = 0.001s
      nanos: dateInMs * 1000000, // 1 ms = 1000000 ns
    };
    return timestamp;
  };
  const convertInternalToExtType = (chat: Chat) => {
    const chatItems: IExtNodeElement[] = [];
    chat.nodesList.forEach((nodeElement: INodeElement) => {
      const shoppingItems: ExtShopingItemType[] = [];
      nodeElement.shoppingItemsList?.forEach((shoppingItem: ShopingItemType) => {
        shoppingItems.push({
          Title: shoppingItem.title,
          Price: shoppingItem.price,
          Currency: shoppingItem.currency,
          Date: convertDateStringToTimestamp(shoppingItem.date),
        });
      });
      const extNodeElement: IExtNodeElement = {
        FirstName: nodeElement.firstName,
        LastName: nodeElement.lastName,
        Age: nodeElement.age,
        BirthDate: convertDateStringToTimestamp(nodeElement.birthDate),
        ShoppingItems: shoppingItems,
      };
      chatItems.push(extNodeElement);
    });
    const exChat: ExtChat = {
      Title: chat.title,
      ChatItems: chatItems,
    };
    return exChat;
  };
  const chat: Chat = getChat();
  const [convertResult, setConvertResult] = useState<ExtChat | null>(null);
  const handleClickConvert = () => {
    const chatAfterConvert = convertInternalToExtType(chat);
    setConvertResult(chatAfterConvert);
  };
  return (
    <div className="App">
      <div className="container">
        <div className="left">
          <h2>Truoc khi chuyen doi</h2>
          title: {`${chat.title}`}
          <ul>
            nodeList:
            {chat.nodesList.map((nodeElement) => {
              return (
                <li key={nodeElement.birthDate}>
                  <p>fistName: {nodeElement.firstName}</p>
                  <p>lastName: {nodeElement.lastName}</p>
                  <p>age: {nodeElement.age}</p>
                  <p>birthDate: {nodeElement.birthDate}</p>
                  <ul>
                    ShoppingItemsList:
                    {nodeElement.shoppingItemsList?.map((item) => {
                      return (
                        <li key={item.title}>
                          <p>title: {item.title}</p>
                          <p>price: {item.price}</p>
                          <p>currency: {item.currency}</p>
                          <p>date: {item.date}</p>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="right">
          <h2>Sau khi chuyen doi</h2>
          title: {`${convertResult?.Title}`}
          <ul>
            ChatItems:
            {convertResult?.ChatItems.map((nodeElement) => {
              return (
                <li key={nodeElement.BirthDate.seconds}>
                  <p>FistName: {nodeElement.FirstName}</p>
                  <p>LastName: {nodeElement.LastName}</p>
                  <p>Age: {nodeElement.Age}</p>
                  <p>BirthDate: </p>
                  <p>Seconds: {nodeElement.BirthDate.seconds}</p>
                  <p>Nanos: {nodeElement.BirthDate.nanos}</p>
                  <ul>
                    ShoppingItemsList:
                    {nodeElement.ShoppingItems.map((item) => {
                      return (
                        <li key={item.Title}>
                          <p>Title: {item.Title}</p>
                          <p>Price: {item.Price}</p>
                          <p>Currency: {item.Currency}</p>
                          <p>Timestamp:</p>
                          <p>Seconds: {item.Date.seconds}</p>
                          <p>Nanos: {item.Date.nanos}</p>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <button
        onClick={() => {
          handleClickConvert();
        }}
        id="convert-btn"
      >
        Click to convert
      </button>
    </div>
  );
}

export default App;
