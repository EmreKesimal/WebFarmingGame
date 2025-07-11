"use client"
import AuthBox from "../../components/authBox"
import styles from "../../modules/auth.module.css"
import { useRouter } from "next/navigation";
export default function LogIn(){
    const router = useRouter();
    function handleAuthNavigation(){
        router.push("../pages/signup")
    }
    return(
        <div className={styles.container}>
            <AuthBox isLogin = {true} />
            <button onClick={handleAuthNavigation}> You Dont Have a Account?</button>
        </div>
    )
}