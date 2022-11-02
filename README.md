
# Rurall ip challenge

Express server that follows the hexagonal software architecture to:
1. Given an IP, find and show:
    a. Name and ISO code of the country
    b. Local currency and its current price in dollars or euros.
2. Ban/Blacklist IPs from accessing point 1 endpoint.

## Development setup steps

1. Setup enviroment variables. Copy `.env.example` to `.env` and fill the enviroment variables with it's corresponding values. Note that if you change the `PORT` default value, you'll have to update it in the `dockerfile` as well. Also create postgres and redis db instances.

2. Install dependencies with: `npm install` or `yarn` in both client and server

3. Start development server with `npm run start` or `yarn start` in both client and server

> Run api tests with `npm run test` or `yarn test`

## Docker run

1. Build docker and run docker containers `docker-compose up --build`
2. In the docker node-app terminal run `npm run migrate` and `npm run seed` to migrate and seed the ips database

# Api endpoints

## `GET /ip-country-data/:ip`

Route protected with the `bannedIpsMiddleware` that searches the ips blacklists and if banned responds with `403 "Request ip is banned"`

Example success response (status 200): 

```json
{
    "message": "Successfully looked up ip data",
    "data": {
        "code": "US",
        "name": "United States of America",
        "currency": "USD",
        "currencyRates": {
            "USD": 1,
            "EUR": 1.004855
        }
    }
}
```


Example error response (status 500): 

```json
{
    "message": "Error message",
}
```

## `POST /ip-blackslist`

Adds an ip to the blacklist:

Body

```json
{
    ipAddress: "..."
}
```

Success response (status 200)

```json
{
    "message": "OK"
}
```

Invalid IP response (status 400)

```json
{
    "message": "Invalid IP"
}
```

Error response (status 500)

```json
{
    "message": "...error.message"
}
```

# Adapters implementations

## `getIpByValue`

Finds ip in cache or database and retrieves it's instance if found or null if not

example: 

```
{ id: 1, address: "...", is_banned: false }
```

## `setIp`

Stores ip in cache and database as follows:

```
{ id: 1, address: "...", is_banned: false }
```

## `getCurrencyValuation`

Fetch currency valuation from `https://api.apilayer.com/fixer`. Requires `FIXER_API_KEY` in `.env`
If possible gets data from redis cache

```js
async getCurrencyValuation({
    base, // Base currency symbol to convert from
    symbols, // Array of currency symbols to convert to 
    date // A date in the past for which historical rates are requested (as string formated like yyyy-mm-dd). Default today.
}) => { ...symbols: rates }
```

## `getIpCountryData`

Fetch country code from `http://api.ipapi.com`
Fetch country name and currency from `https://restcountries.com`
If available get data from cache

```js
async (ipAddress) => {
    return {
        code: "countryCode",
        name: "countryName",
        currency: "currencyCode"
    }
}
```

# Middlewares

## bannedIpsMiddleware

Uses `getIpByValue` to find ips data and if the `is_banned` field is set tu true, responds with `res.status(403).send({ message: "Request ip is banned" })`

