### CLI Application

#### Idea

- Write command application base on commander package
- Parse and store data in a sufficient data-structure (pre-calculate final balance, by day volatile)
- Use stream API to handle data row one by one (cause data file is large)
- Use lokijs (embed database) to deal with heap size exceed issue

#### Feature

- Node.js
- Typescript
- commander
- axios
- lokijs
- husky, prettier, lint-staged

#### Install && set up

```
yarn install
cp .env.example .env
export NODE_OPTIONS="--max-old-space-size=8192"
```

Set up environment variable LOG_FILE_PATH and CRYPTO_EXCHANGE_API_KEY

Example

```
LOG_FILE_PATH=/Users/Downloads/transactions.csv
CRYPTO_EXCHANGE_API_KEY=e4ce426fb741a048d492c1b49274ece10cf51cb8c11ebe33f9f8396bab312a34
```

#### Test (built version)

```
yarn build

npm install -g .

crypto-cli --date 2022-04-22 --token ETH
```

Uninstall

```
npm uninstall -g crypto-cli
```

#### Test (dev version)

```
npm run dev -- --token ETH --date 2022-04-22
```
