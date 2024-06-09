import React, { useEffect, useState } from "react";
import "../styles/App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../components/partial/Header/Header";
import Newsletter from "../components/Newsletter/Newsletter";
import Photos from "../components/Photos/Photos";
import HeaderLogin from "../components/partial/HeaderLogin/HeaderLogin";

interface Product {
  _id: string;
  name: string;
  image: string;
  price: string;
  description: string;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // State for user login status

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `https://application-web-backend.onrender.com/api/v1/products`
        );
        setProducts(response.data.data.products);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const carouselInterval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide + 1 >= Math.ceil(products.length / 4) ? 0 : prevSlide + 1
      );
    }, 5000);

    return () => {
      clearInterval(carouselInterval);
    };
  }, [products.length]);

  useEffect(() => {
    // Check if the user is logged in by checking the presence of a token in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="App">
      {isLoggedIn ? <HeaderLogin /> : <Header />}
      <main>
        <section className="main-module">
          <div
            className="slide"
            style={{ transform: `translateX(${-currentSlide * 100}%)` }}
          >
            <img
              className="main-module-img"
              alt=""
              src={process.env.PUBLIC_URL + "/home_01_module.webp"}
            />
            <img
              className="main-module-img"
              alt=""
              src={process.env.PUBLIC_URL + "/home_02_module.webp"}
            />
          </div>
        </section>
        <Photos />
        <section className="products-module">
          <h2 className="products-module-title">NOTRE SÉLECTION VITAMINÉE</h2>
          <div className="product-carousel">
            <div
              className="product-carousel-container"
              style={{ transform: `translateX(${-currentSlide * (100 / 4)}%)` }}
            >
              {products.map((product) => (
                <div key={product._id} className="product-carousel-slide">
                  <Link to={`/products/${product._id}`}>
                    <div className="product-img-container">
                      <img
                        src={`data:image/jpeg;base64,${product.image}`}
                        alt={product.name}
                      />
                    </div>
                  </Link>
                  <div className="product-container">
                    <div className="product-info">
                      <h3 className="products-module-text">{product.name}</h3>
                      <p className="product-separator">____</p>
                      <span className="product-price">{product.price} €</span>
                    </div>
                    <span className="product-description">
                      {product.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Newsletter />
      </main>
    </div>
  );
}

export default App;
