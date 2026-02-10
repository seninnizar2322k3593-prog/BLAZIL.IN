# Quick Start Guide - Fixing MongoDB Connection Error

If you're seeing this error:
```
Error: querySrv ECONNREFUSED _mongodb._tcp.xxxxx.mongodb.net
```

Follow these steps to get your server running:

## Step 1: Check .env File Location

The `.env` file **MUST** be in the `server` directory:
```bash
cd BLAZIL.IN/server
ls -la .env
```

If you don't see `.env`, create it:
```bash
cp ../.env.example .env
```

## Step 2: Configure MongoDB Connection

You have two options:

### Option A: Use MongoDB Atlas (Recommended - Free)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a free cluster (M0)
4. Create a database user
5. Whitelist your IP (0.0.0.0/0 for development)
6. Get your connection string
7. Update `.env`:

```env
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/blazil_db?retryWrites=true&w=majority
```

**Important:**
- Replace `YOUR_USERNAME` and `YOUR_PASSWORD` with actual credentials
- Remove the `<` `>` angle brackets
- URL encode special characters in password

📖 **Detailed instructions:** [server/MONGODB_SETUP.md](server/MONGODB_SETUP.md)

### Option B: Use Local MongoDB

1. Install MongoDB on your system
2. Start MongoDB service:
   ```bash
   # Ubuntu/Debian
   sudo systemctl start mongod
   
   # macOS
   brew services start mongodb-community
   ```
3. Update `.env`:
   ```env
   MONGO_URI=mongodb://localhost:27017/blazil_db
   ```

## Step 3: Start the Server

```bash
cd server
npm install  # if you haven't already
npm start
```

You should see:
```
Cron job scheduled: Expired jobs will be deleted every hour
Server is running on port 5000
Environment: development
MongoDB Connected: xxxxx
```

## Still Having Issues?

1. **Check your .env file:**
   ```bash
   cat server/.env | grep MONGO_URI
   ```
   Make sure it's not empty and starts with `mongodb://` or `mongodb+srv://`

2. **Verify MongoDB Atlas setup:**
   - Database user created?
   - IP whitelisted?
   - Correct username/password?

3. **For local MongoDB:**
   ```bash
   # Check if MongoDB is running
   ps aux | grep mongod
   
   # Try to connect
   mongosh  # or: mongo
   ```

4. **Read the detailed guide:** [server/MONGODB_SETUP.md](server/MONGODB_SETUP.md)

## Common Mistakes

❌ **Wrong:**
```env
MONGO_URI=basildb.dgguy36.mongodb.net
```

✅ **Correct:**
```env
MONGO_URI=mongodb+srv://username:password@basildb.dgguy36.mongodb.net/blazil_db?retryWrites=true&w=majority
```

❌ **Wrong:** (keeping angle brackets)
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/database
```

✅ **Correct:**
```env
MONGO_URI=mongodb+srv://myuser:mypass123@cluster.mongodb.net/blazil_db
```

## Need Help?

- Email: bslxrnilagiribsccs@gmail.com
- WhatsApp: +91 9747835717

---

**Next Steps After Server Starts:**
1. Test the API: `curl http://localhost:5000/api/health`
2. Set up the frontend: See [../SETUP.md](../SETUP.md)
3. Create test users: `npm run seed`
