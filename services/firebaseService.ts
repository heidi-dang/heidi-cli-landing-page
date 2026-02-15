import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Helper to safely get env vars
const getEnvVar = (key: string) => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key];
  }
  return undefined;
};

// TODO: Replace with your actual Firebase config
// If these are missing, the app will fall back to a "Demo Mode" using localStorage
const firebaseConfig = {
  apiKey: getEnvVar('REACT_APP_FIREBASE_API_KEY'),
  authDomain: getEnvVar('REACT_APP_FIREBASE_AUTH_DOMAIN'),
  projectId: getEnvVar('REACT_APP_FIREBASE_PROJECT_ID'),
  storageBucket: getEnvVar('REACT_APP_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getEnvVar('REACT_APP_FIREBASE_MESSAGING_SENDER_ID'),
  appId: getEnvVar('REACT_APP_FIREBASE_APP_ID')
};

// Check if config is present
const isConfigured = !!firebaseConfig.apiKey;

let auth: any;
let db: any;
let googleProvider: any;

if (isConfigured) {
  try {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    googleProvider = new GoogleAuthProvider();
  } catch (e) {
    console.warn("Firebase initialization failed, falling back to mock mode", e);
  }
}

// Mock Auth implementation for demo purposes when no Firebase keys are present
export const loginWithGoogle = async (): Promise<User | { uid: string, email: string, displayName: string, photoURL: string }> => {
  if (isConfigured && auth) {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } else {
    // Mock login
    console.warn("Firebase not configured. Using Mock Auth.");
    const mockUser = {
      uid: "mock-user-123",
      email: "demo@heidi.cli",
      displayName: "Demo Developer",
      photoURL: "https://picsum.photos/200",
      emailVerified: true,
      isAnonymous: false,
      metadata: {},
      providerData: [],
      refreshToken: "",
      tenantId: null,
      delete: async () => {},
      getIdToken: async () => "mock-token",
      getIdTokenResult: async () => ({} as any),
      reload: async () => {},
      toJSON: () => ({}),
      phoneNumber: null
    };
    localStorage.setItem("heidi_demo_user", JSON.stringify(mockUser));
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockUser;
  }
};

export const logout = async () => {
  if (isConfigured && auth) {
    await signOut(auth);
  } else {
    localStorage.removeItem("heidi_demo_user");
    window.location.reload(); // Force refresh to clear state in this simple demo
  }
};

export const subscribeToAuthChanges = (callback: (user: User | null | any) => void) => {
  if (isConfigured && auth) {
    return onAuthStateChanged(auth, callback);
  } else {
    // Check local storage for mock user
    const stored = localStorage.getItem("heidi_demo_user");
    if (stored) {
      callback(JSON.parse(stored));
    } else {
      callback(null);
    }
    return () => {};
  }
};

export { auth, db };