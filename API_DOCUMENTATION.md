# Food Express API Documentation

Base URL: `http://localhost:3000` (or your deployed URL)

## Endpoints

### 1. Get Menu
- **URL:** `/api/menu`
- **Method:** `GET`
- **Description:** Returns a list of all available menu items.
- **Response Example:**
  ```json
  [
    {
      "id": 1,
      "name": "Margherita Pizza",
      "category": "Pizza",
      "price": 12.99,
      "image": "MG pizza.jpg",
      "type": "Veg",
      "description": "Classic tomato base, fresh mozzarella & basil"
    }
  ]
  ```

### 2. Get Cart
- **URL:** `/api/cart`
- **Method:** `GET`
- **Description:** Returns the current items in the user's shopping cart.
- **Response Example:**
  ```json
  [
    {
      "id": 1684351234567,
      "itemId": 1,
      "name": "Margherita Pizza",
      "price": 12.99,
      "image": "MG pizza.jpg",
      "quantity": 1
    }
  ]
  ```

### 3. Add to Cart
- **URL:** `/api/cart`
- **Method:** `POST`
- **Description:** Adds a menu item to the cart or increments its quantity.
- **Request Body Example:**
  ```json
  {
    "itemId": 1
  }
  ```
- **Response:** `201 Created` with the updated cart array.

### 4. Update Cart Item Quantity
- **URL:** `/api/cart/:id`
- **Method:** `PUT`
- **Description:** Increase or decrease the quantity of a specific cart item.
- **Request Body Example:**
  ```json
  {
    "action": "increase" // or "decrease"
  }
  ```
- **Response:** `200 OK` with the updated cart array.

### 5. Remove from Cart
- **URL:** `/api/cart/:id`
- **Method:** `DELETE`
- **Description:** Removes an item entirely from the cart.
- **Response:** `200 OK` with the updated cart array.

### 6. Submit Contact Form
- **URL:** `/api/contact`
- **Method:** `POST`
- **Description:** Submits a customer inquiry message.
- **Request Body Example:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I love the pizza!"
  }
  ```
- **Response:** `201 Created` with a success message.
