// app/login/page.tsx
import LoginForm from './loginform';
import styles from './login.module.css';

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.authBox}>
        <div className={styles.top}>
          <img src="/images/isotipohb.svg" alt="Logo Human Bionics" />
          <strong>Human</strong> <span>Bionics</span>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>Iniciar sesión</h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}



