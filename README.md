# Rewards React Application – Full Documentation

## Overview

This project is a **Reward Points Calculator Application** built using **React JS (JavaScript)**. It simulates retailer customer transactions and calculates reward points based on the given criteria.

The application includes:

* Mock API simulation
* Reusable components
* Pagination
* Filters
* Logging 
* Monthly & total reward calculation
* Unit tests

---

## Project Setup

### **1. Extract the ZIP / Clone Project**

```
cd rewards-react-application
```

### **2. Install Dependencies**

```
npm install
```

### **3. Start the Application**

```
npm start
```

 Runs at: **[http://localhost:3000](http://localhost:3000)**

### **4. Run Unit Tests**

```
npm test
```

## Component Details

### **1. CustomerList Component**

* Displays all customers
* Includes pagination and filter
* Click on customer → shows detailed monthly reward breakdown

### **2. RewardTable Component**

* Displays monthly rewards
* Shows total rewards
* Clean tabular view

### **3. Logs Component**

* Shows API simulation logs
* Shows reward calculation logs

### **4. rewardCalculator.js**

Handles the core logic:

* <50 → 0 points
* 50–100 → 1 point for each dollar above 50
* > 100 → 2 points for each dollar above 100 + 50 points

---

## Reward Calculation Logic

**If purchase = $120:**

* Above $100 → 20 × 2 = 40
* Between $50–100 → 50 × 1 = 50
* **Total = 90 points**


## How It Works

1. User opens the app
2. App fetches mock transactions
3. Reward calculator processes each transaction
4. UI displays:

   * Monthly rewards
   * Total rewards
   * Logs
5. User can filter, navigate pages, inspect details

---
