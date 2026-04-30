const nodemailer = require("nodemailer");

const sendAppointmentMail = async (email, subject, data) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            },
        });

        const {
            username,
            serviceName,
            date,
            time,
            status,
            paymentType,
            paymentStatus,
            amount
        } = data;

        await transporter.sendMail({
            from: `"Salon " <${process.env.EMAIL}>`,
            to: email,
            subject,
            html: `
            <div style="font-family:Arial;background:#f4f4f4;padding:20px">
              <div style="max-width:520px;margin:auto;background:#fff;padding:20px;border-radius:10px">

                <h2 style="text-align:center"> Salon Appointment Update</h2>

                <hr/>

                <p><b>Name:</b> ${username}</p>
                <p><b>Service:</b> ${serviceName}</p>
                <p><b>Date:</b> ${date}</p>
                <p><b>Time:</b> ${time}</p>

                <p><b>Status:</b> ${status}</p>
                <p><b>Payment Type:</b> ${paymentType}</p>
                <p><b>Payment Status:</b> ${paymentStatus}</p>
                <p><b>Amount:</b> ₹${amount}</p>

                <hr/>

                <p style="text-align:center;color:#666">
                  Thanks for choosing our salon 🙌
                </p>

              </div>
            </div>
            `
        });

    } catch (err) {
        console.log("Email error:", err.message);
    }
};

module.exports = sendAppointmentMail;