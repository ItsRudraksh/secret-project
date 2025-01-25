// index.js
import express from "express";
import cors from "cors";
import cron from "node-cron";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { differenceInDays, format } from "date-fns";
import { quotes } from "../src/data/quotes.ts";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Birthday email HTML
const getBirthdayEmail = () => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff0f6; border-radius: 15px;">
      <h1 style="color: #db2777; text-align: center; font-size: 28px;">🎉 Happy Birthday, Rudrry! 🎂</h1>
      <div style="text-align: center; margin: 20px 0;">
        <p style="font-size: 20px; color: #4b5563;">✨ Today, the world gets to celebrate YOU! ✨</p>
        <p style="font-size: 18px; color: #4b5563; line-height: 1.6;">
          On this fabulous day, I’d like to remind you that you’re like a fine wine—getting better with age (and yes, just as intoxicating). 🍷  
          Your charm could make Cupid jealous, and your smile? It’s basically illegal how good it looks.  
          Here’s to celebrating the one person who can pull off being gorgeous, hilarious, and completely irresistible all at once.  
        </p>
      </div>
      <div style="background-color: #fce7f3; padding: 20px; border-radius: 10px; margin: 20px 0;">
        <p style="font-style: italic; color: #4b5563; font-size: 16px;">
          "Happy Birthday to the most dazzling, one-of-a-kind masterpiece! Don’t let all this birthday attention go to your head…  
          Actually, scratch that—soak it all in. You deserve it, superstar. 🌟"  
        </p>
      </div>
      <p style="text-align: center; color: #4b5563; font-size: 16px;">
        Here's wishing you a day filled with love, laughter, cake (lots of it), and maybe even a surprise or two... 😉  
      </p>
      <div style="text-align: center; margin-top: 20px;">
        <p style="color: #be185d; font-size: 18px;">With all the charm I could muster,</p>
        <p style="color: #be185d; font-size: 18px;">Your Kapuuuuu ❤️</p>
      </div>
    </div>
  `;
};

// Function to send emails
const sendDailyEmail = async (daysLeft, isBirthday = false) => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  const mailOptions = isBirthday
    ? {
        from: process.env.EMAIL_USER,
        to: "rudrakshkapoor2004@gmail.com",
        subject: `🎉 Happy Birthday Rudrry! 🎂`,
        html: getBirthdayEmail(),
      }
    : {
        from: process.env.EMAIL_USER,
        to: "rudrakshkapoor2004@gmail.com, rudrakshisharma86@gmail.com",
        subject: `${daysLeft} Days Until Your Birthday! 🎉`,
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #ec4899; text-align: center;">Birthday Countdown! 🎂</h1>
        <p style="font-size: 18px; text-align: center;">Hey Rudrry! Just ${daysLeft} days until your special day!</p>
        <div style="background-color: #fce7f3; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <p style="font-style: italic; color: #4b5563;">"${randomQuote.text}"</p>
          <p style="text-align: right; color: #6b7280;">- ${randomQuote.author}</p>
        </div>
        <p style="text-align: center;">Can't wait to celebrate with you! 🎉</p>
        <a style="text-align: center;" href="">Explore more</a>
      </div>
    `,
      };

  await transporter.sendMail(mailOptions);
};

// Function to send emails for notifications (server started, preparation)
const sendServerNotification = async (message) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "rudrakshkapoor2004@gmail.com", // You can change this to the appropriate recipient
    subject: "Server Notification: Birthday Email Preparation",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #ec4899; text-align: center;">Server Notification</h1>
        <p style="font-size: 18px;">${message}</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`${message} - Notification sent successfully!`);
  } catch (error) {
    console.error("Error sending server notification email:", error);
  }
};

// Middleware
app.use(cors());
app.use(express.json());

const BIRTHDAY_DATE = new Date("2025-01-27"); //03-28
// 11:50 PM on March 27th - Wake the server
cron.schedule("50 23 26 1 *", async () => {
  const message =
    "Server started and preparing for birthday email at 11:50 PM.";
  await sendServerNotification(message);
  console.log("11:50 PM - Preparing server for birthday email...");
  // Add any specific logic to ensure the server is ready, like warming up services
});

// 11:55 PM on March 27th - Final preparation before sending email
cron.schedule("55 23 26 1 *", async () => {
  const message =
    "Final preparations completed before birthday email at 11:55 PM.";
  await sendServerNotification(message);
  console.log("11:55 PM - Final preparations before birthday email...");
  // Final checks or actions before the 12 AM email is sent
});

// Schedule birthday email at 12 AM //28 3
cron.schedule("0 0 27 1 *", async () => {
  try {
    await sendDailyEmail(0, true);
    console.log("Birthday email sent successfully at 12:00 AM!");
  } catch (error) {
    console.error("Error sending birthday email:", error);
  }
});

// Trigger at 8:50 AM
cron.schedule("50 8 * * *", async () => {
  const message =
    "Server started and preparing for birthday email at 08:50 AM.";
  await sendServerNotification(message);
  console.log("8:50 AM task triggered");
  // Any preparation you need before 9 AM
});

// Trigger at 8:55 AM
cron.schedule("55 8 * * *", async () => {
  const message =
    "Final preparations completed before birthday email at 08:55 AM.";
  await sendServerNotification(message);
  console.log("8:55 AM task triggered");
  // Any last-minute preparation before the 9 AM email
});

// Schedule countdown emails at 9 AM
cron.schedule("0 9 * * *", async () => {
  try {
    const today = new Date();
    const daysLeft = differenceInDays(BIRTHDAY_DATE, today);

    if (daysLeft > 0) {
      await sendDailyEmail(daysLeft);
      console.log(
        `Countdown email sent successfully at 9:00 AM! Days left: ${daysLeft}`
      );
    }
  } catch (error) {
    console.error("Error sending countdown email:", error);
  }
});

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    status: "healthy",
    message: "Birthday countdown server is running!",
  });
});

// Manual trigger endpoint (protected by a simple key)
app.post("/trigger-email", async (req, res) => {
  const { apiKey } = req.body;

  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const today = new Date();
    const daysLeft = differenceInDays(BIRTHDAY_DATE, today);
    const isBirthday =
      format(today, "yyyy-MM-dd") === format(BIRTHDAY_DATE, "yyyy-MM-dd");

    await sendDailyEmail(daysLeft, isBirthday);
    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Birthday countdown server running on port ${PORT}`);
});
