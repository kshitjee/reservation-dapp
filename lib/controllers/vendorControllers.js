import asyncHandler from "express-async-handler";
import vendorModel from "../models/vendorSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// @desc    Register a new general user
// @route   POST /api/vendor

export const registerVendor = asyncHandler(async (req, res) => {
  const { address, name, email, password} = await req.body;
      
      if(!(name.length > 0) || !(email.length > 0) ||!(password.length > 0) || !(address.length > 0)) {
          res.status(400)
          throw new Error('Please add all fields')
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12)
      // Check if user exists
      const userExists = await vendorModel.findOne({email})
      if(userExists) {
          res.status(400)
          throw new Error('user already exists')
      }
      // Create user
      const user = await vendorModel.create({
          name,
          email,
          password: hashedPassword,
          address,
      })

      //login user directly
      const userToken = jwt.sign({name, email, }, "profile", {expiresIn: "1h"});
      if(user) {
          res.status(201).json({
              _id: user._id,
              name: user.name,
              email: user.email,
              publicAddress: user.publicAddress,
              activeAuctions: user.activeAuctions,
              completedAuctions: user.completedAuctions,
              address: user.address,
              token: userToken,
              type: 1,
          })
          
      } else {
          res.status(400);
          throw new Error('Invalid user data');
      }
})

// @desc    Login a general user
// @route   POST /api/vendor/login

export const loginVendor = asyncHandler(async (req, res) => {
  const {email, password} = await req.body;
  const user = await vendorModel.findOne({email});
  if(user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        publicAddress: user.publicAddress,
        activeAuctions: user.activeAuctions,
        completedAuctions: user.completedAuctions,
        address: user.address,
        type: 1,
      })
  }
  else {
      res.status(401)
      throw new Error('Invalid email or password')
  }
})

// @desc    Get all vendor users
// @route   GET /api/vendor

export const getVendors = asyncHandler(async (req, res) => {
    const users = await vendorModel.find({});
    res.json(users);
    }
)

// @desc    Get vendor by ID
// @route   GET /api/vendor/:id

export const getVendorById = asyncHandler(async (req, res) => {
    const user = await vendorModel.findById(req.params.id);
    if(user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
}
)


