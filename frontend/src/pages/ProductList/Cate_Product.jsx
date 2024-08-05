import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Slide from '../../../component/Slide';
import NavbarCol from '../../../component/NavbarCol';



function Cate_Product() {
  const {categoryId} = useParams()
  const[products, setProduct] = useState([])

  useEffect(() => {
    fetchProductsByCategory();
  }, [categoryId]);

  const fetchProductsByCategory = () => {
    axios
      .get(`http://localhost:3001/getcategories/${categoryId}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <>
    <Slide/>
    <div class="flex">
      <div class="w-1/4 ml-5">
        <NavbarCol/>
      </div>
      <div className='w-3/4 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 shadow-xl bg-blue-50 product-list'>
        {products.map(item => {
          return(
              <div className="my-9 py-6 mx-12" >
                <Link to={`/productdetail/${item._id}`}  key={item._id} >
              <div class='w-52 h-72 '>
                <img className="border-2 border-cyan-800 w-fit h-[18rem]" src={item.imagePro}/>
                <h2 className='text-center text-cyan-800 uppercase font-bold'> {item.namePro} </h2>
                <h1 className='text-center text-cyan-800 uppercase font-bold'>Giá: {item.price} VNĐ</h1>
              </div>
              </Link> 
            </div>
          )
        })}
         
      </div>
    
    </div>
    </>
  
  )
}

export default Cate_Product