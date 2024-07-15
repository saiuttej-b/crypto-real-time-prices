# Cryptocurrencies Real Time Prices

This project is a simple web application that displays the real-time prices of cryptocurrencies. The application uses the LiveCoinWatch API to fetch the data. The backend is built using NestJS and the frontend is built using NextJS.
It show the coin prices in USD. The listed coins are Bitcoin(BTC), Ethereum(ETH), Tether USDt(USDT), BNS(BNB), and Solana(SOL).

## Setup

- Clone the repository
- Navigate to the root directory of the project

### Backend Setup

#### Env file configuration

```.env
TZ=
PORT=
CORS_ORIGIN=

MONGO_DB_HOST=
MONGO_DB_USERNAME=
MONGO_DB_PASSWORD=
MONGO_DB_DATABASE=
MONGO_DB_AUTO_INDEX=true

LIVE_COIN_WATCH_API_KEY=
```

- TZ is optional, it is the timezone of the server. If not provided, the server will use the default timezone of the system.
- PORT is optional, it is the port the server will run on. If not provided, the server will run on port 3100.
- CORS_ORIGIN is optional, it is the origin that is allowed to make requests to the server. To allow all origins set that value as "\*".
- MONGO_DB_HOST is the host of the MongoDB database. It is required.
- MONGO_DB_USERNAME is the username of the MongoDB database. It is required.
- MONGO_DB_PASSWORD is the password of the MongoDB database. It is required.
- MONGO_DB_DATABASE is the name of the MongoDB database. It is required.
- MONGO_DB_AUTO_INDEX is optional, it can have "true" or "false" as value, which determines if the MongoDB database should auto-index (create indexes automatically on server start-up). If not provided, it will default to true.
- LIVE_COIN_WATCH_API_KEY is the API key for the LiveCoinWatch API. It is required.

#### Start-up commands

```bash
# Navigate to the backend directory, assuming you are in the root directory of the project
cd crypto-real-time-prices-server

# Install dependencies
npm install

# Create a .env file in the root directory of the backend app and add the required environment variables
touch .env

# Start the backend app
npm run dev
```

### Frontend Setup

#### Env file configuration

```.env
NEXT_PUBLIC_APP_API_URL=
```

- NEXT_PUBLIC_APP_API_URL is the URL of the backend API. It is required.

#### Start-up commands

```bash
# Navigate to the frontend directory, assuming you are in the root directory of the project
cd crypto-real-time-prices-web

# Install dependencies
npm install

# Create a .env file in the root directory of the frontend app and add the required environment variables
touch .env

# Start the frontend app
npm run dev
```
