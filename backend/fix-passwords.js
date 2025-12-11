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

// Map of emails to their passwords
const userPasswords = {
    'john.doe@example.com': 'john123',
    'jane.smith@example.com': 'jane123',
    'mike.johnson@example.com': 'mike123',
    'sarah.davis@example.com': 'sarah123',
    'racotest850@gmail.com': 'raco123'
};

async function fixPasswords() {
    try {
        await mongoose.connect(DB_URL);
        console.log('Connected to database\n');

        let updated = 0;
        for (const [email, password] of Object.entries(userPasswords)) {
            console.log(`Updating ${email} with password: ${password}`);
            const hashedPassword = await bcrypt.hash(password, 10);
            
            const result = await User.updateOne(
                { email },
                { password: hashedPassword }
            );
            
            if (result.modifiedCount > 0) {
                updated++;
                console.log(`  ✓ Updated successfully`);
            } else {
                console.log(`  ✗ User not found`);
            }
        }

        console.log(`\n✅ Updated ${updated} users with proper hashed passwords`);
        console.log('\nTest Credentials:');
        console.log('==================');
        Object.entries(userPasswords).forEach(([email, pwd]) => {
            console.log(`Email: ${email}`);
            console.log(`Password: ${pwd}\n`);
        });
        console.log('Admin:');
        console.log(`Email: admin@admin.com`);
        console.log(`Password: admin123`);
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

fixPasswords();
