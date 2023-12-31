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
      <div className="hidden md:flex md:w-1/2 bg-black items-center justify-center">
        <div className="fadeInScaleUp">
          <TypographyH1 color="white">
            Welcome to <br />
            Themis
          </TypographyH1>

          <img
            src="CJ_LOGO_ENGLISH_WHITE_PNG.png" // Replace with the path to your image
            alt="Descriptive text" // Replace with a descriptive alt text
            className="mt-20 w-20 h-auto " // This ensures the image is pushed to the bottom of the div
          />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 md:hidden">
            Welcome to Themis
          </h1>
       <SignIn></SignIn>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
