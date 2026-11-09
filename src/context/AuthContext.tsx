import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../supabase';

export type StudentStatus = 'none' | 'pending' | 'verified' | 'failed';

export interface StudentVerificationRecord {
  status: StudentStatus;
  collegeEmail?: string;
  institutionName?: string;
  verifiedAt?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  isConfigured: boolean;
  savedProductIds: string[];
  studentVerification: StudentVerificationRecord;
  toggleSaveProduct: (productId: string) => Promise<boolean>;
  isProductSaved: (productId: string) => boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ error: string | null }>;
  signUpWithEmail: (email: string, password: string) => Promise<{ error: string | null }>;
  signInWithGoogle: () => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  submitStudentVerification: (collegeEmail: string, institutionName: string) => Promise<{ success: boolean; error?: string }>;
  setStudentStatusMock: (status: StudentStatus) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_USER_KEY = 'pricescout_user';
const LOCAL_STORAGE_SAVED_KEY = 'pricescout_saved_ids';
const LOCAL_STORAGE_STUDENT_KEY = 'pricescout_student_verification';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [savedProductIds, setSavedProductIds] = useState<string[]>([]);
  const [studentVerification, setStudentVerification] = useState<StudentVerificationRecord>({
    status: 'none',
  });

  // 1. Initial Load & Session Setup
  useEffect(() => {
    async function initializeSession() {
      // Load local saved items as immediate baseline
      try {
        const localSaved = localStorage.getItem(LOCAL_STORAGE_SAVED_KEY);
        if (localSaved) {
          setSavedProductIds(JSON.parse(localSaved));
        } else {
          // Preload 1 sample item so Saved page is not empty by default for demo
          setSavedProductIds(['prod-macbook-air-m2', 'prod-sony-wh1000xm5']);
        }

        const localStudent = localStorage.getItem(LOCAL_STORAGE_STUDENT_KEY);
        if (localStudent) {
          setStudentVerification(JSON.parse(localStudent));
        }
      } catch (e) {
        console.error('Local state load error', e);
      }

      // Check real Supabase Auth if configured
      if (isSupabaseConfigured && supabase) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              fullName: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
              avatarUrl: session.user.user_metadata?.avatar_url,
            });
            // Fetch remote saved products from Supabase table
            await fetchSupabaseUserData(session.user.id);
          }

          // Subscribe to auth state changes
          const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            if (session?.user) {
              setUser({
                id: session.user.id,
                email: session.user.email || '',
                fullName: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
                avatarUrl: session.user.user_metadata?.avatar_url,
              });
              await fetchSupabaseUserData(session.user.id);
            } else {
              setUser(null);
            }
          });

          return () => {
            subscription.unsubscribe();
          };
        } catch (err) {
          console.error('Supabase auth error', err);
        }
      } else {
        // Fallback: check localStorage mock user
        const localUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
        if (localUser) {
          try {
            setUser(JSON.parse(localUser));
          } catch (e) {}
        }
      }

      setLoading(false);
    }

    initializeSession();
  }, []);

  // Sync saved to localStorage
  const saveSavedIds = (ids: string[]) => {
    setSavedProductIds(ids);
    try {
      localStorage.setItem(LOCAL_STORAGE_SAVED_KEY, JSON.stringify(ids));
    } catch (e) {}
  };

  // Helper to fetch saved & student records from Supabase tables
  const fetchSupabaseUserData = async (userId: string) => {
    if (!supabase) return;
    try {
      // 1. Fetch saved products
      const { data: savedRows } = await supabase
        .from('saved_products')
        .select('product_id')
        .eq('user_id', userId);

      if (savedRows && savedRows.length > 0) {
        const ids = savedRows.map((r: any) => r.product_id);
        saveSavedIds(ids);
      }

      // 2. Fetch student verification
      const { data: studentRows } = await supabase
        .from('student_verifications')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (studentRows) {
        setStudentVerification({
          status: studentRows.status,
          collegeEmail: studentRows.college_email,
          institutionName: studentRows.institution_name,
          verifiedAt: studentRows.verified_at,
        });
      }
    } catch (err) {
      console.warn('Supabase tables query note:', err);
    }
  };

  // Toggle Save Product
  const toggleSaveProduct = async (productId: string): Promise<boolean> => {
    const isCurrentlySaved = savedProductIds.includes(productId);
    const updatedIds = isCurrentlySaved
      ? savedProductIds.filter((id) => id !== productId)
      : [...savedProductIds, productId];

    saveSavedIds(updatedIds);

    // If Supabase is connected and user is logged in, sync with database
    if (isSupabaseConfigured && supabase && user) {
      try {
        if (isCurrentlySaved) {
          await supabase
            .from('saved_products')
            .delete()
            .eq('user_id', user.id)
            .eq('product_id', productId);
        } else {
          await supabase
            .from('saved_products')
            .insert({ user_id: user.id, product_id: productId });
        }
      } catch (err) {
        console.error('Supabase toggle error', err);
      }
    }

    return !isCurrentlySaved;
  };

  const isProductSaved = (productId: string) => {
    return savedProductIds.includes(productId);
  };

  // Sign In With Email & Password
  const signInWithEmail = async (email: string, password: string) => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) return { error: error.message };
      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email || email,
          fullName: data.user.user_metadata?.full_name || email.split('@')[0],
        });
      }
      return { error: null };
    }

    // Local fallback
    const mockUser: AuthUser = {
      id: `local-user-${Date.now()}`,
      email,
      fullName: email.split('@')[0],
    };
    setUser(mockUser);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(mockUser));
    return { error: null };
  };

  // Sign Up With Email & Password
  const signUpWithEmail = async (email: string, password: string) => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) return { error: error.message };
      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email || email,
          fullName: email.split('@')[0],
        });
      }
      return { error: null };
    }

    // Local fallback
    const mockUser: AuthUser = {
      id: `local-user-${Date.now()}`,
      email,
      fullName: email.split('@')[0],
    };
    setUser(mockUser);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(mockUser));
    return { error: null };
  };

  // Sign In With Google
  const signInWithGoogle = async () => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) return { error: error.message };
      return { error: null };
    }

    // Local simulated Google Sign In
    const mockUser: AuthUser = {
      id: `google-user-${Date.now()}`,
      email: 'student.shopper@iitb.ac.in',
      fullName: 'Aditya (IIT Bombay)',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    };
    setUser(mockUser);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(mockUser));
    return { error: null };
  };

  // Sign Out
  const signOut = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
  };

  // Student Verification Submission
  const submitStudentVerification = async (collegeEmail: string, institutionName: string) => {
    const trimmedEmail = collegeEmail.trim().toLowerCase();
    const isAcademic = trimmedEmail.endsWith('.ac.in') || trimmedEmail.endsWith('.edu') || trimmedEmail.endsWith('.edu.in');

    if (!isAcademic) {
      return {
        success: false,
        error: 'Please enter a valid accredited university email ending in .ac.in or .edu',
      };
    }

    // Set to pending initially
    const newRecord: StudentVerificationRecord = {
      status: 'pending',
      collegeEmail: trimmedEmail,
      institutionName: institutionName.trim(),
    };
    setStudentVerification(newRecord);
    localStorage.setItem(LOCAL_STORAGE_STUDENT_KEY, JSON.stringify(newRecord));

    // If Supabase is connected
    if (isSupabaseConfigured && supabase && user) {
      try {
        await supabase
          .from('student_verifications')
          .upsert({
            user_id: user.id,
            college_email: trimmedEmail,
            institution_name: institutionName.trim(),
            status: 'pending',
          });
      } catch (e) {
        console.error('Supabase student upsert error', e);
      }
    }

    // Simulate verification check (automatic approval after 1.5s for demo testing)
    setTimeout(async () => {
      const verifiedRecord: StudentVerificationRecord = {
        status: 'verified',
        collegeEmail: trimmedEmail,
        institutionName: institutionName.trim(),
        verifiedAt: new Date().toISOString(),
      };
      setStudentVerification(verifiedRecord);
      localStorage.setItem(LOCAL_STORAGE_STUDENT_KEY, JSON.stringify(verifiedRecord));

      if (isSupabaseConfigured && supabase && user) {
        try {
          await supabase
            .from('student_verifications')
            .update({ status: 'verified', verified_at: new Date().toISOString() })
            .eq('user_id', user.id);
        } catch (e) {}
      }
    }, 1500);

    return { success: true };
  };

  // Test toggle function to switch between pending/verified/failed
  const setStudentStatusMock = (status: StudentStatus) => {
    const updated: StudentVerificationRecord = {
      ...studentVerification,
      status,
      verifiedAt: status === 'verified' ? new Date().toISOString() : undefined,
    };
    setStudentVerification(updated);
    localStorage.setItem(LOCAL_STORAGE_STUDENT_KEY, JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isConfigured: isSupabaseConfigured,
        savedProductIds,
        studentVerification,
        toggleSaveProduct,
        isProductSaved,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signOut,
        submitStudentVerification,
        setStudentStatusMock,
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
