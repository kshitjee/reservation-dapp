import mongoose from "mongoose";

const generalUserSchema = new mongoose.Schema(
    {
        //wallet address
        publicAddress: {
            type: String,
            required: [true, 'Please add a public address'],
            unique: true
        },
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Please add a password']
        },
        active_auctions: {
            type: Array,
            default: []
        }, 
        reservations: {
            type: Array,
            default: []
        }

    },
    { timestamps: true }
);

let generalUsers = mongoose.model("generalusers", generalUserSchema);

export default generalUsers;
