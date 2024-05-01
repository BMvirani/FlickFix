"use client";
import React, { useEffect } from "react";
import { facebook_svg, google_svg } from "../../../../helper/svgs/svg";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Login = () => {
  
  const {data:session} = useSession();

  useEffect(()=>{
   if(session){
    redirect("/")
   }
  },[session])
  const handleLoginWithGoogle = ()=>{
    signIn("google");
  }

  const handleLoginWithFacebook = ()=>{
    signIn("facebook");
  }
  return (
    <div className="login-wraper common-padding">
      <div className="container">
        <div className="social-login-wrap">
          <div className="social-login-inner">
            <div className="social-login-title">
              <Image
                src={"/assets/logo.png"}
                alt="logo"
                width={200}
                height={50}
              />
              <h2>Wellcome to FlickFix</h2>
            </div>
            <button className="social-login-google" onClick={handleLoginWithGoogle}>
              {google_svg}Continue with Google
            </button>
            <span>or</span>
            <button className="social-login-facebook" onClick={handleLoginWithFacebook}>
              <i class="bi bi-facebook"></i>Continue with FaceBook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
