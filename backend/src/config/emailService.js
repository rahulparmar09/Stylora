const nodemailer = require("nodemailer");

const emailSend = async (email) => {

    const otp = Math.floor(100000 + Math.random() * 900000);

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        },
    });

    await transporter.sendMail({
        from: `"OTP Wale Bhai 😎" <${process.env.EMAIL}>`,
        to: email,
        subject: "🔥 Your OTP Has Arrived!",
        html: `
        <div style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
            <div style="max-width:500px; margin:auto; background:white; border-radius:10px; padding:20px; text-align:center; box-shadow:0 0 10px rgba(0,0,0,0.1);">
                
                <img src="https://play-lh.googleusercontent.com/SZpyRU_FB9qpQsO8uXRrQcC1RZ-HFvqzmB2aaJ-QdK-PA_Rg-bx90onXgHUcwZpg18k=w240-h480-rw" 
                alt="funny" style="width:100%; border-radius:10px;" />

                <h2 style="color:#333;">Hey there 👋</h2>

                <p style="color:#555; font-size:16px;">
                    Tumhara OTP aa gaya hai bhai 😎<br>
                    Jaldi daal do warna yeh bhi attitude dikha ke expire ho jayega 😂
                </p>

                <h1 style="background:#000; color:#fff; display:inline-block; padding:10px 20px; border-radius:8px; letter-spacing:5px;">
                    ${otp}
                </h1>

                <p style="color:#777; margin-top:20px;">
                    ⏳ Valid for only 5 minutes <br>
                    (jaldi kar warna phir se mangwana padega 😜)
                </p>

                <hr style="margin:20px 0;" />

                <p style="font-size:12px; color:#aaa;">
                    Agar tumne OTP request nahi kiya, toh chill karo — koi tumhara fan hoga 😂
                </p>

            </div>
        </div>
        `
    });

    return otp;
}

module.exports = emailSend;
