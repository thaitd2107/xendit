## Description

Marvel character services. This service will consume data from Marvel API at https://developer.marvel.com. The data will be cached to reduce latency.

## Caching strategy

To account for the fact that a new
Marvel character may be added in the future. We have defined schedule job to run on every 10 minutes. The in memory cache will be refreshed.

* Pros: Easy to implement
* Cons: Need to refresh all data in cache so performance issue when data is growing.

Proposal solution: If Marvel api is able to provide event streaming to kafka for any update/delete we can consume and update accordingly.
To implement high scalablity cache we can use redis as a cache provider instead of in memory cache.
Ttl set to 1 hour in case character object has been deleted, the cache will be expired.

## Installation

```bash
$ npm install
```

## Running the app
Configure .env file. Open and put public key, private key. You can register the keys at https://developer.marvel.com. 


```bash
# .env file
PUBLIC_KEY=Your key
PRIVATE_KEY=Your key
```

Start application:
```bash
$ npm run start
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
