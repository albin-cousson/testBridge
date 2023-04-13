# test for Bridge

## Starting

```
npm start
```

## Health

Get API health.

**URL** : `http://localhost:3000/health`

**Method** : `GET`

#### Success Response

**Code** : `200 OK`

**Content**

```
ok
```

---

## Accounts

Get all user's accounts.

**URL** : `http://localhost:3000/accounts`

**Method** : `GET`

**Headers** :

- `Content-Type: application/json`
- `x-api-key: {api-key}`

#### Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "accounts": [
    {
      "acc_number": "000000001",
      "amount": "3000",
      "currency": "EUR"
    }
  ],
  "links": {
    "self": "/accounts?page=1",
    "next": "/accounts?page=2"
  }
}
```

#### Error Response

**Condition** : If API key is missing or wrong.

**Code** : `401 UNAUTHORIZED`

---

## Accounts with transactions

Get all user's accounts with transactions without duplicate.

**URL** : `http://localhost:3000/accountsAndTransactions`

**Method** : `GET`

**Headers** :

- `Content-Type: application/json`
- `x-api-key: {api-key}`

#### Success Response

**Code** : `200 OK`

**Content example**

```
[{
  "acc_number": "12345678",
  "amount": "123",
  "transactions": [
    {
      "label": "ZERTY",
      "amount": "-334",
      "currency": "EUR"
    }
],
... },
{
  "acc_number": "12345688",
  "amount": "543",
  "transactions": [
    {
        "label": "label 1",
        "amount": "30",
        "currency": "EUR"
    }
  ],
}]
```

#### Error Response

**Condition** : If API key is missing or wrong.

**Code** : `401 UNAUTHORIZED`

---

## Transactions

Get an account's transactions, by account number

**URL** : `http://localhost:3000/accounts/<acc_number>/transactions`

**Method** : `GET`

**Headers** :

- `Content-Type: application/json`
- `x-api-key: {api-key}`

#### Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "transactions": [
    {
      "id": 1,
      "label": "label 1",
      "sign": "DBT",
      "amount": "30",
      "currency": "EUR"
    }
  ],
  "links": {
    "self": "/accounts/0000001/transactions?page=1",
    "next": "/accounts/0000001/transactions?page=2"
  }
}
```

_Sign references_

| Sign label | Meaning            |
| ---------- | ------------------ |
| DBT        | Debit transaction  |
| CDT        | Credit transaction |

#### Error Response

**Condition** : If API key is missing or wrong.

**Code** : `401 UNAUTHORIZED`
