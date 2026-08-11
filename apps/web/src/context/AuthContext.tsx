import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  auth,
  googleProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from '@/lib/firebase';
import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';

export type UserRole = 'STUDENT' | 'SUPERVISOR' | 'ADMIN';
export type AccountStatus = 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'INACTIVE';
export type StudentRank = 'NEWBIE' | 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT' | 'LEGEND';

export interface MongoUser {
  userId: string;
  firebaseUid: string;
  role: UserRole;
  accountStatus: AccountStatus;
  rank: StudentRank;
  profile: {
    email: string;
    fullName?: string;
    firstName?: string;
    lastName?: string;
    photoUrl?: string;
    university?: string;
    department?: string;
    batch?: string;
    mobile?: string;
  };
  researchProfile?: {
    bio?: string;
    researchInterests?: string[];
  };
  createdAt?: string;
  updatedAt?: string;
}

interface AuthContextType {
  firebaseUser: FirebaseUser | null;
  mongoUser: MongoUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, pass: string) => Promise<void>;
  register: (email: string, pass: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api/v1';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [mongoUser, setMongoUser] = useState<MongoUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const syncUserWithBackend = async (fUser: FirebaseUser): Promise<MongoUser | null> => {
    try {
      const idToken = await fUser.getIdToken();
      setToken(idToken);

      const response = await axios.post(
        `${API_BASE_URL}/auth/sync`,
        {},
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      if (response.data?.success) {
        return response.data.data as MongoUser;
      }
      return null;
    } catch (err: unknown) {
      console.error('Failed to sync user with backend:', err);
      // Sync Failure Safety: Do not treat user as active CMRL member if sync fails
      if (axios.isAxiosError(err) && err.response?.data?.error?.message) {
        setError(err.response.data.error.message);
      } else {
        setError('Failed to synchronize user account with CMRL server.');
      }
      return null;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fUser) => {
      setLoading(true);
      setError(null);
      if (fUser) {
        setFirebaseUser(fUser);
        const mUser = await syncUserWithBackend(fUser);
        setMongoUser(mUser);
      } else {
        setFirebaseUser(null);
        setMongoUser(null);
        setToken(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    setError(null);
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pass);
      const mUser = await syncUserWithBackend(userCredential.user);
      setMongoUser(mUser);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Login failed.');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, pass: string) => {
    setError(null);
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      const mUser = await syncUserWithBackend(userCredential.user);
      setMongoUser(mUser);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Registration failed.');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setError(null);
    setLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const mUser = await syncUserWithBackend(userCredential.user);
      setMongoUser(mUser);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Google sign-in failed.');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setError(null);
    try {
      await signOut(auth);
      setFirebaseUser(null);
      setMongoUser(null);
      setToken(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const refreshUser = async () => {
    if (firebaseUser) {
      const mUser = await syncUserWithBackend(firebaseUser);
      setMongoUser(mUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        mongoUser,
        token,
        loading,
        error,
        login,
        register,
        loginWithGoogle,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
