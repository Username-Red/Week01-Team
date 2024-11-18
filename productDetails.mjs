function addProductToCart(product) {
    //Clearly this function was incomplete because it would overwrite the localstorage cart
    //So let's fix it
    // Attempt to parse existing cart data or set it to an empty array if parsing fails
    let cart = JSON.parse(localStorage.getItem("so-cart"));

    // If `cart` is not an array, reinitialize it as an empty array
    if (!Array.isArray(cart)) {
    cart = [];
    }

    // Add the new product to the cart array
    cart.push(product);

    // Save the updated cart array back to localStorage
    localStorage.setItem("so-cart", JSON.stringify(cart));
};