# Environment Variables Setup Guide

## Quick Start

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Generate AUTH_SECRET:**
   ```bash
   # Using Node.js (recommended)
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   
   # Or using OpenSSL
   openssl rand -base64 32
   ```

3. **Add the generated secret to your `.env` file:**
   ```env
   AUTH_SECRET=your-generated-secret-here
   ```

## Required Environment Variables

### AUTH_SECRET (Required)
**Purpose**: Secret key for NextAuth.js session encryption and JWT signing.

**How to generate:**
- **Node.js**: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`
- **OpenSSL**: `openssl rand -base64 32`
- **Online**: Use a secure random string generator (32+ characters recommended)

**Example:**
```env
AUTH_SECRET=8QFJeWcD3CXXRg1+MA3o4Ery51C8473wVvL7aWjBedQ=
```

**Important**: 
- Never commit this to version control
- Use different secrets for development and production
- Must be at least 32 characters long

### DATABASE_URL (Required)
**Purpose**: MongoDB connection string for Prisma.

**Format:**
```env
# MongoDB Atlas (Recommended)
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/jbrtechno?retryWrites=true&w=majority

# Local MongoDB
DATABASE_URL=mongodb://localhost:27017/jbrtechno
```

### Cloudinary Variables (Required)
**Purpose**: Cloudinary credentials for file uploads (CVs, profile images).

**Get from**: [Cloudinary Dashboard](https://cloudinary.com/console)

```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## Setup Steps

### 1. Create `.env` file
```bash
cp .env.example .env
```

### 2. Generate and add AUTH_SECRET
```bash
# Generate secret
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Copy the output and add to .env file
# AUTH_SECRET=paste-generated-secret-here
```

### 3. Configure Database
- For MongoDB Atlas: Get connection string from your cluster
- For local: Use `mongodb://localhost:27017/jbrtechno`

### 4. Configure Cloudinary
- Sign up at [cloudinary.com](https://cloudinary.com)
- Get credentials from dashboard
- Add to `.env` file

### 5. Verify Setup
```bash
# Check if all variables are set
node -e "require('dotenv').config(); console.log('AUTH_SECRET:', process.env.AUTH_SECRET ? '✓ Set' : '✗ Missing');"
```

## Production Deployment

### Vercel
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add all variables from `.env.example`
4. Generate a new AUTH_SECRET for production (different from development)

### Other Platforms
- Add all environment variables in your hosting platform's dashboard
- **Never** commit `.env` file to version control
- Use platform-specific secret management tools

## Security Best Practices

1. ✅ **Never commit `.env` to Git** (already in `.gitignore`)
2. ✅ **Use different secrets for dev/prod**
3. ✅ **Rotate secrets periodically**
4. ✅ **Use strong, random secrets** (32+ characters)
5. ✅ **Restrict database access** (IP whitelist in MongoDB Atlas)

## Troubleshooting

### "AUTH_SECRET environment variable is required"
- Make sure `.env` file exists in project root
- Verify AUTH_SECRET is set in `.env`
- Restart development server after adding variables

### Database Connection Errors
- Verify DATABASE_URL is correct
- Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for development)
- Ensure MongoDB service is running (local installations)

### Cloudinary Upload Errors
- Verify all three Cloudinary variables are set
- Check credentials in Cloudinary dashboard
- Ensure API key has upload permissions





