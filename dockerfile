FROM node:17-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . . 
# Make sure expose port matches .env PORT config value
EXPOSE 3000
CMD ["node", "index.js"]
