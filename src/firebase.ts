import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDocFromServer } from "firebase/firestore";
import sandboxConfig from "../firebase-applet-config.json";

// Your web app's Firebase configuration provided by the user
export const firebaseConfig = {
  apiKey: "AIzaSyDJYUSuWVHDmuCTQZcvjyrPwzNIKhirxPo",
  authDomain: "addictive-marketing.firebaseapp.com",
  projectId: "addictive-marketing",
  storageBucket: "addictive-marketing.firebasestorage.app",
  messagingSenderId: "458655173657",
  appId: "1:458655173657:web:13353b8984a32d19f06e88",
  firestoreDatabaseId: undefined
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); /* CRITICAL: The app will break without this line */
export const auth = getAuth(app);

// Initialize a secondary quiet App for playground content recovery
let sandboxDbInstance: any = null;
try {
  const sandboxApp = initializeApp(sandboxConfig, "sandboxApp");
  sandboxDbInstance = getFirestore(sandboxApp, (sandboxConfig as any).firestoreDatabaseId || undefined);
} catch (err) {
  console.warn("Could not load playground Firestore backup engine:", err);
}
export const sandboxDb = sandboxDbInstance;

export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write",
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
      isAnonymous: auth.currentUser?.isAnonymous || null,
    },
    operationType,
    path
  };
  console.error("Firestore Error: ", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export async function testConnection() {
  try {
    await getDocFromServer(doc(db, "test", "connection"));
  } catch {
    // quiet check
  }
}
