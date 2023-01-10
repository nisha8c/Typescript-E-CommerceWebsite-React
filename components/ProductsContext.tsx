import React, { createContext, useContext } from "react";
import useLocalStorageState from 'use-local-storage-state';

type ProductsContextProviderProps = {
    children: React.ReactNode;
};

export const ProductsContext = createContext({});

export function useShoppingCart() {
    return useContext(ProductsContext);
}

export function ProductsContextProvider({ children }: ProductsContextProviderProps) {

  const [selectedProducts, setSelectedProducts] = useLocalStorageState('cart', {defaultValue:[]});
  return (
    <ProductsContext.Provider value={{selectedProducts, setSelectedProducts}}>
        {children}
    </ProductsContext.Provider>
  );
}