# PetTake Server Documentation

Documentation for PetTake server application.

---

### Specification

- Express.js
- MongoDB/Mongoose
- GraphQL
  - Pet feature
- REST API
  - User feature

---

## Pet

### Data Structure

### GraphQL

---

## User

### Data Structure

```js
{
  username: String,
  email: String,
  name: String,
  phone: String,
  address: String,
  pets: [Pet]
}
```

Example

```js
{
  username: 'joe',
  email: 'joe@mail.com',
  name: 'Joe Smith',
  phone: '+1 123 1234',
  address: '3434 Bubby Drive Taylor, TX 76574',
  pets: [
    {
      _id: ObjectId('677cb10f234c02444686df35'),
      name: 'Malachi',
      breed: 'Leonberger',
      age: 'Young',
      coatLength: 'Medium',
      preferHomeWith: [ 'Other cats', 'Other dogs', 'Children' ],
      preferHomeWithout: [ 'Children' ],
      health: [ 'Spayed/Neutered' ],
      images: [
        {
          publicId: 'pettake-demo-image-03',
          url: 'https://placehold.co/600x400?text=PetTake+Demo+Image+03',
        },
      ],
      description: 'alias convoco theca beneficium aestivus viscus sordeo terreo vergo comprehendo turbo fugiat thalassinus vero ter corpus magnam angelus absconditus bellicus conatus thymum crapula comitatus autus ipsam complectus aeger suus cumque',
      author: ObjectId('677cb10f234c02444686df2f'),
      createdAt: '2024-12-13T03:26:30.591Z',
    },
    // Other pets
  ]
}
```

### REST API

### **User Registration**

Register a new user.

**Endpoint**

```
POST /user/register
```

**Parameters**

_No parameter._

**Body**

Type: `JSON`

- `user` **Required**  
  type: `Object`  
  Default: `{}`  
  User data object.
  - `username` **Required**  
    type: `String`  
    Default: ''  
    User's username.
  - `password` **Required**  
    type: `String`  
    Default: ''  
    User's password.
  - `email` **Required**  
    type: `String`  
    Default: ''  
    User's email address.
  - `name` **Required**  
    type: `String`  
    Default: ''  
    User's full name.

Example:

```json
{
  "user": {
    "username": "joe",
    "password": "passwordjoe",
    "email": "joe@mail.com",
    "name": "Joe Smith"
  }
}
```

**Return**  
User registration status and a login session if successful.

**Response**

Successful registration:

```js
{
  status: 'ok',
  user: {
    username: 'joe',
  }
}
```

**Error Responses**

Missing required data:

```js
{
  status: 'error',
  message: 'Missing "x" data for registration.'
}
```

Username and/or email is already registered:

```js
{
  status: 'error',
  message: 'User with username "x" is already registered.'
}
```

### **User Login**

Logs in a user.

**Endpoint**

```
POST /user/login
```

**Parameters**

_No parameter._

**Body**

Type: `JSON`

- `username` **Required**  
  type: `String`  
  Default: ''  
  User's username.
- `password` **Required**  
  type: `String`  
  Default: ''  
  User's password.
- `rememberMe` **Required**  
  type: `Boolean`  
  Default: `false`  
  Option for user to save the login session for a set period of time. Default to 30 days.

Example:

```json
{
  "username": "joe",
  "password": "passwordjoe",
  "rememberMe": false
}
```

**Return**  
User login status and a login session if successful.

**Response**

Successful login:

```js
{
  status: 'ok',
  user: {
    username: 'joe',
  }
}
```

**Error Responses**

Missing required data:

```js
{
  status: 'error',
  message: 'Missing "x" data for login.'
}
```

Incorrect credentials:

```js
{
  status: 'error',
  message: 'Username and password are invalid.'
}
```

### **Get User Session**

Get a user login session information.

**Endpoint**

```
GET /user/get-user-session
```

**Parameters**

_No parameter._

**Body**

_No body data._

**Return**  
User login status and a login session if successful.

**Response**

Successful response:

```js
{
  status: 'ok',
  user: {
    username: 'joe',
  }
}
```

**Error Responses**

No login session found:

```js
{
  status: 'ok',
  user: null,
}
```

### **User Logout**

Logs out a user.

**Endpoint**

```
POST /user/logout
```

**Parameters**

_No parameter._

**Body**

_No body data._

**Return**  
User logout status.

**Response**

Successful response:

```js
{
  status: 'ok',
}
```

**Error Responses**

No login session found:

```js
{
  status: 'error',
  message: 'No login session found.'
}
```
