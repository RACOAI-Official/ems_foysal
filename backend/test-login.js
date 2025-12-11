require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const DB_URL = process.env.DB_URL;

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

async function testLogin() {
    try {
        await mongoose.connect(DB_URL);
        console.log('Connected to database');

        // Find admin user
        const user = await User.findOne({ email: 'admin@admin.com' });
        
        if (!user) {
            console.log('❌ User not found');
            process.exit(1);
        }

        console.log('✅ User found:', user.email);
        console.log('Password hash:', user.password);
        
        // Test password
        const password = 'admin123';
        const isValid = await bcrypt.compare(password, user.password);
        
        console.log('Testing password "admin123":', isValid ? '✅ VALID' : '❌ INVALID');
        
        if (!isValid) {
            console.log('\n❌ Password verification failed!');
            console.log('Trying to hash and update password...');
            const newHash = await bcrypt.hash(password, 10);
            await User.updateOne({ _id: user._id }, { password: newHash });
            console.log('✅ Password updated');
        }
        
        process.exit(0);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

testLogin();
