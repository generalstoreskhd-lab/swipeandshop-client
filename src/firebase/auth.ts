import { getAuth, signOut } from "@react-native-firebase/auth/lib/modular";
import nativeAuth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { db } from "../config/firebaseConfig";

/**
 * Collection name for client user profiles in Firestore.
 */
const CLIENT_COLLECTION = "users-client";

type ClientProfile = {
    name: string;
    email: string;
    phone: string | null;
    role: 'client';
};

const fallbackProfileForUser = (user: FirebaseAuthTypes.User): ClientProfile => ({
    name: user.displayName || "User",
    email: user.email || "",
    phone: user.phoneNumber,
    role: 'client',
});

/**
 * Reads the client's Firestore profile and creates a default one if missing.
 */
export const getOrCreateClientProfile = async (user: FirebaseAuthTypes.User): Promise<ClientProfile> => {
    const fallbackProfile = fallbackProfileForUser(user);

    const userRef = db.collection(CLIENT_COLLECTION).doc(user.uid);
    const userDoc = await userRef.get();

    if (userDoc.exists()) {
        const data = userDoc.data();
        if (data) {
            return {
                name: (data.name as string | undefined) || fallbackProfile.name,
                email: (data.email as string | undefined) || fallbackProfile.email,
                phone: (data.phone as string | null | undefined) || fallbackProfile.phone,
                role: 'client',
            };
        }
    }

    await userRef.set({
        uid: user.uid,
        name: fallbackProfile.name,
        email: fallbackProfile.email,
        phone: fallbackProfile.phone,
        role: 'client',
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
    });

    return fallbackProfile;
};

/**
 * Verifies a Phone Auth OTP and retrieves or creates the client's profile.
 */
export const verifyOtpAndGetProfile = async (verificationId: string, code: string) => {
    // TODO: [DEBUG] Remove after fixes
    console.log("[Firebase:Auth] verifyOtpAndGetProfile called | verificationId present:", !!verificationId, "| code length:", code.length);

    const credential = nativeAuth.PhoneAuthProvider.credential(verificationId, code);

    // TODO: [DEBUG] Remove after fixes
    console.log("[Firebase:Auth] PhoneAuthProvider credential created, calling signInWithCredential...");
    const userCredential = await nativeAuth().signInWithCredential(credential);
    const uid = userCredential.user.uid;

    // TODO: [DEBUG] Remove after fixes
    console.log("[Firebase:Auth] signInWithCredential SUCCESS | uid:", uid);
    const profile = await getOrCreateClientProfile(userCredential.user);

    return {
        uid,
        isNewUser: profile.name === "User",
        phone: userCredential.user.phoneNumber,
        profile
    };
};

/**
 * Creates a new client profile in Firestore after phone verification.
 */
export const createClientProfile = async (uid: string, name: string, phone: string | null) => {
    const user = getAuth().currentUser;
    if (!user || user.uid !== uid) {
        throw new Error("User session not found.");
    }

    const profileData = {
        name: name.trim(),
        email: user.email || "",
        phone,
        role: 'client' as const,
    };

    // TODO: [DEBUG] Remove after fixes
    console.log("[Firebase:Firestore] createClientProfile | uid:", uid, "| name:", name, "| phone:", phone);
    await db.collection(CLIENT_COLLECTION).doc(uid).set({
        uid,
        ...profileData,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
    });

    // TODO: [DEBUG] Remove after fixes
    console.log("[Firebase:Firestore] createClientProfile SUCCESS for uid:", uid);

    return {
        name: profileData.name,
        email: ""
    };
};

/**
 * Updates a client's delivery address.
 */
export const updateClientAddress = async (uid: string, address: { apartment: string, locality: string, landmark?: string }) => {
    const user = getAuth().currentUser;
    if (!user || user.uid !== uid) {
        throw new Error("User session not found.");
    }

    // TODO: [DEBUG] Remove after fixes
    console.log("[Firebase:Firestore] updateClientAddress | uid:", uid, "| address:", JSON.stringify(address));

    await db.collection(CLIENT_COLLECTION).doc(uid).update({
        address,
        updatedAt: firestore.FieldValue.serverTimestamp(),
    });

    // TODO: [DEBUG] Remove after fixes
    console.log("[Firebase:Firestore] updateClientAddress SUCCESS for uid:", uid);
};

/**
 * Signs out the current user from Firebase.
 */
export const signOutUser = async () => {
    // TODO: [DEBUG] Remove after fixes
    console.log("[Firebase:Auth] signOutUser called for uid:", getAuth().currentUser?.uid);
    await signOut(getAuth());
    // TODO: [DEBUG] Remove after fixes
    console.log("[Firebase:Auth] signOut SUCCESS");
};
