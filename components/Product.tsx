import React from 'react';
import { ProductsData } from '../types/types';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../redux/basketSlice';
import toast from 'react-hot-toast';
import { ShoppingCartIcon } from "@heroicons/react/outline";

interface IProductComponentProps {
    data: ProductsData
}

const Product = ({data}: IProductComponentProps) => {

    const dispatch = useDispatch();

    const addProductToCart = () => {
      
      dispatch(addToBasket(data));
      toast.success(`${data.name} added to basket`, {
        position: "bottom-center",
      });
      
    };

    return(
        <>
          <div className="p-5">
              
            <div className="flex -mx-2">

              <div key={data.name.toString()} className="px-5 snap-start">
                <div className="w-52">
                  <div className="bg-blue-100 p-5 rounded-xl">
                    <Image src={data.picture.toString()} alt="" priority width={200} height={200}/>
                  </div>

                  <div className="mt-2">
                    <h3 className="font-bold text-lg">{data.name}</h3>
                  </div>

                  <p className="text-sm mt-1 leading-4 text-gray-500">{data.description}</p>

                  <div className="flex mt-1">
                    <div className="text-2xl font-bold grow">$ {data.price.toString()}</div>
                    <button onClick={addProductToCart} className="bg-emerald-400 text-white py-1 px-3 rounded-xl">Add to Cart</button>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
          
        </>
    );
};

export default Product;