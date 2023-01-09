import React from 'react';
import { ProductsData } from '../types/types';
import Image from 'next/image';

interface IProductComponentProps {
    data: ProductsData
}

const Product = ({data}: IProductComponentProps) => {
    return(
        <>
          <div className="p-5">
              
            <div className="flex -mx-2">

              <div key={data.name.toString()} className="px-5 snap-start">
                <div className="w-52">
                  <div className="bg-blue-100 p-5 rounded-xl">
                    <Image src={data.picture.toString()} alt="" width={200} height={200}/>
                  </div>

                  <div className="mt-2">
                    <h3 className="font-bold text-lg">{data.name}</h3>
                  </div>

                  <p className="text-sm mt-1 leading-4 text-gray-500">{data.description}</p>

                  <div className="flex mt-1">
                    <div className="text-2xl font-bold grow">$ {data.price.toString()}</div>
                    <button className="bg-emerald-400 text-white py-1 px-3 rounded-xl">Add to Cart</button>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </>
    );
};

export default Product;