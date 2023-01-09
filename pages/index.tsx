
import React, { useEffect, useState } from 'react';
import { ProductsData } from '../types/types';
import Product from '../components/Product';
import {initMongoose} from "../lib/mongoose";
import { findAllProducts } from "./api/products";

interface IProductComponentProps {
  products: ProductsData[]
}

export default function Home({products}: IProductComponentProps) {

  const [filter, setFilter] = useState(products);
  const [phrase,setPhrase] = useState('');


  const filterProduct = (cat: string) => {
    const updatedList = () => products.filter((product) => product.category === cat);
    setFilter(updatedList);
  };

  let productInfo;
  if (phrase) {
    productInfo = filter.filter(p => p.name.toLowerCase().includes(phrase));
  } else {
    productInfo = filter;
  }

  return (
    <section>

      <div className='search-container'>
        <input value={phrase} onChange={e => setPhrase(e.target.value)} type="text" placeholder="Search for products..." className="bg-gray-200 w-full py-2 px-4 rounded-xl"/>
      </div>

      <div className='buttons'>
          <h2 className="text-2xl py-5 capitalize p-2">Filter Products By Category</h2>
          <button className='btn' type='submit' onClick={() => setFilter(products)}>All</button>
          <button className='btn' type='submit' onClick={() => filterProduct("mobiles")}>Mobiles</button>
          <button className='btn' type='submit' onClick={() => filterProduct("ear-phones")}>Ear Phones</button>
          <button className='btn' type='submit' onClick={() => filterProduct('mobile-case')}>Mobile Cases</button>
          <button className='btn' type='submit' onClick={() => filterProduct('charger')}>Chargers</button>
      </div>

      <div className='products-container'>
        {productInfo.map(product => (
          <>      
            <div key={product.name.toString()} className="flex -mx-5">
              <div key={product.toString()} className="px-5 snap-start">
                <Product data={product}/>
              </div>
            </div> 
          </>
        ))}
      </div>
        
    </section>
  );
}

export async function getServerSideProps() {
  await initMongoose();
  const products = await findAllProducts();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
