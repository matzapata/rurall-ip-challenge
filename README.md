
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

1. Build docker image with `docker build -t rurall-ip-challenge .`

2. Create container and run it with `docker run --name rurall-ip-challenge-container -p 3000:3000 rurall-ip-challenge`. Here the `-p 3000:3000` it's important to connect the exposed container port to the local machine port for development porpouses. So make sure it's updated with the `.env` file and the `dockerfile`.
