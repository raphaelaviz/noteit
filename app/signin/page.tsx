'use client'


import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { signIn } from "next-auth/react";
import Image from "next/image";
import logo from '../../public/noteit_logo.webp'
import signin_image from '../../public/signin_image.webp'
  

const SignIn = () => {

    return (
        <div className="flex-center w-full h-full space-x-32 bg-gray-200">
            <div className="signin-container">
                <div className="w-2/5 relative border-r-4 border-gray-800 md:block hidden">
                    <Image
                        src={signin_image}
                        alt="signin_image"
                        fill
                    />  
                </div>
                <div className="md:w-3/5 w-full">
                    <div className="space-y-10">
                        <div className="flex-col flex items-center space-y-4">
                            <div className="flex-col flex items-center">
                            <Image
                                height={12}
                                width={240}
                                src={logo} alt={'logo'}
                                className="mt-8 mb-24"
                            />
                            <h1 className="text-5xl font-bold mb-4">Sign in</h1>
                            </div>
                            <button
                                aria-label="signin-google" 
                                className="flex-center signin-field p-2 transition-transform hover:scale-110"
                                onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000' })}
                            >
                                Continue with Google
                                <span>
                                    <FcGoogle className="text-2xl ml-2" />
                                </span>
                            </button>
                            <button
                                aria-label="signin-github" 
                                className="flex-center signin-field p-2 transition-transform hover:scale-110"
                                onClick={() => signIn('github', { callbackUrl: 'http://localhost:3000' })}
                            >
                                Continue with Github
                                <span>
                                    <FaGithub className="text-2xl ml-2" />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    


}

export default SignIn