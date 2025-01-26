import cron from "node-cron";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { differenceInDays } from "date-fns";

// Load environment variables
dotenv.config();

console.log("bg-worker is running");

cron.schedule("*/13 * * * *", async () => {
  console.log("Going good - Task is running every 13 minutes.");
  await sendServerNotification("Job is being hit and kept running");
});

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Quotes data
export const quotes = [
  // Funny Friendship Quotes
  {
    text: "Best friends don't judge each other... they judge other people together! 😈",
    author: "Kapuuu😊",
  },
  {
    text: "True friendship is when you walk into their house and your WiFi connects automatically 📱",
    author: "Kapuuu😊",
  },
  {
    text: "Friends buy you food. Best friends eat your food without asking 🍕",
    author: "Kapuuu😊",
  },
  {
    text: "I don't know what's tighter, our jeans or our friendship 👖",
    author: "Kapuuu😊",
  },
  {
    text: "You're the friend I'd slow run with in a zombie apocalypse 🧟‍♂️",
    author: "Kapuuu😊",
  },
  {
    text: "We're best friends because everyone else sucks 🤷‍♀️",
    author: "Kapuuu😊",
  },
  // Flirty Pre-Birthday Quotes
  {
    text: "Counting down to celebrating the day the world got a whole lot cuter 😘",
    author: "Kapuuu😊",
  },
  {
    text: "T-minus days until we celebrate your fabulousness 💃",
    author: "Kapuuu😊",
  },
  {
    text: "Getting ready to celebrate the birthday of the most amazing person I know 🌟",
    author: "Kapuuu😊",
  },
  // Birthday Anticipation
  {
    text: "Your birthday is coming! Time to practice your surprised face 😮",
    author: "Kapuuu😊",
  },
  {
    text: "Birthday loading... Please wait... 🔄",
    author: "Kapuuu😊",
  },
  {
    text: "Warning: Excessive birthday cuteness approaching 🚨",
    author: "Kapuuu😊",
  },
  // Friendship Goals
  {
    text: "You're the avocado to my toast 🥑",
    author: "Kapuuu😊",
  },
  {
    text: "Partners in crime, best friends in time 🕶️",
    author: "Kapuuu😊",
  },
  {
    text: "You're my favorite notification 📱",
    author: "Kapuuu😊",
  },
  // Flirty Friendship
  {
    text: "You're not just a snack, you're the whole vending machine 🍫",
    author: "Kapuuu😊",
  },
  {
    text: "Too glam to give a damn, that's why we're friends 💅",
    author: "Kapuuu😊",
  },
  {
    text: "Partners in crime, looking fine 🕶️",
    author: "Kapuuu😊",
  },
  // Birthday Week Vibes
  {
    text: "Birthday week loading: Fabulousness at 90% 📊",
    author: "Kapuuu😊",
  },
  {
    text: "Warning: Birthday queen about to slay 👑",
    author: "Kapuuu😊",
  },
  {
    text: "Your birthday glow is already showing ✨",
    author: "Kapuuu😊",
  },
  // Special Friendship Bond
  {
    text: "You're the sparkle in my glitter ✨",
    author: "Kapuuu😊",
  },
  {
    text: "My favorite partner in mischief 😈",
    author: "Kapuuu😊",
  },
  {
    text: "Life's better with your crazy added to mine 🎭",
    author: "Kapuuu😊",
  },

  // Additional Quotes
  {
    text: "Almost time to celebrate the maharani jiii 👑",
    author: "Kapuuu😊",
  },
  {
    text: "Preparing to celebrate the day that made my life infinitely better 🥰",
    author: "Kapuuu😊",
  },
  {
    text: "Getting closer to celebrating my favorite person's special day ✨",
    author: "Kapuuu😊",
  },
  {
    text: "Soon we'll be toasting to your amazingness 🥂",
    author: "Kapuuu😊",
  },
  {
    text: "T-minus days until maximum birthday sparkle ✨",
    author: "Kapuuu😊",
  },
  {
    text: "Getting ready to turn up the birthday magic 🎩",
    author: "Kapuuu😊",
  },
  {
    text: "Birthday vibes intensifying... 📈",
    author: "Kapuuu😊",
  },
  {
    text: "Warming up the birthday dance floor 💃",
    author: "Kapuuu😊",
  },
  {
    text: "You're the cheese to my pizza 🍕",
    author: "Kapuuu😊",
  },
  {
    text: "We're proof that friends don't need to be sane to have fun 🤪",
    author: "Kapuuu😊",
  },
  {
    text: "Almost time for your birthday glow-up ✨",
    author: "Kapuuu😊",
  },
  {
    text: "Birthday countdown mode: ACTIVATED 🚀",
    author: "Kapuuu😊",
  },
  {
    text: "Your birthday radar is beeping louder 📡",
    author: "Kapuuu😊",
  },
  {
    text: "The birthday countdown committee is in session 📋",
    author: "Kapuuu😊",
  },
  {
    text: "Birthday preparations in progress 🎨",
    author: "Kapuuu😊",
  },
  {
    text: "Too fab to care, too blessed to stress ✨",
    author: "Kapuuu😊",
  },
  {
    text: "Queens/Kings supporting queens/kings 👑",
    author: "Kapuuu😊",
  },
  {
    text: "Preparing the birthday runway for tomorrow 👠",
    author: "Kapuuu😊",
  },
  {
    text: "Life's better with your crazy added to mine 🎭",
    author: "Kapuuu😊",
  },
];

// HTML for the birthday email
const getBirthdayEmail = () => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff0f6; border-radius: 15px;">
      <h1 style="color: #db2777; text-align: center; font-size: 28px;">🎉 Happy Birthday, Rudrry! 🎂</h1>
      <p style="font-size: 18px; text-align: center; color: #4b5563;">
        On this fabulous day, I’d like to remind you that you’re like a fine wine—getting better with age. 🍷
      </p>
      <p style="text-align: center; font-size: 16px; color: #4b5563;">
        Here’s to celebrating the one person who can pull off being gorgeous, hilarious, and completely irresistible all at once.
      </p>
      <p style="text-align: center; color: #be185d; font-size: 18px;">Your Kapuuuuu ❤️</p>
    </div>
  `;
};

// Function to send daily or birthday emails
async function sendDailyEmail(daysLeft, isBirthday = false) {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  const mailOptions = isBirthday
    ? {
        from: process.env.EMAIL_USER,
        to: "rudrakshkapoor2004@gmail.com, rudrakshisharma86@gmail.com",
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
            <p style="font-style: italic; color: #4b5563; text-align: right;">"${randomQuote.text}" - ${randomQuote.author}</p>
          </div>
        `,
      };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

// Function to send emails for notifications (server started, preparation)
async function sendServerNotification(message) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "agent1408007@gmail.com", // You can change this to the appropriate recipient
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
}

// Schedule cron jobs
const BIRTHDAY_DATE = new Date("2025-03-28");

// Tester at midnight
cron.schedule("0 0 27 1 *", async () => {
  try {
    await sendServerNotification("Server is always running");
    console.log("Tester email sent successfully at 12:00 AM!");
  } catch (error) {
    console.error("Error sending Tester email:", error);
    await sendServerNotification("Unable to reach tester mail");
  }
});

// Alert at 11.55 PM
cron.schedule("55 23 28 3 *", async () => {
  try {
    await sendServerNotification("Going to send bday mail");
    console.log("Birthday prep email sent successfully at 11:55 PM!");
  } catch (error) {
    console.error("Error sending birthday prep email:", error);
    await sendServerNotification("Unable to reach bday prep mail");
  }
});

// Birthday email at 12 AM
cron.schedule("0 0 28 3 *", async () => {
  try {
    await sendDailyEmail(0, true);
    console.log("Birthday email sent successfully at 12:00 AM!");
  } catch (error) {
    console.error("Error sending birthday email:", error);
    await sendServerNotification("Unable to send bday mail");
  }
});

// Alert at 5:50 PM
cron.schedule("50 17 * * *", async () => {
  const today = new Date();
  const daysLeft = differenceInDays(BIRTHDAY_DATE, today);
  if (daysLeft > 0) {
    try {
      await sendServerNotification("Doing daily email prep");
      console.log(
        `Countdown prep email sent successfully! Days left: ${daysLeft}`
      );
    } catch (error) {
      console.error("Error sending countdown prep email:", error);
      await sendServerNotification("unable to do prep");
    }
  }
});

// Countdown emails at 5:55 PM
cron.schedule("55 17 * * *", async () => {
  const today = new Date();
  const daysLeft = differenceInDays(BIRTHDAY_DATE, today);
  if (daysLeft > 0) {
    try {
      await sendDailyEmail(daysLeft);
      console.log(`Countdown email sent successfully! Days left: ${daysLeft}`);
    } catch (error) {
      await sendServerNotification("unable to send daily mail");
      console.error("Error sending countdown email:", error);
    }
  }
});
