import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ProductDetail.css";
import Header from "../components/partial/Header/Header";
import Newsletter from "../components/Newsletter/Newsletter";
import Photos from "../components/Photos/Photos";

interface Product {
  _id: string;
  name: string;
  image: string;
  price: string;
  description: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/products/${id}`
        );
        setProduct(response.data.data.product);
      } catch (err) {
        setError("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>No product found</div>;
  }

  return (
    <div className="App">
      <Header />
      <div className="product-detail-container">
        <div className="product-detail">
          <img
            src={`data:image/jpeg;base64,${product.image}`}
            alt={product.name}
          />
          <div className="product-info-market">
            <h1>{product.name}</h1>
            <p>Description : {product.description}</p>
            <p>Prix : {product.price} €</p>
          </div>
        </div>
      </div>
      <Photos />
      <Newsletter />
    </div>
  );
};

export default ProductDetail;
