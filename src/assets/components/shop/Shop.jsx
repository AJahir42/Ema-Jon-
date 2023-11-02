import React, { useEffect, useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';

const Shop = () => {
    const [products,setProducts]=useState([])

    const [cart,setCart]=useState([])

    useEffect(()=>{

        fetch('products.json')
        .then(res=>res.json())
        .then(data=>setProducts(data))
    },[])

    useEffect(()=>{
        // console.log('products', products)
        /*eikhane products ta console log nao hote pare because products ta load hoy useEffect theke ,ar etao 
        useEffect e ase, both of the are asynchronus. Tai akta dependecy set kore dite hobe, then console logito 
        hobe*/ 
        const storedCart=getShoppingCart()
        const savedCart=[]

        // step-1 get id 
        for(const id in storedCart){
            // step-2: get the product by using id
            const addedProduct=products.find(product=>product.id===id)
            // console.log(addedProduct)
            // step-3: get & set quantity of the product
            if(addedProduct){
                const quantity=storedCart[id];
                addedProduct.quantity=quantity;
            //step-4: add the addedproduct to the savedcart
                savedCart.push(addedProduct)
                
            }
            // console.log(addedProduct)
        }
        // step-5 Set the cart
        setCart(savedCart)

    },[products])

    const handleAddToCart=(product)=>{
        let newCart=[];

        // const newCart=[...cart,product]
        const exists=cart.find(pd=>pd.id===product.id);
        if(!exists){
            product.quantity=1;
            newCart=[...cart,product]
        }
        else{
            exists.quantity=exists.quantity+1;
            const remaining=cart.filter(pd=>pd.id !==product.id);
            newCart=[...remaining,exists];
        }
        setCart(newCart)

        addToDb(product.id)
    }


    return (
        <div className='shop-container'>
            <div className='products-container'>
                {
                  products.map(product=><Product
                  key={product.id}
                  product={product}
                  handleAddToCart={handleAddToCart}
                  ></Product>)  
                }
            </div>
            <div className='cart-container'>
               <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;