require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const DB_URL = process.env.DB_URL;

// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    username: String,
    mobile: Number,
    password: String,
    type: String,
    status: String,
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    image: String,
    address: String
}, { timestamps: true });

const User = mongoose.model('User', userSchema, 'users');

async function checkPasswords() {
    try {
        await mongoose.connect(DB_URL);
        console.log('Connected to database\n');

        // Find all users
        const users = await User.find({});
        console.log(`Found ${users.length} users\n`);

        for (const user of users) {
            console.log(`User: ${user.email}`);
            console.log(`  Password: ${user.password}`);
            console.log(`  Is hashed: ${user.password && user.password.startsWith('$2')}`);
            
            // Try to verify with the known password
            if (user.email === 'admin@admin.com') {
                const isValid = await bcrypt.compare('admin123', user.password);
                console.log(`  Verify admin123: ${isValid}`);
            }
            console.log();
        }

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkPasswords();
