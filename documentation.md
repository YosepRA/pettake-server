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

**Return**  
User registration status and a login session if successful.

**Response**

**Error Responses**
