import Image from 'next/image';
import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseAuth } from '@/utils/FirebaseConfig';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import { CHECK_USER_ROUTE } from '@/utils/ApiRoutes';
import Router from 'next/router';

function login() {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName: name, email, photoURL: profileImage },
    } = await signInWithPopup(firebaseAuth, provider);
    try {
      if (email) {
        const { data } = await axios.post(CHECK_USER_ROUTE, { email });
        if(!data.status){
          Router.push("/onboarding")
        }
      }
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <div className="flex justify-center items-center bg-panel-header-background h-screen flex-col gap-6">
      <div className="flex items-center justify-center gap-2 text">
        <Image src="/whatsapp.gif" alt="whatsapp" width={300} height={300} />
        <span className="text-7xl text-white">Whatsapp</span>
      </div>
      <button
        className="flex justify-center items-center gap-7 bg-search-input-container-background p-5 rounded-lg"
        onClick={handleLogin}
      >
        <FcGoogle className="text-4xl" />
        <span className="text-white text-2xl">Login with Google</span>
      </button>
    </div>
  );
}

export default login;
