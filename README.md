# FairSync – Explainable AI Banking Agent

**Transparent. Conversational. Ethical.**

FairSync is YourBank’s AI agent designed to transform digital banking from form-based workflows into guided, explainable conversations. Powered by Gemini, Voiceflow, and a blockchain audit layer, FairSync delivers transparent, ethical, and user-controlled banking.

## Overview

FairSync solves the trust gap in modern banking by explaining every AI-driven decision in clear natural language.
It supports both chat and voice banking, manages FD/loan workflows, and anchors all reasoning on a blockchain-based audit trail.


## Features

* Conversational FD, loan, and account services
* Real-time financial simulations
* OTP authentication via Node.js + Twilio
* Voice banking with Voiceflow + Twilio + Gemini
* Explainable AI reasoning summaries
* User-controlled data permissions
* Blockchain-backed AI logs on Sepolia
* IPFS-based document storage (Pinata)
* Bias detection and transparent decision engine


## Architecture Summary

### Frontend

* React
* TailwindCSS
* Blockchain event listeners

### Backend

* Node.js (OTP + orchestration)
* Python Flask (AI reasoning + Gemini + Voiceflow integration)

### AI Layer

* Gemini reasoning and simulations
* Voiceflow conversational logic

### Blockchain Layer

* Solidity smart contract (Remix)
* MetaMask admin verification
* Sepolia testnet + Infura RPC
* IPFS + Pinata for document storage


## Blockchain Transparency Model

* AI summary is hashed
* Hash stored on-chain
* React listens for contract events
* Users can independently verify decisions
* Documents stored on IPFS with immutable references

## Voice Banking Pipeline

* Twilio → voice-to-text
* Voiceflow → flow orchestration
* Gemini → intent + reasoning
* OTP verification
* All actions logged and hashed

## Running the Project

### 1. Clone the Repository

```bash
git clone <repo-url>
cd <repo-folder>
```

### 2. Start Python Backend

```bash
python3 explain.py
# if needed
pip install -r requirements.txt
```

### 3. Start React Frontend

```bash
npm install
npm start
```

App runs at:

```
http://localhost:3000
```

### 4. System Overview

* `explain.py` runs AI and backend routes
* React handles UI + blockchain interactions
* Both must run simultaneously

### Note
Must have MetaMask Wallet extension installed, If any issue in running file, raise an issue we shall look into it 
