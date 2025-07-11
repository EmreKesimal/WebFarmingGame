"use client"

import { useState } from "react";
import styles from "./authBox.module.css";
import { useRouter } from "next/navigation";

export default function AuthBox({ isLogin }: { isLogin: boolean }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); 

  function handleLogin(){
    const storedEmail = localStorage.getItem("email")
    const storedPassword = localStorage.getItem("password")
    if(storedEmail == email && storedPassword == password){
      navigateToApp();
    }
    else{
      alert("Wrong password or email")
    }
  }

  function handleSignup(){
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    alert('Saved to LocalStorage');
    navigateToApp();
  }

  function navigateToApp(){
    router.push("/game");

  }
  return (
    <div className={styles.container}>
      {isLogin ? <h1>Log In</h1> : <h1>Sign Up</h1>}

      <input 
        type="email" 
        placeholder="Enter your email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}/>
      <input 
        type="password" 
        placeholder="Enter your password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}/>
      
      <button className={styles.btn} onClick={isLogin ? handleLogin : handleSignup}>{isLogin ? "Log In" : "Sign Up"}</button>
    </div>
  );
}
