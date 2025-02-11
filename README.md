# Tiktr - A Blockchain-Based Ticket Management System

## 📌 Overview
Tiktr is a blockchain-based ticketing system designed to eliminate ticket fraud and scalping. Inspired by issues at large-scale events, Tiktr ensures secure, verifiable, and transparent ticket ownership using NFTs.

## 🚀 Features
- **NFT-Based Tickets**: Each ticket is minted as an NFT on the blockchain.
- **Secure Transactions**: Immutable ownership records prevent fraud.
- **Smart Contracts**: Automated ticket validation and transfers.
- **Web3 Integration**: Connect and interact with your crypto wallet.
- **User Dashboard**: View purchased tickets and event details.

## 🏗️ Tech Stack
- **Frontend**: React, TailwindCSS
- **Blockchain**: Solidity, Ethereum (or Polygon)
- **Smart Contract Development**: Hardhat/Truffle
- **Web3 Interaction**: ethers.js

## 📂 Project Structure
```
Tiktr/
│── frontend/      # React-based frontend
│── contracts/     # Solidity smart contracts
│── scripts/       # Deployment and interaction scripts
│── README.md      # Project documentation
```

## 📜 Setup Instructions
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/adith2005-20/tiktr.git
cd tiktr
```

### 2️⃣ Install Dependencies
#### Frontend
```bash
cd frontend
npm install
npm start
```
#### Smart Contracts
```bash
cd contracts
npm install
npx hardhat compile
```

### 3️⃣ Deploy Smart Contracts
```bash
npx hardhat run scripts/deploy.js --network goerli
```

### 4️⃣ Run the Project
Start the frontend, then connect your Web3 wallet to test it!

## 🔗 Links
- [GitHub Repository](https://github.com/adith2005-20/tiktr)
- [Frontend Deployment (if hosted)](https://tiktr.vercel.app)


## 📜 License
MIT License © 2025 Tiktr Team
