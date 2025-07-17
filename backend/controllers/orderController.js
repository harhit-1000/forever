import orderModel from '../model/orderModel.js';
import userModel from '../model/userModel.js';

// placing order using Cod method

const placeOrder  = async (req, res) => {
  try {
    console.log("Placing order with data:");
    const {items, amount, address} = req.body;
    const userId = req.userId;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: 'COD',
      payment: false,
      date: Date.now(),
    }
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId,{cartData:{}})
    res.json({success: true , message:"Order Placed"});
  } catch (error) {
    console.log(error);
    res.json({success:false, message:error.message});
  }
}

// placing order using Stripe method

const placeOrderStripe  = async (req, res) => {

}

// placing order using razorpay method

const placeOrderRazorPay  = async (req, res) => {

}

// 

// All orders data for admin panel

const allOrders = async (req, res) =>{

}

//  All Order Data for Frontend 

const userOrders = async (req, res) =>{

}

// update Orders status from admin panel

const updateStatus = async ()=>{

  

}

export {placeOrder, placeOrderStripe, placeOrderRazorPay, allOrders, userOrders, updateStatus};