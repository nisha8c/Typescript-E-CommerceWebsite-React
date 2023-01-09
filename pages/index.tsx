
import React, { useEffect, useState } from 'react';
import { ProductsData } from '../types/types';
import Product from '../components/Product';

export default function Home() {

  const [products, setProducts] = useState<ProductsData[]>([]);
  const [filter, setFilter] = useState(products);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    };
    getData();
  }, []);

  const filterProduct = (cat: string) => {
    const updatedList = () => products.filter((product) => product.category === cat);
    setFilter(updatedList);
  };

  return (
    <section>
      <div className='buttons'>
          <button className='btn' type='submit' onClick={() => setFilter(products)}>All</button>
          <button className='btn' type='submit' onClick={() => filterProduct("mobiles")}>Mobiles</button>
          <button className='btn' type='submit' onClick={() => filterProduct("ear-phones")}>Ear Phones</button>
          <button className='btn' type='submit' onClick={() => filterProduct('mobile-case')}>Mobile Cases</button>
          <button className='btn' type='submit' onClick={() => filterProduct('charger')}>Chargers</button>
      </div>

      <div>
        {filter.map(product => (
          <div key={product.toString()}>
            
            <Product data={product}/>
              
          </div>
        ))}
      </div>
        
    </section>
  );
}
