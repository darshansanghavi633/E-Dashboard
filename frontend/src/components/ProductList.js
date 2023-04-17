import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const navigate = useNavigate();

  const getProducts = async () => {
    let result = await fetch("https://e-dashboard-darshansanghavi.onrender.com/products",{
      headers:{
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    setProducts(result);
  };

  const deleleProduct = async (id) => {
    let result = await fetch(`https://e-dashboard-darshansanghavi.onrender.com/product/${id}`, {
      method: "delete",
      headers:{
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };
  const updateProduct = (id) => {
    navigate(`/update/${id}`);
  };
  const handleSearch = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`https://e-dashboard-darshansanghavi.onrender.com/search/${key}`,{
        headers:{
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      }); 
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };
  return (
    <div className="product-list">
      <h1>Product list</h1>
      <input
        type="text"
        placeholder="Search to get details"
        className="searchTab"
        onChange={handleSearch}
      ></input>
      <ul>
        <li>
          <i>
            <b>SR. No</b>
          </i>
        </li>
        <li>
          <i>
            <b>Name</b>
          </i>
        </li>
        <li>
          <i>
            <b>Price</b>
          </i>
        </li>
        <li>
          <i>
            <b>Category</b>
          </i>
        </li>
        <li>
          <i>
            <b>Company</b>
          </i>
        </li>
        <li>
          <i>
            <b>Operation</b>
          </i>
        </li>
      </ul>
      { products.length>0 ? products.map((item, index) => (
        <ul key={item._id}>
          <li>{index + 1}</li>
          <li>{item.name}</li>
          <li>{item.price}</li>
          <li>{item.category}</li>
          <li>{item.company}</li>
          <li>
            <button
              onClick={() => deleleProduct(item._id)}
              className="delButton"
            >
              Delete
            </button>
            <button
              onClick={() => updateProduct(item._id)}
              className="delButton"
            >
              Update
            </button>
          </li>
        </ul>

      ))
    :
    <h1>No Result Found </h1>
    }
    </div>
  );
}
