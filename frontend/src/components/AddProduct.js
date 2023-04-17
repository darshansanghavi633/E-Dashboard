import React from 'react'

export default function AddProduct() {
    const [name,setName]= React.useState('');
    const [price,setPrice]= React.useState('');
    const [category,setCategory]= React.useState('');
    const [company,setCompany]= React.useState('');
    const [error,setError]=React.useState(false);

    const handleAddProduct = async ()=>{

        if(!name || !category || !price || !company){
            setError(true);
            return false;
        }
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("https://e-dashboard-darshansanghavi.onrender.com/product",{
          method:"post",
          body:JSON.stringify({name,price,category,company,userId}),
          headers:{
            'Content-Type':'application/json',
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`

          },
        })
        result = await result.json();
        console.log(result)

    }
  return (
    <div className='register'>
      <h1>Add Product</h1>
      <input type="text" className="inputBox" placeholder='Enter Product Name' value={name} onChange={(e)=>setName(e.target.value)} />
      { error && !name && <span className='valid-input'>Enter valid credentials</span>}
      <input type="text" className="inputBox" placeholder='Enter  Price Of Product' value={price} onChange={(e)=>setPrice(e.target.value)}/>
      { error && !price && <span className='valid-input'>Enter valid credentials</span>}
      <input type="text" className="inputBox" placeholder='Enter Category' value={category} onChange={(e)=>setCategory(e.target.value)} />
      { error && !category && <span className='valid-input'>Enter valid credentials</span>}
      <input type="text" className="inputBox" placeholder='Enter Company Name' value={company} onChange={(e)=>setCompany(e.target.value)}/>
      { error && !company && <span className='valid-input'>Enter valid credentials</span>}
      <button onClick={handleAddProduct} className='appbutton'>Add Product</button>
    </div>
  )
}
