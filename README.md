# Koraline

A decentralized application (DApp) that enables users to make reservations for their favorite places, powered by the Ethereum blockchain.

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
- [Technology Stack](#technology-stack)
- [How It Works](#how-it-works)
- [Screenshots](#screenshots)


## Features
- Easy and secure reservation management for places like hotels, restaurants, etc.
- Decentralized, transparent and tamper-proof reservation data stored on the Ethereum blockchain.
- Ability to view the reservation history of a place.
- Option to cancel a reservation.

## Getting Started
To run this DApp, you'll need to have the following software installed on your machine:
- Node.js
- npm (Node Package Manager)
- A metamask account


You can follow the steps below to run the DApp locally:
1. Clone the repository
2. Install dependencies by running `npm install`
3. Run the backend by doing 'cd lib' and then 'node server.js'
4. Run the frontend by running 'npm start''


## Technology Stack
- MongoDB
- Express.js
- Next.js
- Node.js
- Solidity
- Hardhat
- IPFS



## How It Works
1. As a vendor, you can start auctions for certain events. You can have different tiers for different auctions
2. As a user, you can choose to participate in an auction, and get a chance to be in the auction queue if your bid is high enough. 
3. An ERC1155 NFT is minted once the auction ends



The landing page:
![image](https://user-images.githubusercontent.com/34083543/218320064-8c824dde-2e43-4a2b-8987-1b497ef22a4c.png)


Create an auction:
![image (2)](https://user-images.githubusercontent.com/34083543/218320080-65634b71-48c8-4c34-a2c6-b454592ca1a5.png)
![image (3)](https://user-images.githubusercontent.com/34083543/218320095-063678ab-516e-4e9d-9067-18f729b8d520.png)


Bid in an auction:
![image (1)](https://user-images.githubusercontent.com/34083543/218320118-af1a8de3-c8f7-426e-8d22-cd490398d097.png)



This is how auctions are stored in the backend:
<img width="1252" alt="Screen Shot 2023-02-12 at 9 41 13 AM" src="https://user-images.githubusercontent.com/34083543/218319216-fbbe71e4-c126-41cd-a715-9e3145506bb9.png">




