
import React, { useState } from 'react';
import Head from 'next/head';
import { ProductsData } from '../types/types';
import {initMongoose} from "../lib/mongoose";
import { findAllProducts } from "./api/products";
import ScrollToTop from "react-scroll-to-top";
import { Toaster } from 'react-hot-toast';

import Product from '../components/Product';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Basket from '../components/Basket';


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
      <>
      <Toaster /> {/* Toaster should be at top */}
      <Head>
        <title>TS Shop By Nisha</title>
      </Head>

      <Header />

      <Basket />

      <ScrollToTop smooth={true} width='25' height='25' top={15}/>

      <div className='search-container'>
        <input value={phrase} onChange={e => setPhrase(e.target.value)} type="text" placeholder="Search by Product Name..." className="bg-gray-200 w-full py-2 px-4 rounded-xl"/>
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

      <Footer />
      </>
  
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
