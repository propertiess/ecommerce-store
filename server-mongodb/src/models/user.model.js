import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = Schema({
    username: String,
    email: String,
    // password: String,
    name: {
        firstname: String,
        lastname: String,
    },
    address: {
        city: String,
        street: String,
        number: Number,
        zipcode: String,
        geolocation: {
            lat: String,
            long: String,
        },
    },
    phone: String,
});

export const User = mongoose.model('user', userSchema);