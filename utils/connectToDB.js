import mongoose from 'mongoose';
const connectToDB = async () => 
    mongoose.connect('mongodb+srv://testuser:ytrewq@cluster0.b1uot.mongodb.net/images_collector?retryWrites=true&w=majority');
export default connectToDB;
