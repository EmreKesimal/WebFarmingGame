"use client"
import AuthBox from "../../components/authBox"
import styles from "../../modules/auth.module.css"
import { useRouter } from "next/navigation";
export default function LogIn(){
    const router = useRouter();
    function handleAuthNavigation(){
        router.push("/auth/pages/signup")
    }
    return(
        <div className={styles.container}>
            <h1 className={styles.title}>Farming Garden</h1>
            <AuthBox isLogin = {true} />
            <button className = {styles.btn} onClick={handleAuthNavigation}> You Dont Have a Account?</button>
        </div>
    )
}