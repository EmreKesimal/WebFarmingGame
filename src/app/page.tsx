import Image from "next/image";
import Field from "./components/field"
import styles from "./page.module.css"
export default function Home() {

  return(
    <div className={styles.container}>
    <div className={styles.fields}>
      {Array.from({ length: 16 }).map((_, i) => (
        <Field key={i} />
      ))}
    </div>
    </div>
  );
}
