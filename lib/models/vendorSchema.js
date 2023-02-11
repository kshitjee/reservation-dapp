import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
    {
        //wallet address
        publicAddress: {
            type: String,
            //required: [true, 'Please add a public address'],
            //unique: true
            
        },
        //physical address
        address: {
            type: String,
            required: [true, 'Please add an address']
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
        activeAuctions: {
            type: Array,
            default: []
        },
        completedAuctions: {
            type: Array,
            default: []
        }

    },
    { timestamps: true }
);

let vendors = mongoose.model("vendors", vendorSchema);

export default vendors;
