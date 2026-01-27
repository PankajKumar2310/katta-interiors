import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Package, Settings, LogOut, Edit, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { updateProfile, changePassword } from '@/services/profileApi';

const Account = () => {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [editName, setEditName] = useState(user?.name || '');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const orders: any[] = [];

  const handleLogout = () => {
    logout();
    toast({ title: 'Logged out' });
    navigate('/login');
  };

  const handleUpdateProfile = async () => {
    if (!token || !editName.trim()) return;
    try {
      const res = await updateProfile(token, editName.trim());
      toast({ title: 'Profile updated' });
      setIsEditingProfile(false);
    } catch (err: any) {
      toast({ title: 'Update failed', description: err.message, variant: 'destructive' });
    }
  };

  const handleChangePassword = async () => {
    if (!token || !currentPassword || !newPassword) return;
    try {
      await changePassword(token, currentPassword, newPassword);
      toast({ title: 'Password changed' });
      setCurrentPassword('');
      setNewPassword('');
      setIsChangingPassword(false);
    } catch (err: any) {
      toast({ title: 'Password change failed', description: err.message, variant: 'destructive' });
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  // Orders will be fetched dynamically when API is ready

  return (
    <div className="min-h-screen bg-white font-poppins">
      <Navigation />
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-playfair font-bold text-gray-900 mb-8">My Account</h1>
          
          {/* Profile Card */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <CardTitle>Profile Information</CardTitle>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setIsEditingProfile(!isEditingProfile)}>
                  <Edit className="h-4 w-4 mr-1" />
                  {isEditingProfile ? 'Cancel' : 'Edit'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-lg">{user.name}</p>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
              {isEditingProfile && (
                <div className="space-y-4 border-t pt-4">
                  <div>
                    <Label htmlFor="editName">Name</Label>
                    <Input
                      id="editName"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder="Your name"
                    />
                  </div>
                  <Button onClick={handleUpdateProfile} disabled={!editName.trim()}>
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order History */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Package className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Order History</h2>
              </div>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Order {order.id}</p>
                      <p className="text-sm text-gray-600">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{order.total}</p>
                      <span className={`text-sm ${order.status === 'Delivered' ? 'text-green-600' : 'text-blue-600'}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              {orders.length === 0 && (
                <p className="text-center text-gray-500 py-8">No orders yet. Start shopping!</p>
              )}
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Settings className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Account Settings</h2>
              </div>
              <div className="space-y-4">
                <Button variant="ghost" className="w-full justify-start">Manage Address Book</Button>
                <Button variant="ghost" className="w-full justify-start">Payment Methods</Button>
                <Button variant="ghost" className="w-full justify-start">Notification Preferences</Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setIsChangingPassword(!isChangingPassword)}
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
                {isChangingPassword && (
                  <div className="space-y-3 border-t pt-4">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter current password"
                      />
                    </div>
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password (min 6 chars)"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleChangePassword} disabled={!currentPassword || newPassword.length < 6}>
                        Update Password
                      </Button>
                      <Button variant="outline" onClick={() => setIsChangingPassword(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
                <Button variant="outline" onClick={handleLogout} className="w-full justify-start text-red-600 hover:text-red-700">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Account;