import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {

  const token = req.headers.token;

  if(!token || typeof token !== 'string'){
    return res.json({success: false, message: 'Not authorized Login again'});
  }

  try{

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = token_decode.id;
    next();


  } catch(error) {

    console.error(error);
    res.json({success:false, message: 'Token is not valid'});
  }

}
export default authUser;


// chatgpt
// const authUser = async (req, res, next) => {
//   const token = req.headers.token;

//   if (!token || typeof token !== 'string') {
//     console.log("🚫 No token provided");
//     return res.json({ success: false, message: 'Not authorized. Login again' });
//   }

//   try {
//     const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = token_decode.id;
//     console.log("✅ Authenticated user:", req.userId);
//     next();
//   } catch (error) {
//     console.error("❌ Invalid token:", error.message);
//     res.json({ success: false, message: 'Token is not valid' });
//   }
// };
