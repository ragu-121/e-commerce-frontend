import { useEffect, useState } from "react";
import api from "../api/axios";
import styles from './styles/cart.module.scss';

const Cart = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    api.get("/cart").then((res) => setItems(res.data));
  }, []);

  const placeOrder = async () => {
    await api.post("/orders");
    alert("Order placed");
  };

  return (
    <div>
      <h2>Cart</h2>
      <div className={styles.cartContainerDivider}>
        <div className={styles.cartLeftSec}>
          <div className={styles.ctProductimage}>
            <img src="" alt="" />
          </div>
          <div className={styles.ctProductDetails}>
            <p className={styles.prdName}>name</p>
            <p className={styles.prdprice}></p>
            <div>add | less</div>
          </div>
        </div>
        <div>

        </div>
      </div>
      {items.map((item) => (
        <p key={item.id}>
          Product ID: {item.product_id} | Qty: {item.quantity}
        </p>
      ))}
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
};

export default Cart;
