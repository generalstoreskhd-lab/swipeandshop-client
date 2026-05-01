const mockSignInWithCredential = jest.fn();
const mockCredential = jest.fn();

const mockGetDoc = jest.fn();
const mockSetDoc = jest.fn();
const mockUpdateDoc = jest.fn();
const mockDoc = jest.fn();
const mockServerTimestamp = jest.fn(() => "server-ts");

const mockSignOut = jest.fn();

jest.mock("firebase/auth", () => ({
  PhoneAuthProvider: { credential: (...args: unknown[]) => mockCredential(...args) },
  signInWithCredential: (...args: unknown[]) => mockSignInWithCredential(...args),
}));

jest.mock("firebase/firestore", () => ({
  doc: (...args: unknown[]) => mockDoc(...args),
  getDoc: (...args: unknown[]) => mockGetDoc(...args),
  setDoc: (...args: unknown[]) => mockSetDoc(...args),
  updateDoc: (...args: unknown[]) => mockUpdateDoc(...args),
  serverTimestamp: (...args: unknown[]) => mockServerTimestamp(...args),
}));

jest.mock("../../src/config/firebaseConfig", () => ({
  auth: {
    currentUser: null,
    signOut: (...args: unknown[]) => mockSignOut(...args),
  },
  db: { kind: "db" },
}));

import {
  verifyOtpAndGetProfile,
  createClientProfile,
  updateClientAddress,
  signOutUser,
} from "../../src/firebase/auth";

describe("client firebase auth integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCredential.mockReturnValue({ provider: "phone", token: "otp-token" });
    mockSignInWithCredential.mockResolvedValue({
      user: { uid: "client-1", phoneNumber: "+1234567890" },
    });
    mockDoc.mockImplementation((...parts) => ({ path: parts.join("/") }));
    mockServerTimestamp.mockReturnValue("server-ts");
    mockSignOut.mockResolvedValue(undefined);
  });

  it("returns existing profile when user document exists", async () => {
    mockGetDoc.mockResolvedValue({
      exists: () => true,
      data: () => ({ name: "Client Name", email: "client@demo.com", phone: "+1234567890" }),
    });

    const result = await verifyOtpAndGetProfile("verification-id", "123456");

    expect(result).toEqual({
      uid: "client-1",
      isNewUser: false,
      profile: {
        name: "Client Name",
        email: "client@demo.com",
        phone: "+1234567890",
        role: "client",
      },
    });
    expect(mockCredential).toHaveBeenCalledWith("verification-id", "123456");
  });

  it("returns isNewUser when profile document is missing", async () => {
    mockGetDoc.mockResolvedValue({ exists: () => false });

    const result = await verifyOtpAndGetProfile("verification-id", "123456");

    expect(result).toEqual({
      uid: "client-1",
      isNewUser: true,
      phone: "+1234567890",
    });
  });

  it("creates client profile with trimmed name and timestamps", async () => {
    const profile = await createClientProfile("client-2", "  New Client  ", "+1234567890");

    expect(mockSetDoc).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        uid: "client-2",
        name: "New Client",
        phone: "+1234567890",
        role: "client",
        createdAt: "server-ts",
        updatedAt: "server-ts",
      })
    );
    expect(profile).toEqual({ name: "New Client", email: "" });
  });

  it("updates client address with updatedAt timestamp", async () => {
    await updateClientAddress("client-3", {
      apartment: "Flat 1",
      locality: "Main Street",
      landmark: "Near Park",
    });

    expect(mockUpdateDoc).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        address: {
          apartment: "Flat 1",
          locality: "Main Street",
          landmark: "Near Park",
        },
        updatedAt: "server-ts",
      })
    );
  });

  it("signs out user through firebase auth", async () => {
    await signOutUser();
    expect(mockSignOut).toHaveBeenCalled();
  });
});
