import React, { MouseEvent } from 'react';
import styles from './ProductCard.module.css';
import { ProductCardProps } from './ProductCard.props';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispath } from '../../store/store';
import { cartActions } from '../../store/cart.slice';


function ProductCard(props: ProductCardProps) {
  const dispatch = useDispatch<AppDispath>();

  const add = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(cartActions.add(props.id));
  }

    return (
      <Link to={`/product/${props.id}`} className={styles["link"]}>
        <div className={styles["card-wrapper"]}>
          <div
            className={styles["head"]}
            style={{ backgroundImage: `url('${props.image}')` }}
          >
            <div className={styles["price"]}>
              {props.price}&nbsp;
              <span className={styles["currency"]}>₽</span>
            </div>
            <button className={styles["add-to-cart"]} onClick={add}>
              <img src="/cart-button-icon.svg" alt="Добавить в корзину" />
            </button>
            <div className={styles["rating"]}>
              {props.rating}
              <img src="/star-icon.svg" alt="Иконка звезды" />
            </div>
          </div>
          <div className={styles["footer"]}>
            <div className={styles["title"]}>{props.name}</div>
            <div className={styles["description"]}>{props.description}</div>
          </div>
        </div>
      </Link>
    );
}

export default ProductCard;

