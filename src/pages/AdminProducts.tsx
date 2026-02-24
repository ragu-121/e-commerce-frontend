import api from "../api/axios";
import { useState, useEffect } from "react";
import styles from './styles/addProducts.module.scss';

const AdminProducts = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [productCategory, setproductCategory] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const productCategoryValues = ['Electronics','Mobiles','sports','Furniture','Fashion'];

  // Generate preview when image changes
  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    // Cleanup to avoid memory leaks
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const addProduct = async () => {
    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append('description',description);
    formData.append("category", productCategory);
    formData.append("image", image);

    try {
      await api.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product added");   

      // Reset form
      setName("");
      setPrice("");
      setImage(null);
      setPreview(null);
    } catch {
      alert("Failed to add product");
    }
  };

  return (
    <div className={styles.addProductContainer}>
      <h2>Admin – Add Product</h2>

    <div className={styles.inpelem}>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
    <div className={styles.inpelem}>
      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
    </div>
     <div className={styles.inpelem}>
      <textarea name="description" placeholder="Enter description"  onChange={(e) => setDescription(e.target.value)}></textarea>
    </div>

    <div className={styles.inpelem}>
      <select name="producttype" value={productCategory} onChange={(e)=>setproductCategory(e.target.value)}>
        <option value="" disabled>select</option>
        {
          productCategoryValues.map((item)=>(
            <option key={item} value={item}>{item}</option>
          ))
        }
      </select>
    </div>

<div className={styles.uploadFile}>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            setImage(e.target.files[0]);
          }
        }}
      />
      <span>Click to Add</span>
</div>

      {/* IMAGE PREVIEW */}
      {preview && (
        <div className={styles.previewProduct}>
          <img
            src={preview}
            alt="Preview"
          />
        </div>
      )}

      <button className="primarybtn" onClick={addProduct}>Add</button>
    </div>
  );
};

export default AdminProducts;
