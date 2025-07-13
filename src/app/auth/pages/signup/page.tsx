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
            <h1 className={styles.title}>Farming Garden</h1>
            <AuthBox isLogin = {false} />
            <button className={styles.btn} onClick={handleAuthNavigation}> You Already Have an Account?</button>
        </div>
    )
}