import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function UpdateProduct() {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompany] = React.useState("");
  const params = useParams();

  const handleUpdateProduct = async () => {
    let result = await fetch(`https://e-dashboard-darshansanghavi.onrender.com/${params.id}`, {
      method: "put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`

      },
    });
    result = await result.json();
    console.log(result);
  };
  useEffect(() => {
    const updateProductDetails = async () => {
      let result = await fetch(`https://e-dashboard-darshansanghavi.onrender.com/${params.id}`,{
        headers:{
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      result = await result.json();
      setName(result.name);
      setCategory(result.category);
      setCompany(result.company);
      setPrice(result.price);
    };
    updateProductDetails();
  },[params.id]);



  return (
    <div className="register">
      <h1>Update Product</h1>
      <input
        type="text"
        className="inputBox"
        placeholder="Enter Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        className="inputBox"
        placeholder="Enter  Price Of Product"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="text"
        className="inputBox"
        placeholder="Enter Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="text"
        className="inputBox"
        placeholder="Enter Company Name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <button onClick={handleUpdateProduct} className="appbutton">
        Update Product
      </button>
    </div>
  );
}
