"use client";
import React from 'react';
import { Button } from '../ui/button';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';

function SignInButton() {
  const CreateUser = useMutation(api.users.CreateUser);
  const router = useRouter();
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const authRes = await axios.post('/api/auth/login', {
          token: tokenResponse?.access_token,
        });
        const user = authRes.data.user;
        const result = await CreateUser({
          name: user?.name,
          email: user?.email,
          picture: user?.picture,
        });
        const userDetail = {
          ...user,
          _id: result?._id ?? result,
        };
        if (typeof window !== 'undefined') {
          localStorage.setItem('userDetail', JSON.stringify(userDetail));
          localStorage.setItem('jwt', authRes.data.token);
        }
        router.push('/dashboard');
      } catch (err) {
        console.log(err);
      }
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  return (
    <div>
      <Button onClick={googleLogin}>Get Started</Button>
    </div>
  );
}

export default SignInButton;
