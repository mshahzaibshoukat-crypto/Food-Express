# Deployment Steps for Render

Follow these easy steps to deploy your full-stack Food Express website live for your Assignment 4 submission.

## 1. Prepare your GitHub Repository
1. Open your terminal in the `Food Express` directory.
2. If you haven't already, initialize a git repository:
   ```bash
   git init
   ```
3. Add a `.gitignore` file to your folder to ignore `node_modules` (you can do this by creating a file named `.gitignore` and typing `node_modules` inside it).
4. Commit your files:
   ```bash
   git add .
   git commit -m "Assignment 4 Backend Integration"
   ```
5. Create a new repository on GitHub and push your code to it following the GitHub instructions.

## 2. Deploy on Render
1. Go to [Render.com](https://render.com) and sign up/login with your GitHub account.
2. Click on **New +** and select **Web Service**.
3. Connect your GitHub account and select the repository you just created.
4. Fill in the following settings:
   - **Name:** food-express (or whatever you prefer)
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Scroll down and select the **Free** instance type.
6. Click **Create Web Service**.

## 3. View your Website
Render will now build and deploy your app. It usually takes 2-3 minutes. Once the logs say `Server running on http://localhost:3000`, your app is live! 
Click on the provided `xxxx.onrender.com` URL at the top left of your dashboard to view your live site. 
*(Note: Because we used in-memory arrays for the database, any data you add will reset when the server restarts or sleeps, which is totally fine for this assignment type!)*
