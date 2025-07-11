"use client"
import AuthBox from "../../components/authBox"
import styles from "../../modules/auth.module.css"
import { useRouter } from "next/navigation";
export default function Signup(){
    const router = useRouter();
    function handleAuthNavigation(){
       router.push("/auth/pages/login");
  }
    return(
        <div className={styles.container}>
            <AuthBox isLogin = {false} />
            <button onClick={handleAuthNavigation}> You Already Have an Account?</button>
        </div>
    )
}