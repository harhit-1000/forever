import mongoose from 'mongoose'

const connectDB = async () =>{
  mongoose.connection.on('connected', ()=>{
    console.log("DB connected");
  })
  await mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('DB connected');
  }).catch((err) => {
    console.error('DB connection error:', err);
  });
}

export default connectDB;