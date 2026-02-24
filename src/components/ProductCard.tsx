import api from "../api/axios";
import styles from './styles/productCard.module.scss';

const ProductCard = ({ product, handleCartCount }: any) => {
  const addToCart = async () => {
    await api.post("/cart/add", {
      productId: product.id,
      quantity: 1
    });
    handleCartCount();
    alert("Added to cart");
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.productImageView}>
        <img src={`http://localhost:5000${product.image_url}`} alt={product.name} />
      </div>
      <div className={styles.produceInfocard}>
        <h4>{product.name}</h4>
        <p>₹ {product.price}</p>
        <button onClick={addToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
