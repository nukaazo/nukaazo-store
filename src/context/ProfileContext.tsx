import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { profileService } from '@/services/profile.service';
import { tokenStorage } from '@/utils/tokenStorage';
import { ROUTES } from '@/helper/routes';
import CustomModal from '@/components/common/CustomModal/CustomModal';

export interface UserProfile {
  id: number;
  phone: string;
  email: string;
  name: string;
  extendedAttributes?: {
    dob?: string;
    avatar?: string;
    gender?: string;
    altPhone?: string;
    idDocument?: string;
  };
  role: string;
}

interface ProfileContextType {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  fetchProfile: (forceRefetch?: boolean, signal?: AbortSignal) => Promise<{ profile: UserProfile | null }>;
  updateProfileInCache: (data: Partial<UserProfile>) => void;
  clearProfileCache: () => void;
  logout: (showConfirmation?: boolean) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async (forceRefetch = false, signal?: AbortSignal) => {
    if (profile && !forceRefetch) {
      return { profile };
    }

    const token = tokenStorage.get();
    if (!token) {
      return { profile: null };
    }

    setIsLoading(true);
    setError(null);

    try {
      const userRes = await profileService.getProfile();

      if (signal?.aborted) return { profile: null };

      setProfile(userRes);
      return { profile: userRes };
    } catch (err: any) {
      if (err?.name === 'AbortError') {
        return { profile };
      }
      console.error("Failed to fetch profile in context:", err);
      
      if (err?.statusCode === 401) {
        logout(false);
      }
      
      setError(err?.message || "Failed to fetch profile");
      return { profile };
    } finally {
      if (!signal?.aborted) {
        setIsLoading(false);
      }
    }
  };

  const updateProfileInCache = (data: Partial<UserProfile>) => {
    setProfile((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        ...data,
        extendedAttributes: {
          ...prev.extendedAttributes,
          ...data.extendedAttributes,
        },
      };
    });
  };

  const clearProfileCache = () => {
    setProfile(null);
    setError(null);
  };

  const router = useRouter();
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  const logout = (showConfirmation = true) => {
    const performLogout = () => {
      tokenStorage.remove();
      clearProfileCache();
      router.replace(ROUTES.ROOT);
    };

    if (showConfirmation) {
      setIsLogoutModalVisible(true);
    } else {
      performLogout();
    }
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalVisible(false);
    tokenStorage.remove();
    clearProfileCache();
    router.replace(ROUTES.ROOT);
  };

  useEffect(() => {
    const token = tokenStorage.get();
    if (!token) return;

    const controller = new AbortController();
    fetchProfile(false, controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        isLoading,
        error,
        fetchProfile,
        updateProfileInCache,
        clearProfileCache,
        logout,
      }}
    >
      {children}
      <CustomModal
        visible={isLogoutModalVisible}
        onClose={() => setIsLogoutModalVisible(false)}
        title="Log Out"
        message="Are you sure you want to log out from Nukaazo?"
        type="error"
        buttonText="Log Out"
        showCancel={true}
        cancelText="Cancel"
        onConfirm={handleConfirmLogout}
      />
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}

export default ProfileContext;
