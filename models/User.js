import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema ({
    name: String,
    age: Number,
    gender: String,
    ethnicity: String,
    email: String
})

const User = mongoose.model('User', userSchema)
export default User;
