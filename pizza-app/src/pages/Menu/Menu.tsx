import Headling from "../../components/Heading/Headlling";
import Search from "../../components/Search/Search";
import { PREFIX } from "../../helpers/API";
import styles from './Menu.module.css';
import { IProduct } from "../../interfaces/product.interface";
import { useEffect, useState } from 'react';
import axios, { AxiosError } from "axios";
import { MenuList } from "./MenuList/MenuList";

  export function Menu() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();

    const getMenu = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get<IProduct[]>(`${PREFIX}/products`);
        setProducts(data);
        setIsLoading(false);
        } catch (e) {
        console.error(e);
        if (e instanceof AxiosError) {
          setError(e.message);
        }
        setIsLoading(false);
        return;
      }
    };

    useEffect(() => {
      getMenu();
    }, []);

  return (
    <>
      <div className={styles["head"]}>
        <Headling>Меню</Headling>
        <Search placeholder="Введите блюдо или состав" />
      </div>
      <div>
        {error && <>{error}</>}
        {!isLoading && <MenuList products={products} />}
        {isLoading && <>Загружаем продукты...</>}
      </div>
    </>
  );
}

export default Menu;