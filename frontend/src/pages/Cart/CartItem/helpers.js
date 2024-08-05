export const isInCart = (products, cartItems) => {
    return cartItems.find(item => item.id === products.id);
   
}