'use client'
import { useState } from 'react';
import { createUser } from '../utilities/utils';
interface UsersData {
  school_name: string;
  email_address: string;
  phonenumber: string;
  create_password: string;
  confirm_password: string;
}
const useCreateUsers = (userData: UsersData) => {
  const [user, setUser] = useState<UsersData>({
    school_name:'',
    email_address: '',
    phonenumber: '',
    create_password: '',
    confirm_password: '',
  });
  const handleSignUp = async() =>{
    const createdUser = await createUser(userData);
    console.log({createdUser});
        setUser(createdUser);
  }
  return { handleSignUp, user };
};
export default useCreateUsers;
