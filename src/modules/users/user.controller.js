import jwt from "jsonwebtoken"
import { userModel } from './../../../databases/models/user.model.js';
import { catchAsyncErr } from "../../utils/catcherr.js";
import { AppErr } from './../../utils/AppErr.js';
import { sendEmail } from './../../emails/user.email.js';

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
};

const signUp = catchAsyncErr(async (req, res, next) => {
    const { name, email } = req.body;
    let finded = await userModel.findOne({ email });
    if (finded) return next(new AppErr("already exist", 400));

    let user = await userModel.create({ name, email });
    res.json({ "message": "success", user });
});

const signIn = catchAsyncErr(async (req, res, next) => {
    const { email } = req.body;
    let user = await userModel.findOne({ email });

    if (!user) {
        return next(new AppErr("Email not found", 400));
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60000); // OTP valid for 10 minutes
    await userModel.updateOne({ email }, { otp, otpExpires });

    sendEmail(email, 'Your OTP', `Your OTP is ${otp}`);

    res.json({ "message": "OTP sent" });
});

const verifyOTP = catchAsyncErr(async (req, res, next) => {
    const { email, otp } = req.body;
    let user = await userModel.findOne({ email });

    if (!user || user.otp !== otp || new Date() > new Date(user.otpExpires)) {
        return next(new AppErr("Invalid or expired OTP", 400));
    }

    await userModel.updateOne({ email }, { otp: null, otpExpires: null });

    let token = jwt.sign({ user }, 'myNameIsMelad');
    res.json({ "message": "success", token });
});
export {
    signUp, signIn,verifyOTP
}



