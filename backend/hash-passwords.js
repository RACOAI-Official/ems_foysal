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

async function hashAllPasswords() {
    try {
        await mongoose.connect(DB_URL);
        console.log('Connected to database');

        // Find all users
        const users = await User.find({});
        console.log(`Found ${users.length} users`);

        let updated = 0;
        for (const user of users) {
            // Check if password is already hashed (bcrypt hashes start with $2a$, $2b$, or $2y$)
            if (user.password && !user.password.startsWith('$2')) {
                console.log(`Hashing password for: ${user.email}`);
                const hashedPassword = await bcrypt.hash(user.password, 10);
                user.password = hashedPassword;
                await user.save();
                updated++;
            }
        }

        console.log(`\n✅ Updated ${updated} users with hashed passwords`);
        process.exit(0);
    } catch (error) {
        console.error('Error hashing passwords:', error);
        process.exit(1);
    }
}

hashAllPasswords();
