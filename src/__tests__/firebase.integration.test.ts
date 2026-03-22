import app, { auth, db, storage } from '../config/firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, query, where, terminate } from 'firebase/firestore';
import { signInAnonymously, signOut } from 'firebase/auth';
import { deleteApp } from 'firebase/app';

describe('Firebase Integration', () => {
    afterAll(async () => {
        // Clean up Firebase connections to prevent open handles
        await terminate(db).catch(() => {});
        await deleteApp(app).catch(() => {});
    });

    
    test('Firebase app should be initialized', () => {
        expect(app).toBeDefined();
        expect(app.name).toBe('[DEFAULT]');
    });

    test('Firebase Auth should be initialized', () => {
        expect(auth).toBeDefined();
        expect(auth.app).toBe(app);
    });

    test('Firebase Firestore should be initialized', () => {
        expect(db).toBeDefined();
        expect(db.app).toBe(app);
    });

    test('Firebase Storage should be initialized', () => {
        expect(storage).toBeDefined();
        expect(storage.app).toBe(app);
    });

    test('Firebase config should use environment variables', () => {
        const options = app.options as any;
        expect(options.apiKey).toBeDefined();
        expect(options.authDomain).toBeDefined();
        expect(options.projectId).toBeDefined();
    });

    describe('Firestore Functional Tests', () => {
        const testCollection = '_test_integration_';
        let testDocId: string;

        test('Should be able to write to Firestore (if rules allow)', async () => {
            try {
                const testData = {
                    message: 'Hello from integration test',
                    timestamp: new Date().toISOString(),
                    test: true
                };

                const docRef = await addDoc(collection(db, testCollection), testData);
                expect(docRef.id).toBeDefined();
                testDocId = docRef.id;
            } catch (error: any) {
                if (error.code === 'permission-denied') {
                    console.warn('Firestore write permission denied. Check your security rules.');
                } else {
                    throw error;
                }
            }
        });

        test('Should be able to read from Firestore (if rules allow)', async () => {
            try {
                const q = query(collection(db, testCollection), where('test', '==', true));
                const querySnapshot = await getDocs(q);
                
                // If write failed, read might still work if rules allow public read
                if (!querySnapshot.empty) {
                    const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    if (testDocId) {
                        expect(docs.some(d => d.id === testDocId)).toBe(true);
                    }
                }
            } catch (error: any) {
                if (error.code === 'permission-denied') {
                    console.warn('Firestore read permission denied. Check your security rules.');
                } else {
                    throw error;
                }
            }
        });


        test('Should be able to delete from Firestore', async () => {
            if (testDocId) {
                await deleteDoc(doc(db, testCollection, testDocId));
                // Verify deletion (internal check)
                const q = query(collection(db, testCollection), where('test', '==', true));
                const querySnapshot = await getDocs(q);
                const docs = querySnapshot.docs.map(doc => doc.id);
                expect(docs).not.toContain(testDocId);
            }
        });
    });

    describe('Auth Functional Tests', () => {
        test('Should be able to sign in anonymously (if enabled)', async () => {
            try {
                const userCredential = await signInAnonymously(auth);
                expect(userCredential.user).toBeDefined();
                expect(userCredential.user.isAnonymous).toBe(true);
                
                // Clean up
                await signOut(auth);
                expect(auth.currentUser).toBeNull();
            } catch (error: any) {
                if (error.code === 'auth/admin-restricted-operation' || error.code === 'auth/operation-not-allowed') {
                    console.warn('Anonymous auth is not enabled in the Firebase console. Skipping functional auth test.');
                } else {
                    throw error;
                }
            }
        });
    });

});

