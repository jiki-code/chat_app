// lib/firebaseAdmin.ts
import { getApps, initializeApp, cert, applicationDefault } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const app = getApps().length
  ? getApps()[0]
  : initializeApp(
      process.env.FIREBASE_ADMIN_PROJECT_ID
        ? {
            credential: cert({
              projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
              clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
              privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
            }),
          }
        : { credential: applicationDefault() } // dùng GOOGLE_APPLICATION_CREDENTIALS nếu bạn set
    );

export const adminAuth = getAuth(app);
