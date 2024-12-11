import React from "react";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import styles from './Success.module.css';
export function Success() {
    const navigate = useNavigate();

    return (
      <div className={styles["success"]}>
        <img src="/pizza.svg" alt="Изображение пиццы" />
        <div className={styles["text"]}>Ваш заказ успешно оформлен!</div>
        <Button appearence="big" onClick={() => navigate("/")}>
          Сделать новый
        </Button>
      </div>
    );
}