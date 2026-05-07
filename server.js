const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

const DB_FILE = path.join(__dirname, 'database.json');

// Default Menu
const defaultMenu = [
    { id: 1, name: "Margherita Pizza", category: "Pizza", price: 12.99, image: "MG pizza.jpg", type: "Veg", description: "Classic tomato base, fresh mozzarella & basil" },
    { id: 2, name: "Pepperoni Pizza", category: "Pizza", price: 14.99, image: "cheese-peprani-pizza.jpg", type: "Meat", description: "Loaded with pepperoni, cheese & tomato sauce" },
    { id: 3, name: "BBQ Chicken Pizza", category: "Pizza", price: 15.99, image: "BBQ.jpg", type: "Meat", description: "Smoky BBQ sauce, grilled chicken & red onion" },
    { id: 4, name: "Classic Smash Burger", category: "Burgers", price: 10.99, image: "C.S.B.jpg", type: "Meat", description: "Double smash patty, American cheese & secret sauce" },
    { id: 5, name: "Crispy Chicken Burger", category: "Burgers", price: 11.99, image: "C.C.B.jpg", type: "Meat", description: "Fried chicken fillet, pickles, coleslaw & mayo" },
    { id: 6, name: "Veggie Burger", category: "Burgers", price: 9.99, image: "VEG.jpg", type: "Veg", description: "Black bean patty, avocado, lettuce & tomato" },
    { id: 7, name: "Crispy Fries", category: "Sides", price: 3.99, image: "Crispy-Fries_8.webp", type: "Veg", description: "Golden, seasoned & perfectly crispy" },
    { id: 8, name: "Onion Rings", category: "Sides", price: 4.49, image: "O.R.png", type: "Veg", description: "Beer-battered & fried to perfection" },
    { id: 9, name: "Soft Drink", category: "Drinks", price: 2.49, image: "drinks.jpg", type: "Veg", description: "Coke, Sprite, or Fanta — your choice" },
    { id: 10, name: "Ice Cream", category: "Drinks", price: 3.49, image: "ice.jpg", type: "Veg", description: "Vanilla, chocolate or strawberry swirl" },
    { id: 11, name: "Butter Chicken Curry", category: "Specials", price: 16.99, image: "BCC.jpg", type: "Meat", description: "Rich creamy tomato curry with naan bread" },
    { id: 12, name: "Sushi Platter (12pc)", category: "Specials", price: 18.99, image: "sushi.jpg", type: "Seafood", description: "Assorted fresh sushi rolls with soy & wasabi" },
    { id: 13, name: "Taco Trio", category: "Specials", price: 9.99, image: "taco.jpg", type: "Meat", description: "3 corn tacos with grilled chicken, salsa & guac" }
];

// Helper to read DB
function readDB() {
    if (!fs.existsSync(DB_FILE)) {
        const initialDB = { menu: defaultMenu, cart: [], messages: [] };
        fs.writeFileSync(DB_FILE, JSON.stringify(initialDB, null, 2));
        return initialDB;
    }
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
}

// Helper to write DB
function writeDB(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// --- REST API ROUTES ---

// 1. Get Menu
app.get('/api/menu', (req, res) => {
    const db = readDB();
    res.json(db.menu);
});

// 2. Get Cart
app.get('/api/cart', (req, res) => {
    const db = readDB();
    res.json(db.cart);
});

// 3. Add to Cart (Create)
app.post('/api/cart', (req, res) => {
    const { itemId } = req.body;
    const db = readDB();
    const menuItem = db.menu.find(m => m.id === parseInt(itemId));
    
    if (!menuItem) {
        return res.status(404).json({ error: "Item not found" });
    }

    const existingCartItem = db.cart.find(c => c.itemId === parseInt(itemId));
    if (existingCartItem) {
        existingCartItem.quantity += 1;
    } else {
        db.cart.push({
            id: Date.now(), // simple unique id
            itemId: menuItem.id,
            name: menuItem.name,
            price: menuItem.price,
            image: menuItem.image,
            quantity: 1
        });
    }
    
    writeDB(db);
    res.status(201).json({ message: "Added to cart", cart: db.cart });
});

// 4. Update Cart Item Quantity (Update)
app.put('/api/cart/:id', (req, res) => {
    const { id } = req.params;
    const { action } = req.body; // 'increase' or 'decrease'
    const db = readDB();
    
    const cartItem = db.cart.find(c => c.id === parseInt(id));
    if (!cartItem) {
        return res.status(404).json({ error: "Cart item not found" });
    }

    if (action === 'increase') {
        cartItem.quantity += 1;
    } else if (action === 'decrease') {
        cartItem.quantity -= 1;
        if (cartItem.quantity <= 0) {
            db.cart = db.cart.filter(c => c.id !== parseInt(id));
        }
    }
    
    writeDB(db);
    res.json({ message: "Cart updated", cart: db.cart });
});

// 5. Remove from Cart (Delete)
app.delete('/api/cart/:id', (req, res) => {
    const { id } = req.params;
    const db = readDB();
    db.cart = db.cart.filter(c => c.id !== parseInt(id));
    writeDB(db);
    res.json({ message: "Item removed", cart: db.cart });
});

// 6. Submit Contact Form
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required" });
    }
    
    const db = readDB();
    const newMessage = {
        id: Date.now(),
        name,
        email,
        message,
        date: new Date().toISOString()
    };
    
    db.messages.push(newMessage);
    writeDB(db);
    res.status(201).json({ message: "Message received successfully!" });
});

// Serve frontend static files
app.use(express.static(__dirname));

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
