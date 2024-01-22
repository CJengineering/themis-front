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
import { SignIn } from '../main components/SignIn';
import { CreateUserForm } from '../main components/CreateUserForm';

const CreateUser = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="hidden md:flex  ibm-font md:w-1/2 items-center justify-center bg-image-1">
        <div className="fadeInScaleUp">
          <TypographyH1 color="white">Welcome to Themis</TypographyH1>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md">
          <h1 className="text-xl font-bold mb-4 md:hidden">
            Welcome to Themis
          </h1>
          <CreateUserForm></CreateUserForm>
          <h6 className="text-base text-gray-800 my-2">
            If you have successfully created an account, please click
            <a
              className="text-green-500 m-1 hover:text-green-700 underline"
              href="https://themis.communityjameel.io"
            >
              here
            </a>
            to login.   
          </h6>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
