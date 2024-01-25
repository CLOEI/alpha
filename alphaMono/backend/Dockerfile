FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npx tsc
CMD ["node", "build/index.js"]
EXPOSE 5000