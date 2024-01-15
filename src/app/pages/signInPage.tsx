import React from 'react';

import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import TypographyH1 from '../typoh1';
import {SignIn} from '../main components/SignIn';

const SignInPage = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="hidden md:flex  ibm-font md:w-1/2 items-center justify-center bg-image-1">
        <div className="fadeInScaleUp">
          <TypographyH1 color="white">
            Welcome to 
            Themis
          </TypographyH1>

         
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md">
          <h1 className="text-xl font-bold mb-4 md:hidden">
            Welcome to Themis
          </h1>
       <SignIn></SignIn>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
