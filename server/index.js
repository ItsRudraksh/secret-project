import express from "express";
import cors from "cors";
import cron from "node-cron";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
// import path from "path";
// import url from "url";
import { differenceInDays } from "date-fns";
import moment from "moment-timezone"; // Import moment-timezone

// Load environment variables
dotenv.config();

// Deployment-specific paths
// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// Validate required environment variables
const REQUIRED_ENV_VARS = ["EMAIL_USER", "EMAIL_PASSWORD", "API_KEY"];
REQUIRED_ENV_VARS.forEach((key) => {
  if (!process.env[key]) {
    console.error(`Missing required environment variable: ${key}`);
    process.exit(1); // Exit if a required environment variable is missing
  }
});

const URL = "https://bestieekabdayyy.netlify.app";

cron.schedule(
  "0 */2 * * *", // Runs at the start of every hour
  () => {
    console.log("Sending feedback mail");
    sendServerNotification("Server is being hit and kept running");
  },
  {
    scheduled: true,
    timezone: "Asia/Kolkata", // IST timezone
  }
);

// Set up express
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

// Middleware
app.use(cors());
app.use(express.json());
// app.use(express.static(path.join(__dirname, "../dist"))); // Serve client files

// Handle undefined routes (to support SPA behavior)
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../dist", "index.html"));
// });

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

let bdayImage = "https://rk-whiteboard-bucket.s3.ap-south-1.amazonaws.com/bday-gifs/bday.gif";

// HTML for the birthday email
const getBirthdayEmail = () => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff0f6; border-radius: 15px;">
      <h1 style="color: #db2777; text-align: center; font-size: 28px;">🎉 Happy Birthday, Rudrry! 🎂</h1>
      <div style="text-align: center; margin: 20px 0;">
        <p style="font-size: 20px; color: #4b5563;">✨ Today, the world gets to celebrate YOU! ✨</p>
        <p style="font-size: 18px; color: #4b5563; line-height: 1.6;">
          On this fabulous day, I'd like to remind you that you're like a fine wine—getting better with age (and yes, just as intoxicating). 🍷  
          Your charm could make Cupid jealous, and your smile? It's basically illegal how good it looks.  
          Here's to celebrating the one person who can pull off being gorgeous, hilarious, and completely irresistible all at once.  
        </p>
      </div>
      <div style="background-color: #fce7f3; padding: 20px; border-radius: 10px; margin: 20px 0;">
        <p style="font-style: italic; color: #4b5563; font-size: 16px;">
          "Happy Birthday to the most dazzling, one-of-a-kind masterpiece! Don't let all this birthday attention go to your head…  
          Actually, scratch that—soak it all in. You deserve it, superstar. 🌟"  
        </p>
      </div>
      <p style="text-align: center; color: #4b5563; font-size: 16px;">
        Here's wishing you a day filled with love, laughter, cake (lots of it), and maybe even a surprise or two... 😉  
      </p>
      <div style="text-align: center; margin: 15px 0;">
        <img src="${bdayImage}" alt="Birthday countdown" style="max-width: 100%; border-radius: 10px; margin: 10px 0; max-height: 200px;">
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <p style="color: #be185d; font-size: 18px;">With all the charm I could muster,</p>
        <p style="color: #be185d; font-size: 18px;">Your Kapuuuuu ❤️</p>
      </div>
    </div>
  `;
};

// HTML for special countdown emails (last 3 days)
const getSpecialCountdownEmail = (daysLeft, randomQuote) => {
  // Different themes for each of the last 3 days
  const themes = {
    3: {
      gradient: "from-purple-300 to-pink-200",
      bgColor: "#f3e8ff",
      titleColor: "#9333ea",
      message: "We're getting closer to your special day! Just three more sleeps until we celebrate the amazing person that you are. The countdown is getting exciting, and I hope you're feeling the anticipation too! 💜✨",
      emoji: "✨ 3️⃣ ✨",
      image: "https://rk-whiteboard-bucket.s3.ap-south-1.amazonaws.com/bday-gifs/three.gif"
    },
    2: {
      gradient: "from-blue-300 to-indigo-200",
      bgColor: "#e0f2fe",
      titleColor: "#3b82f6",
      message: "Just TWO DAYS to go until your birthday! I'm already planning how to make your day extra special. You deserve all the love and happiness in the world, my gorgeous bestie! 💙🌟",
      emoji: "✨ 2️⃣ ✨",
      image: "https://rk-whiteboard-bucket.s3.ap-south-1.amazonaws.com/bday-gifs/two.gif"
    },
    1: {
      gradient: "from-pink-300 to-rose-200",
      bgColor: "#fce7f3",
      titleColor: "#ec4899",
      message: "ONE. MORE. DAY! Tomorrow is finally YOUR day! I can hardly contain my excitement to celebrate you. Get ready for the most amazing birthday celebration ever because you're absolutely worth it! 💕🎀",
      emoji: "✨ 1️⃣ ✨",
        image: "https://rk-whiteboard-bucket.s3.ap-south-1.amazonaws.com/bday-gifs/one.gif"
    },
    0: {
      gradient: "from-rose-400 to-red-300",
      bgColor: "#ffe4e6",
      titleColor: "#e11d48",
      message: "It's happening! Just HOURS away from your birthday! By this time tomorrow, you'll be celebrating your special day. I'm counting every minute until we can officially celebrate you! 💖✨",
      emoji: "⏰ ✨ ⏰",
      image: "https://rk-whiteboard-bucket.s3.ap-south-1.amazonaws.com/bday-gifs/zero.gif"
    }
  };

  const theme = themes[daysLeft];

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(to bottom right, ${theme.bgColor}, white); border-radius: 15px; border: 2px solid #f472b6;">
      <h1 style="color: ${theme.titleColor}; text-align: center; font-size: 28px;">
        ${theme.emoji} ${daysLeft === 0 ? 'Hours' : daysLeft === 1 ? 'Day' : 'Days'} Until Your Birthday! ${theme.emoji}
      </h1>
      
      <div style="text-align: center; margin: 15px 0;">
        <img src="${theme.image}" alt="Birthday countdown" style="max-width: 100%; border-radius: 10px; margin: 10px 0; max-height: 200px;">
      </div>
      
      <div style="text-align: center; margin: 20px 0;">
        <p style="font-size: 18px; color: #4b5563; line-height: 1.6;">
          Hey Rudrry! 
          <br><br>
          ${theme.message}
        </p>
      </div>
      
      <div style="background-color: white; padding: 20px; border-radius: 10px; margin: 20px 0; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <p style="font-style: italic; color: #4b5563; font-size: 16px;">
          "${randomQuote.text}"
        </p>
        <p style="text-align: right; color: #6b7280;">- ${randomQuote.author}</p>
      </div>
      
      <p style="text-align: center; color: #4b5563; font-size: 16px; margin-top: 20px;">
        Can't wait to celebrate the incredible person you are! 🎉
      </p>
      
      <div style="text-align: center; margin-top: 20px;">
        <a href="${URL}" style="display: inline-block; padding: 10px 20px; background-color: ${theme.titleColor}; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
          Check Your Birthday Countdown!
        </a>
      </div>
      
      <div style="text-align: center; margin-top: 25px;">
        <p style="color: #be185d; font-size: 18px;">With love and excitement,</p>
        <p style="color: #be185d; font-size: 18px; font-weight: bold;">Your Kapuuuuu ❤️</p>
      </div>
    </div>
  `;
};

// Function to send daily or birthday emails
const sendDailyEmail = async (daysLeft, isBirthday = false, customSubject = null) => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  
  // Determine what type of email to send
  let emailHtml;
  let emailSubject;
  
  if (isBirthday) {
    emailHtml = getBirthdayEmail();
    emailSubject = `🎉 Happy Birthday Rudrry! 🎂`;
  } else if (daysLeft <= 3) {
    // Use special template for last 3 days
    emailHtml = getSpecialCountdownEmail(daysLeft, randomQuote);
    
    // Special subjects for the last 3 days
    if (daysLeft === 3) {
      emailSubject = `✨ Just 3 Days to Go! Your Birthday Countdown is Getting Exciting! ✨`;
    } else if (daysLeft === 2) {
      emailSubject = `💖 2 Days Left! The Excitement is Building! 💖`;
    } else if (daysLeft === 1) {
      emailSubject = `🎀 Just 1 More Day! The Countdown is Almost Over! 🎀`;
    } else if (daysLeft === 0) {
      emailSubject = `✨ Counting Hours to Your Birthday! ✨`;
    } else {
      emailSubject = `${daysLeft} Days Until Your Birthday! 🎉`;
    }
  } else {
    // Regular countdown email for days > 3
    emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #ec4899; text-align: center;">Birthday Countdown! 🎂</h1>
        <p style="font-size: 18px; text-align: center;">Hey Rudrry! Just ${daysLeft} days until your special day!</p>
        <div style="background-color: #fce7f3; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <p style="font-style: italic; color: #4b5563;">"${randomQuote.text}"</p>
          <p style="text-align: right; color: #6b7280;">- ${randomQuote.author}</p>
        </div>
        <p style="text-align: center;">Can't wait to celebrate with you! 🎉</p>
        <p style="text-align: center;"><a href="${URL}">Explore More</a>🎉😎</p>
      </div>
    `;
    emailSubject = `${daysLeft} Days Until Your Birthday! 🎉`;
  }

  // Override with custom subject if provided
  if (customSubject) {
    emailSubject = customSubject;
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "rudrakshkapoor2004@gmail.com, rudrakshisharma86@gmail.com",
    subject: emailSubject,
    html: emailHtml
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Function to send emails for notifications (server started, preparation)
const sendServerNotification = async (message) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "agent1408007@gmail.com", // You can change this to the appropriate recipient
    subject: "Server Notification: Birthday Email Preparation",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #ec4899; text-align: center;">Server Notification</h1>
        <p style="font-size: 18px;">${message}</p>
        <p style="text-align: center;"><a href="${URL}">Explore More</a>🎉😎</p>
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

// Schedule cron jobs with time zone IST (Asia/Kolkata)
const BIRTHDAY_DATE = new Date("2025-03-28");

// Alert at 5:50 PM IST
cron.schedule(
  "50 5 * * *",
  async () => {
    const today = new Date();
    const daysLeft = differenceInDays(BIRTHDAY_DATE, today);
    if (daysLeft > 0) {
      try {
        await sendServerNotification("Doing daily email prep");
        console.log(
          `Countdown prep email sent successfully! Days left: ${daysLeft}`
        );
      } catch (error) {
        await sendServerNotification("unable to do prep");
        console.error("Error sending countdown prep email:", error);
      }
    }
  },
  {
    scheduled: true,
    timezone: "Asia/Kolkata", // Set timezone to IST for this cron job
  }
);

// Countdown emails at 5:55 PM IST
cron.schedule(
  "55 5 * * *",
  async () => {
    const today = new Date();
    const daysLeft = differenceInDays(BIRTHDAY_DATE, today);
    if (daysLeft > 0) {
      try {
        await sendDailyEmail(daysLeft);
        console.log(
          `Countdown email sent successfully! Days left: ${daysLeft}`
        );
      } catch (error) {
        await sendServerNotification("unable to send daily mail");
        console.error("Error sending countdown email:", error);
      }
    }
  },
  {
    scheduled: true,
    timezone: "Asia/Kolkata", // Set timezone to IST for this cron job
  }
);

// Tester at 5 Feb 01:10 AM
cron.schedule(
  "17 4 24 3 *",
  async () => {
    try {
      await sendServerNotification("Tester mail is here for new updates");
      console.log("Tester sent successfully at 04:17 AM!");
    } catch (error) {
      console.error("Error sending tester email:", error);
      await sendServerNotification("Unable to send tester mail");
    }
  },
  {
    scheduled: true,
    timezone: "Asia/Kolkata",
  }
);

// Alert at 11:55 PM
cron.schedule(
  "55 23 27 3 *",
  async () => {
    try {
      await sendServerNotification("Going to send final bday mail");
      console.log("Final bday mail sent successfully at 11:55 PM!");
    } catch (error) {
      console.error("Error sending final bday mail:", error);
      await sendServerNotification("Unable to reach final bday mail");
    }
  },
  {
    scheduled: true,
    timezone: "Asia/Kolkata",
  }
);

// Birthday email at 12:00 AM
cron.schedule(
  "0 0 28 3 *",
  async () => {
    try {
      await sendDailyEmail(0, true);
      console.log("Birthday email sent successfully at 12:00 AM!");
    } catch (error) {
      console.error("Error sending birthday email:", error);
      await sendServerNotification("Unable to send bday mail");
    }
  },
  {
    scheduled: true,
    timezone: "Asia/Kolkata",
  }
);

app.get("/", (req, res) => {
  res.send(`Its working => ${URL}`);
});

// Start the server
app.listen(PORT, () => {
  console.log("Current server time:", new Date().toString());
  console.log("Current time in IST:", moment().tz("Asia/Kolkata").format());
  console.log(`Server is running on port ${PORT}`);
});

// Manual scheduled emails for Rudrry's birthday in March 2024
// 3 days countdown - March 24th, 2024 at 17:55 IST
cron.schedule(
  "55 5 24 3 *",
  async () => {
    try {
      await sendDailyEmail(3);
      console.log("3-day special countdown email sent successfully!");
    } catch (error) {
      console.error("Error sending 3-day special countdown email:", error);
      await sendServerNotification("Unable to send 3-day special countdown email");
    }
  },
  {
    scheduled: true,
    timezone: "Asia/Kolkata",
  }
);

// 2 days countdown - March 25th, 2024 at 17:55 IST
cron.schedule(
  "55 5 25 3 *",
  async () => {
    try {
      await sendDailyEmail(2);
      console.log("2-day special countdown email sent successfully!");
    } catch (error) {
      console.error("Error sending 2-day special countdown email:", error);
      await sendServerNotification("Unable to send 2-day special countdown email");
    }
  },
  {
    scheduled: true,
    timezone: "Asia/Kolkata",
  }
);

// 1 day countdown - March 26th, 2024 at 17:55 IST
cron.schedule(
  "55 5 26 3 *",
  async () => {
    try {
      await sendDailyEmail(1);
      console.log("1-day special countdown email sent successfully!");
    } catch (error) {
      console.error("Error sending 1-day special countdown email:", error);
      await sendServerNotification("Unable to send 1-day special countdown email");
    }
  },
  {
    scheduled: true,
    timezone: "Asia/Kolkata",
  }
);

// 0 days countdown - March 27th, 2024 at 17:55 IST (day before birthday)
cron.schedule(
  "55 5 27 3 *",
  async () => {
    try {
      await sendDailyEmail(0, false, "✨ Counting Hours to Your Birthday! ✨");
      console.log("0-day special countdown email sent successfully!");
    } catch (error) {
      console.error("Error sending 0-day special countdown email:", error);
      await sendServerNotification("Unable to send 0-day special countdown email");
    }
  },
  {
    scheduled: true,
    timezone: "Asia/Kolkata",
  }
);

// Function to test special countdown emails
const sendTestEmail = async (daysLeft, isBirthdayEmail = false) => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  
  // Determine what type of email to send
  let emailHtml;
  let emailSubject;
  
  if (daysLeft === 0) {
    if (isBirthdayEmail) {
      emailHtml = getBirthdayEmail();
      emailSubject = `🎉 [TEST] Happy Birthday Rudrry! 🎂`;
    } else {
      // 0-day countdown email (day before birthday)
      emailHtml = getSpecialCountdownEmail(daysLeft, randomQuote);
      emailSubject = `✨ [TEST] Counting Hours to Your Birthday! ✨`;
    }
  } else if (daysLeft <= 3) {
    // Use special template for last 3 days
    emailHtml = getSpecialCountdownEmail(daysLeft, randomQuote);
    
    // Special subjects for the last 3 days
    if (daysLeft === 3) {
      emailSubject = `✨ [TEST] Just 3 Days to Go! Your Birthday Countdown is Getting Exciting! ✨`;
    } else if (daysLeft === 2) {
      emailSubject = `💖 [TEST] 2 Days Left! The Excitement is Building! 💖`;
    } else if (daysLeft === 1) {
      emailSubject = `🎀 [TEST] Just 1 More Day! The Countdown is Almost Over! 🎀`;
    } else {
      emailSubject = `[TEST] ${daysLeft} Days Until Your Birthday! 🎉`;
    }
  } else {
    // Regular countdown email for days > 3
    emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #ec4899; text-align: center;">Birthday Countdown! 🎂</h1>
        <p style="font-size: 18px; text-align: center;">Hey Rudrry! Just ${daysLeft} days until your special day!</p>
        <div style="background-color: #fce7f3; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <p style="font-style: italic; color: #4b5563;">"${randomQuote.text}"</p>
          <p style="text-align: right; color: #6b7280;">- ${randomQuote.author}</p>
        </div>
        <p style="text-align: center;">Can't wait to celebrate with you! 🎉</p>
        <p style="text-align: center;"><a href="${URL}">Explore More</a>🎉😎</p>
      </div>
    `;
    emailSubject = `[TEST] ${daysLeft} Days Until Your Birthday! 🎉`;
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "agent1408007@gmail.com", // Test recipient
    subject: emailSubject,
    html: emailHtml
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Test email for day ${daysLeft} sent successfully!`);
    return { success: true, message: `Test email for day ${daysLeft} sent successfully!` };
  } catch (error) {
    console.error(`Error sending test email for day ${daysLeft}:`, error);
    return { success: false, message: error.message };
  }
};

// API endpoint to test emails
app.get("/test-email/:days", async (req, res) => {
  // Verify API key for security
  const apiKey = req.query.key;
  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: "Unauthorized. Invalid API key." });
  }

  const daysLeft = parseInt(req.params.days);
  
  // Validate daysLeft
  if (isNaN(daysLeft) || daysLeft < 0) {
    return res.status(400).json({ error: "Days must be a non-negative number." });
  }
  
  try {
    const isBirthday = req.query.birthday === "true";
    const result = await sendTestEmail(daysLeft, isBirthday);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Specific endpoint to test the 0-day countdown email
app.get("/test-countdown-zero", async (req, res) => {
  // Verify API key for security
  const apiKey = req.query.key;
  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: "Unauthorized. Invalid API key." });
  }
  
  try {
    const result = await sendTestEmail(0, false);
    res.json({ success: true, message: "Test 0-day countdown email sent successfully!", details: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Helper endpoint to test all special emails at once
app.get("/test-all-special", async (req, res) => {
  // Verify API key for security
  const apiKey = req.query.key;
  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: "Unauthorized. Invalid API key." });
  }
  
  try {
    const results = [];
    
    // Test days 3, 2, 1
    for (let days = 3; days >= 1; days--) {
      const result = await sendTestEmail(days);
      results.push({ days, ...result });
      
      // Add a small delay between emails
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    // Test 0-day countdown email (counting hours)
    const zeroDayResult = await sendTestEmail(0, false);
    results.push({ days: 0, type: "countdown", ...zeroDayResult });
    
    // Add a small delay between emails
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Test birthday email
    const birthdayResult = await sendTestEmail(0, true);
    results.push({ days: 0, type: "birthday", ...birthdayResult });
    
    res.json({ success: true, results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
