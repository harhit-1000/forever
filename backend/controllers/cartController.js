import userModel from "../model/userModel.js";

// add products to user cart

const addToCart = async (req, res) =>{
  try {
    const { itemId, size } = req.body;
    const userId = req.userId;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    if(cartData[itemId])
    {
      if(cartData[itemId][size])
      {
        cartData[itemId][size] += 1;

      }
      else{
      cartData[itemId][size] = 1;

      }
    }
    else{
      cartData[itemId] = {} ;
      cartData[itemId][size] = 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData});

    res.json({success: true, message:"Product added to Cart Successfully"})

  } catch (error) {
    console.log(error);
    res.json({success: false, message: "Error in adding product to cart"});

  }

}

//  update user cart
const updateCart = async (req, res) =>{
  try {
    const { itemId, size, quantity} = req.body;
    const userId = req.userId;

    const userData = await userModel.findById(userId);
    const cartData = await userData.cartData;

    cartData[itemId][size]  = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({success: true, message: "Cart updated successfully"});
  } catch (error) {
    console.log(error);
    res.json({success: false, message: "Error in adding product to cart"});
  }

}

// get user cart data
const getUserCart = async (req, res) =>{
  try { 
    const userId = req.userId;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    res.json({success: true, cartData});

  }
  catch (error) {
    console.log(error);
    res.json({success: false, message: "Error in getting user cart data"});
  }

}

export { addToCart, updateCart, getUserCart };