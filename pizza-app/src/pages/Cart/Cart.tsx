import React, { useEffect, useState } from "react";
import Heading from "../../components/Heading/Heading";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store'
import CartItem from "../../components/CartItem/CartItem";
import { IProduct } from '../../interfaces/product.interface'
import axios from "axios";
import { PREFIX } from "../../helpers/API";


export function Cart() {
  const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
  const items = useSelector((s: RootState) => s.cart.items);


  const getItem = async (id: number) => {
    const { data } = await axios.get<IProduct>(`${PREFIX}/products/${id}`);
    return data;
  };

  const loadAllItems = async () => {
    const res = await Promise.all(items.map(i => getItem(i.id)));
    setCartProducts(res);
  }

  useEffect(() => {
    loadAllItems();
  }, [items]);

  return (
    <>
      <Heading>Корзина</Heading>
      {items.map((i) => {
        const product = cartProducts.find((p) => p.id === i.id);
       if (!product) {
         return; 
       }
        return <CartItem key={product.id} count={i.count} {...product} />;
      })}
    </>
  );
}

