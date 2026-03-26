import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../config/firebaseConfig";

/**
 * Collection name for client user profiles in Firestore.
 */
const CLIENT_COLLECTION = "users-client";

/**
 * Verifies a Phone Auth OTP and retrieves the client's profile if it exists.
 */
export const verifyOtpAndGetProfile = async (verificationId: string, code: string) => {
    // TODO: [DEBUG] Remove after fixes
    console.log("[Firebase:Auth] verifyOtpAndGetProfile called | verificationId present:", !!verificationId, "| code length:", code.length);

    const credential = PhoneAuthProvider.credential(verificationId, code);

    // TODO: [DEBUG] Remove after fixes
    console.log("[Firebase:Auth] PhoneAuthProvider credential created, calling signInWithCredential...");
    const userCredential = await signInWithCredential(auth, credential);
    const uid = userCredential.user.uid;

    // TODO: [DEBUG] Remove after fixes
    console.log("[Firebase:Auth] signInWithCredential SUCCESS | uid:", uid);

    // TODO: [DEBUG] Remove after fixes
    console.log("[Firebase:Firestore] Fetching doc from", CLIENT_COLLECTION, "for uid:", uid);
    const userDoc = await getDoc(doc(db, CLIENT_COLLECTION, uid));

    if (userDoc.exists()) {
        // TODO: [DEBUG] Remove after fixes
        console.log("[Firebase:Firestore] Profile found for uid:", uid, "| data:", JSON.stringify(userDoc.data()));
        return {
            uid,
            isNewUser: false,
            profile: {
                name: userDoc.data().name as string,
                email: userDoc.data().email as string || "",
                phone: userDoc.data().phone as string,
                role: 'client' as const
            }
        };
    }

    // TODO: [DEBUG] Remove after fixes
    console.log("[Firebase:Firestore] NO profile found for uid:", uid, "-> isNewUser: true");
    return {
        uid,
        isNewUser: true,
        phone: userCredential.user.phoneNumber
    };
};

/**
 * Creates a new client profile in Firestore after phone verification.
 */
export const createClientProfile = async (uid: string, name: string, phone: string | null) => {
    const profileData = {
        uid,
        name: name.trim(),
        phone,
        role: 'client',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
    };

    // TODO: [DEBUG] Remove after fixes
    console.log("[Firebase:Firestore] createClientProfile | uid:", uid, "| name:", name, "| phone:", phone);
    await setDoc(doc(db, CLIENT_COLLECTION, uid), profileData);

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
    // TODO: [DEBUG] Remove after fixes
    console.log("[Firebase:Firestore] updateClientAddress | uid:", uid, "| address:", JSON.stringify(address));

    await updateDoc(doc(db, CLIENT_COLLECTION, uid), {
        address,
        updatedAt: serverTimestamp()
    });

    // TODO: [DEBUG] Remove after fixes
    console.log("[Firebase:Firestore] updateClientAddress SUCCESS for uid:", uid);
};

/**
 * Signs out the current user from Firebase.
 */
export const signOutUser = async () => {
    // TODO: [DEBUG] Remove after fixes
    console.log("[Firebase:Auth] signOutUser called for uid:", auth.currentUser?.uid);
    await auth.signOut();
    // TODO: [DEBUG] Remove after fixes
    console.log("[Firebase:Auth] signOut SUCCESS");
};
