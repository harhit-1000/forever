import orderModel from '../model/orderModel.js';
import userModel from '../model/userModel.js';
import Stripe from 'stripe'
import razorpay from "razorpay"
// global variables
const currency = 'usd';
const inrcurrency = 'inr';
const deliveryCharges = 10;

// gateway intialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret : process.env.RAZORPAY_KEY_SECRET
});


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
  try {
    const {items, amount, address} = req.body;
    const userId = req.userId;

    const { origin } =req.headers;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: 'Stripe',
      payment: false,
      date: Date.now(),
    }

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item)=>({
      price_data:{ 
        currency:currency,
        product_data:{
          name:item.name,
        },
        unit_amount:item.price*100
      },
      quantity: item.quantity,
    }))

    line_items.push({
      price_data:{
        currency:currency,
        product_data:{
          name:'Delivery Charges',
        },
        unit_amount:deliveryCharges*100
      },
      quantity: 1,
    })
    
    const session = await stripe.checkout.sessions.create({
  success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
  cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
  line_items,
  mode:'payment',
    });

    res.json({success:true, session_url: session.url});



  } catch (error) {
     console.log(error);
     res.json({success:false, message:error.message});
  }
}

// verify stripe

const verifyStripe = async (req, res) => {
  const {orderId, success} = req.body;
  const userId = req.userId;

  try{
    if(success === "true") {
      await orderModel.findByIdAndUpdate(orderId, {payment:true});
      await userModel.findByIdAndUpdate(userId, {cartData: {}})
      res.json({success: true});
    } else {
      await orderModel.findByIdAndDelete(orderId);
        res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.json({success:false, message:error.message});

  }
}

// placing order using razorpay method

const placeOrderRazorPay  = async (req, res) => {
    try {

      const {items, amount, address} = req.body;
    const userId = req.userId;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: 'Razorpay',
      payment: false,
      date: Date.now(),
    }

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const options = {
      amount: amount*100,
      currency: "INR",
      receipt: newOrder._id.toString()
    }
    
    await razorpayInstance.orders.create(options, (error, order)=>{
      if(error) {
        console.log(error);
        return res.json({success:  false, message: error.message});
      }
      res.json({success: true,order});
    })

    } catch (error) {
      console.log(error);
      res.json({success:false, message:error.message});
    }
}

// verify razorpay

const verifyRazorpay = async (req, res) =>{
  try {
    const {razorpay_order_id} = req.body
    const userId = req.userId;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if(orderInfo.status === 'paid') {
      await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true});
      await userModel.findByIdAndUpdate(userId,{cartData:{}});
      res.json({success: true, message: "payment successful"});
    } else {
      res.json({success: false, message: 'payment Failed'});
    }
  } catch (error) {
    console.log(error);
    res.json({success:false, message: error.message});
  }
}

// All orders data for admin panel

const allOrders = async (req, res) =>{
  try {
    
    const orders = await orderModel.find({});
    res.json({success:true, orders});
  } catch (error) {
    console.log(error);
    res.json({success:false, message: error.message});
  }

}

//  All Order Data for Frontend 

const userOrders = async (req, res) =>{
 try {
  const userId = req.userId;
  const orders = await orderModel.find({userId});
  res.json({success:true, orders});
 } catch (error) {
  console.log(error);
  res.json({success:false, message: error.message});
 }
}

// update Orders status from admin panel

const updateStatus = async (req, res)=>{
  
 try {
  const {orderId, status} = req.body;

  await orderModel.findByIdAndUpdate(orderId, {status});
  res.json({success:true, message:"Status Updates"});


 } catch (error) {
  console.log(error);
  res.json({success:false, message: error.message});
 }
  

}

export {verifyRazorpay, verifyStripe, placeOrder, placeOrderStripe, placeOrderRazorPay, allOrders, userOrders, updateStatus};