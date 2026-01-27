import { AuthUser, ProfileResponse } from './authApi';

export const updateProfile = async (token: string, name: string): Promise<ProfileResponse> => {
  const res = await fetch('/api/auth/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to update profile');
  }
  return res.json();
};

export const changePassword = async (token: string, currentPassword: string, newPassword: string): Promise<{ message: string }> => {
  const res = await fetch('/api/auth/change-password', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to change password');
  }
  return res.json();
};
