import { Auth } from "@/gateway/auth";
import styles from "../page.module.css";

export default function Home() {
    const auth = new Auth()
    auth.login("123","123")
  return (
    <main className={styles.main}>
      login
    </main>
  );
}
