# MongoDB Setup Guide for BLAZIL.IN

This guide helps you set up MongoDB for the BLAZIL.IN application. You have two options:

## Option 1: MongoDB Atlas (Cloud - Recommended)

MongoDB Atlas provides a free tier that's perfect for development and small projects.

### Step 1: Create a MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Verify your email address

### Step 2: Create a Cluster

1. Click **"Build a Database"** or **"Create"**
2. Choose the **FREE** tier (M0 Sandbox)
3. Select your preferred cloud provider and region (choose one close to you)
4. Click **"Create Cluster"** (takes 3-5 minutes)

### Step 3: Create a Database User

1. Go to **Database Access** (left sidebar under Security)
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter a username (e.g., `blazil_user`)
5. Generate a strong password (save it securely!)
6. Set **Database User Privileges** to "Atlas admin" or "Read and write to any database"
7. Click **"Add User"**

### Step 4: Whitelist Your IP Address

1. Go to **Network Access** (left sidebar under Security)
2. Click **"Add IP Address"**
3. For development, click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - **Note:** This is okay for development but not recommended for production
   - For production, add only your specific IP addresses
4. Click **"Confirm"**

### Step 5: Get Your Connection String

1. Go to **Database** (left sidebar)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Select **"Driver: Node.js"** (use the latest stable version)
5. Copy the connection string, it looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 6: Configure Your .env File

1. Open `server/.env`
2. Replace the `MONGO_URI` value with your connection string
3. Replace `<username>` with your database username
4. Replace `<password>` with your database password
5. Add the database name after `.mongodb.net/` (e.g., `blazil_db`)

**Example:**
```env
MONGO_URI=mongodb+srv://blazil_user:MyP@ssw0rd123@cluster0.abc123.mongodb.net/blazil_db?retryWrites=true&w=majority
```

**Important Notes:**
- Remove the angle brackets `<` `>` from your connection string
- If your password contains special characters (like @, :, /, etc.), they need to be URL encoded
  - Use this tool: https://www.urlencoder.org/
  - Example: `P@ssw0rd` becomes `P%40ssw0rd`
- Make sure there are NO spaces in the connection string

---

## Option 2: Local MongoDB (Development Only)

For local development, you can install MongoDB on your machine.

### Ubuntu/Debian

```bash
# Import MongoDB public GPG key using modern method
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
  sudo gpg --dearmor -o /usr/share/keyrings/mongodb-archive-keyring.gpg

# Create list file for MongoDB
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-archive-keyring.gpg ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/7.0 multiverse" | \
  sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update package database
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB service
sudo systemctl start mongod

# Enable MongoDB to start on boot
sudo systemctl enable mongod

# Check status
sudo systemctl status mongod
```

### macOS (with Homebrew)

```bash
# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community@6.0

# Start MongoDB service
brew services start mongodb-community@6.0

# Check if running
brew services list | grep mongodb
```

### Windows

1. Download MongoDB Community Server from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Run the installer (.msi file)
3. Choose "Complete" installation
4. Install MongoDB as a Service
5. MongoDB should start automatically

### Configure .env for Local MongoDB

Open `server/.env` and set:

```env
MONGO_URI=mongodb://localhost:27017/blazil_db
```

---

## Verifying Your MongoDB Connection

After setting up MongoDB, test the connection:

```bash
# Navigate to server directory
cd server

# Start the server
npm start
```

**If successful, you should see:**
```
Cron job scheduled: Expired jobs will be deleted every hour
Server is running on port 5000
Environment: development
MongoDB Connected: cluster0-shard-00-00.xxxxx.mongodb.net
```

**If you see an error:**
```
Error: querySrv ECONNREFUSED _mongodb._tcp.xxxxx.mongodb.net
```

This means your MongoDB connection is not configured correctly. Check:
1. Is your `.env` file in the `server` directory?
2. Is `MONGO_URI` set correctly?
3. Did you replace `<username>` and `<password>` with actual values?
4. Did you remove the angle brackets `<` `>`?
5. Did you URL encode special characters in your password?
6. For Atlas: Is your IP whitelisted?
7. For local: Is MongoDB service running?

---

## Common Issues and Solutions

### Issue: "querySrv ECONNREFUSED"

**Cause:** DNS resolution failure for MongoDB Atlas

**Solutions:**
- Check your internet connection
- Verify the connection string format
- Ensure you're using `mongodb+srv://` for Atlas (not `mongodb://`)
- Try using the standard connection string instead of SRV:
  1. In Atlas, click "Connect" → "Connect your application"
  2. Toggle "Connection String Format" to "Standard"

### Issue: "Authentication failed"

**Cause:** Wrong username or password

**Solutions:**
- Double-check your database username and password
- If password has special characters, URL encode them
- Ensure you created a database user (not just Atlas account)

### Issue: "IP not whitelisted"

**Cause:** Your IP is not in the allowed list

**Solutions:**
- Go to Network Access in Atlas
- Add your current IP or use 0.0.0.0/0 for development

### Issue: "connect ECONNREFUSED 127.0.0.1:27017"

**Cause:** Local MongoDB is not running

**Solutions:**
```bash
# Ubuntu/Debian
sudo systemctl start mongod

# macOS
brew services start mongodb-community

# Windows
net start MongoDB
```

---

## Need Help?

If you're still having issues:
1. Check the error message in your terminal
2. Review your `.env` file for typos
3. Consult [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
4. Check [MongoDB Community Forums](https://www.mongodb.com/community/forums/)

For BLAZIL.IN specific issues:
- Email: bslxrnilagiribsccs@gmail.com
- WhatsApp: +91 9747835717
