import asyncHandler from "express-async-handler";
import generalUserModel from "../models/generalUserSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// @desc    Register a new general user
// @route   POST /api/generalUser

export const registerGeneralUser = asyncHandler(async (req, res) => {
  const { name, email, password} = await req.body;
      
      if(!(name.length > 0) || !(email.length > 0) ||!(password.length > 0)) {
          res.status(400)
          throw new Error('Please add all fields')
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12)
      // Check if user exists
      const userExists = await generalUserModel.findOne({email})
      if(userExists) {
          res.status(400)
          throw new Error('user already exists')
      }
      // Create user
      const user = await generalUserModel.create({
          name,
          email,
          password: hashedPassword,
      })

      //login user directly
      const userToken = jwt.sign({name, email, }, "profile", {expiresIn: "1h"});
      if(user) {
          res.status(201).json({
              _id: user._id,
              name: user.name,
              publicAddress: user.publicAddress,
              activeAuctions: user.activeAuctions,
              reservations: user.reservations,
              token: userToken,
              type: 1,
          })
          
      } else {
          res.status(400);
          throw new Error('Invalid user data');
      }
})

// @desc    Login a general user
// @route   POST /api/generalUser/login

export const loginGeneralUser = asyncHandler(async (req, res) => {
  const {email, password} = await req.body;
  const user = await generalUserModel.findOne({email});
  if(user && (await bcrypt.compare(password, user.password))) {
      res.json({
          _id: user._id,
          name: user.name,
          publicAddress: user.publicAddress,
          activeAuctions: user.activeAuctions,
          reservations: user.reservations,
          token: userToken,
          type: 1,
      })
  }
  else {
      res.status(401)
      throw new Error('Invalid email or password')
  }
})

