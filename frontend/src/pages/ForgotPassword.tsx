import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock password reset email
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 font-poppins">
        <Navigation />
        <div className="max-w-md w-full space-y-8 text-center">
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <h1 className="text-3xl font-playfair font-bold text-gray-900 mb-4">Check Your Email</h1>
              <p className="text-gray-600 mb-8">We've sent a password reset link to {email}.</p>
              <Button onClick={() => navigate('/login')} className="w-full rounded-full bg-teal-600 hover:bg-teal-700">
                Back to Login
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 font-poppins">
      <Navigation />
      <div className="max-w-md w-full space-y-8">
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-playfair font-bold text-gray-900 mb-2">Forgot Password?</h1>
              <p className="text-gray-600">Enter your email to reset your password.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full rounded-full bg-teal-600 hover:bg-teal-700" disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>
            <div className="mt-6 text-center">
              <Link to="/login" className="text-sm text-teal-600 hover:text-teal-700">
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;