import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";
import styles from './styles/product.module.scss';
import { ShoppingCart } from "lucide-react";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [errMessage, setErrMessage] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const { logout } = useAuth();

  useEffect(() => {
    try {
      api.get(`/products?search=${search}&category=${category}&sort=${sort}`)
        .then((res) => setProducts(res.data));
    } catch (error) {
      setErrMessage('Something went wrong')
    }

  }, [search, category, sort]);

  useEffect(()=>{
    handleCartCount()
  },[])

  const handleLogout = () => {
    logout();
  }

  const handleCartCount = () => {
    api.get('/cart')
      .then((res) => { setCartCount(res.data.length) })
    //   .catch((err) => console.log("Unable to get cart items!!!", err));
  }

  return (
    <div className={styles.productSection}>
      <div className={styles.productTopsec}>
        <h2>Products</h2>
        <div className={styles.prodTopRight}>
          <div className={styles.cartBtn} onClick={() => navigate('/cart')}><ShoppingCart style={{ cursor: 'pointer' }} /> <span>{cartCount}</span></div>
          <button onClick={handleLogout}>Log out</button>
        </div>
      </div>


      <div className={styles.productFindSec}>
        <div className={styles.searchInp}>
          <input placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className={styles.filterCategory}>
          <select onChange={(e) => setCategory(e.target.value)}>
            <option value="">All</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
          </select>
        </div>
        <div className={styles.sortProducts}>
          <select onChange={(e) => setSort(e.target.value)}>
            <option value="">Sort</option>
            <option value="price_asc">Price ↑</option>
            <option value="price_desc">Price ↓</option>
          </select>
        </div>
      </div>

      <div className={styles.productListingContainer}>
        {products.length > 0 ? products.map((p) => (
          <ProductCard key={p.id} product={p} handleCartCount={handleCartCount} />
        )) : errMessage ? <div style={{ width: '100%', color: 'red', textAlign: 'center' }}>{errMessage}</div> : <Loader />
        }
      </div>
    </div>
  );
};

export default Products;
