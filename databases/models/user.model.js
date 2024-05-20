import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: [2, 'name too short'],
        maxLength: [15, 'name too long'],
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: String,
    },
    otpExpires: {
        type: Date,
    },
    confirm: {
        type: Boolean,
        default: false
    },
    profile_status: {
        type: String,
        enum: ['active', 'disabled'],
        default: 'active'
    }
}, { timestamps: true })
export const userModel = mongoose.model('user', userSchema)