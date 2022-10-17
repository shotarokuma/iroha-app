# iroha-app
this project is coupon app using iroha api, which is sytsem of block chain by soramitu
you can create your bitcoin in admin page, then receive the money in user page to exchange real asset
### app
[admin page](https://myiroha.com/admin)

[user page](https://myiroha.com/)
- admin page: admin@japan / 1234
- user page: skumagai@japan / 5959
### Install dependency
```
yarn install
```
### Run app
``` 
docker-compose -f docker/docker-compose.yaml up 
```
### Run client side
```
yarn client dev
```

### Run server side
```
yarn server dev
```

### Generate code for graphql
```
yarn graphql dev
```
