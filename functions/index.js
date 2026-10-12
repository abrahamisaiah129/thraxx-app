import { onCall, HttpsError } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import { initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import nodemailer from "nodemailer";
import crypto from "node:crypto";

initializeApp();
const db = getFirestore();

// Set with:
// firebase functions:secrets:set GMAIL_USER
// firebase functions:secrets:set GMAIL_APP_PASSWORD
// firebase functions:secrets:set OTP_PEPPER
const GMAIL_USER = defineSecret("GMAIL_USER");
const GMAIL_APP_PASSWORD = defineSecret("GMAIL_APP_PASSWORD");
const OTP_PEPPER = defineSecret("OTP_PEPPER");

const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes
const RESEND_COOLDOWN_MS = 60 * 1000; // 1 minute
const MAX_ATTEMPTS = 5;

const sha256 = (value) =>
  crypto.createHash("sha256").update(value).digest("hex");

const normalizeEmail = (email) =>
  typeof email === "string" ? email.trim().toLowerCase() : "";

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Secrets are only available at runtime, so build the transporter lazily
const getTransporter = () =>
  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // SSL on 465
    auth: { user: GMAIL_USER.value(), pass: GMAIL_APP_PASSWORD.value() },
  });

// ---------- SEND ----------
export const sendEmailOtp = onCall(
  { secrets: [GMAIL_USER, GMAIL_APP_PASSWORD, OTP_PEPPER] },
  async (request) => {
    const email = normalizeEmail(request.data?.email);

    if (!isValidEmail(email)) {
      throw new HttpsError("invalid-argument", "A valid email is required.");
    }

    const ref = db.collection("otp_codes").doc(sha256(email));
    const snap = await ref.get();

    // Basic resend throttling
    if (snap.exists && Date.now() - snap.data().lastSentAt < RESEND_COOLDOWN_MS) {
      throw new HttpsError(
        "resource-exhausted",
        "Please wait a minute before requesting another code."
      );
    }

    // Generate cryptographically secure 6-digit OTP on the server
    const otp = String(crypto.randomInt(100000, 1000000));

    await ref.set({
      hash: sha256(`${email}:${otp}:${OTP_PEPPER.value()}`),
      expiresAt: Date.now() + OTP_TTL_MS,
      lastSentAt: Date.now(),
      attempts: 0,
    });

    try {
      await getTransporter().sendMail({
        from: `"Your App Name" <${GMAIL_USER.value()}>`,
        to: email,
        subject: "Your Account Verification Code",
        html: `
          <div style="font-family: sans-serif; padding: 20px;">
            <h2>Account Verification</h2>
            <p>Use the following One-Time Password (OTP) to complete your signup:</p>
            <h1 style="color: #4CAF50; letter-spacing: 2px;">${otp}</h1>
            <p>This code expires in 10 minutes. If you didn't request it, ignore this email.</p>
          </div>
        `,
      });
      return { success: true, message: "OTP emailed successfully." };
    } catch (error) {
      console.error("Nodemailer Error:", error);
      await ref.delete().catch(() => {});
      throw new HttpsError("internal", "Failed to send verification email.");
    }
  }
);

// ---------- VERIFY ----------
export const verifyEmailOtp = onCall(
  { secrets: [OTP_PEPPER] },
  async (request) => {
    const email = normalizeEmail(request.data?.email);
    const otp = String(request.data?.otp ?? "").trim();

    if (!isValidEmail(email) || !/^\d{6}$/.test(otp)) {
      throw new HttpsError("invalid-argument", "Email and a 6-digit OTP are required.");
    }

    const ref = db.collection("otp_codes").doc(sha256(email));
    const snap = await ref.get();

    if (!snap.exists) {
      throw new HttpsError("not-found", "No code was requested for this email.");
    }

    const data = snap.data();

    if (Date.now() > data.expiresAt) {
      await ref.delete();
      throw new HttpsError("deadline-exceeded", "Code expired. Request a new one.");
    }

    if (data.attempts >= MAX_ATTEMPTS) {
      await ref.delete();
      throw new HttpsError("resource-exhausted", "Too many attempts. Request a new code.");
    }

    const candidate = Buffer.from(sha256(`${email}:${otp}:${OTP_PEPPER.value()}`));
    const stored = Buffer.from(data.hash);
    const match =
      candidate.length === stored.length && crypto.timingSafeEqual(candidate, stored);

    if (!match) {
      await ref.update({ attempts: FieldValue.increment(1) });
      throw new HttpsError("permission-denied", "Incorrect code.");
    }

    await ref.delete(); // single-use
    return { success: true, verified: true };
  }
);

//  below is the credential setup 


// 1. GMAIL_USER: the full Gmail address that will send the emails, e.g. yourapp@gmail.com.

// 2. GMAIL_APP_PASSWORD: the 16-character App Password, not your normal Gmail password. To get it:

// Turn on 2-Step Verification on that Google account.
// Go to myaccount.google.com/apppasswords, create one, and copy the 16 characters (remove any spaces).

// 3. OTP_PEPPER: not from Gmail. It’s a random secret you generate yourself, used when hashing OTPs. Generate one with:

// bash
// node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

// Then store all three as Firebase secrets, not in the code:

// bash
// firebase functions:secrets:set GMAIL_USER
// firebase functions:secrets:set GMAIL_APP_PASSWORD
// firebase functions:secrets:set OTP_PEPPER

// Each command prompts you to paste the value. After that, deploy with firebase deploy --only functions.

// Secrets require the Blaze (pay-as-you-go) plan, which Cloud Functions needs anyway. If you’d rather avoid secrets while testing locally, you can temporarily hardcode the values, but never commit them.






// traxx app password -jrex tlrm vtjr zvoj
// traxx pepper-f307ab7bad1cdc11a867f2b670271cead2c57885d05115edc50e3dd407371678



// to add the above
// firebase functions:secrets:set GMAIL_USER
// # Input your Gmail email (e.g., yourname@gmail.com)

// firebase functions:secrets:set GMAIL_APP_PASSWORD
// # Input your 16-character Google App Password

// firebase functions:secrets:set OTP_PEPPER
// # Paste the random security pepper sequence you generated in step 1
