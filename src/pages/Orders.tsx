import { useEffect, useState } from "react";
import api from "../api/axios";

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    api.get("/orders").then((res) => setOrders(res.data));
  }, []);

  return (
    <div>
      <h2>My Orders</h2>
      {orders.map((o) => (
        <div key={o.id}>
          <p>Order #{o.id}</p>
          <p>Status: {o.status}</p>
        </div>
      ))}
    </div>
  );
};

export default Orders;
