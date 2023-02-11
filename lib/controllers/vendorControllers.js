import asyncHandler from "express-async-handler";
import vendorModel from "../models/vendorSchema";
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
        token: userToken,
        type: 1,
      })
  }
  else {
      res.status(401)
      throw new Error('Invalid email or password')
  }
})

