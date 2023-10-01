'use client'

import { useState } from 'react';
import { createUser } from '../utilities/utils';

interface UsersData {
  school_name: string;
  email_address: string;
  phonenumber: string;
  create_password: string;
  last_name: string;
}

const useCreateUsers = (userData: UsersData) => {
  const [user, setUser] = useState<UsersData>({
first_name:'',
last_name:'',
email:'',
password:'',
username:''

  });

  const handleSignUp = async() =>{
    const createdUser = await createUser(userData);
    console.log({createdUser});
    
        setUser(createdUser);

        

  }


  return { handleSignUp, user };
};

export default useCreateUsers;
