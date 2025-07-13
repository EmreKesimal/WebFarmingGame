"use client"

import { useState } from "react";
import styles from "./authBox.module.css";
import { useRouter } from "next/navigation";

export default function AuthBox({ isLogin }: { isLogin: boolean }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); 

  function handleLogin() {
    const storedUser = localStorage.getItem("user");
  
    if (!storedUser) {
      alert("No user found");
      return;
    }
  
    const { email: storedEmail, password: storedPassword } = JSON.parse(storedUser);
  
    if (storedEmail === email && storedPassword === password) {
      navigateToApp();
    } else {
      alert("Wrong password or email");
    }
  }
  

  function handleSignup() {
    const user = {
      email,
      password
    };
  
    localStorage.setItem('user', JSON.stringify(user));
  
    alert('Saved to LocalStorage');
    navigateToApp();
  }
  

  function navigateToApp(){
    router.push("/game");

  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{isLogin ? "Log In" : "Sign Up"}</h1>


      <input 
        className={styles.customInput}
        type="email" 
        placeholder="Enter your email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}/>
      <input 
        className={styles.customInput}
        type="password" 
        placeholder="Enter your password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}/>
      
      <button className={styles.btn} onClick={isLogin ? handleLogin : handleSignup}>{isLogin ? "Log In" : "Sign Up"}</button>
    </div>
  );
}
