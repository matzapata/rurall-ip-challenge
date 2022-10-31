
# Rurall ip challenge

Express server that follows the hexagonal software architecture to:
1. Given an IP, find and show:
    a. Name and ISO code of the country
    b. Local currency and its current price in dollars or euros.
2. Ban/Blacklist IPs from accessing point 1 endpoint.

## Development setup steps

1. Setup enviroment variables. Copy `.env.example` to `.env` and fill the enviroment variables with it's corresponding values. Note that if you change the `PORT` default value, you'll have to update it in the `dockerfile` as well.

2. Install dependencies with: `npm install` or `yarn`

3. Start development server with `npm run start` or `yarn start`

> Run tests with `npm run test` or `yarn test`

## Docker run

1. Build docker and run docker containers `docker-compose up --build`

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

# Adapters implementations

## `getBannedIpByValue`

Finds ip in `data/bannedIps.json` and returns found object

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

