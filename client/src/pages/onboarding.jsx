import React, { useState } from 'react';
import Imgage from 'next/image';
import { useStateProvider } from '@/context/StateContext';
import Input from '@/components/common/Input';
function onboarding() {
  const [{ userInfo }] = useStateProvider();
  const [name, setName] = useState(userInfo?.name ?? '');
  const [about, setAbout] = useState('');
  const [image, setImage] = useState('/default_avatar.png');
  return (
    <div className="bg-panel-header-background h-screen w-screen text-white flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-2">
        <Imgage src="/whatsapp.gif" alt="whatsapp" height={300} width={300} />
        <span className="text-white text-7xl">Whatsapp</span>
      </div>
      <h2 className="text-2xl">Create your profile</h2>
      <div className="flex gap-6 mt-6">
        <div className="flex flex-col items-center justify-center mt-5 gap-6">
          <Input name="Display Name" state={name} setState={setName} label />
          <Input name="About" state={about} setState={setAbout} label />
        </div>
      </div>
    </div>
  );
}

export default onboarding;
