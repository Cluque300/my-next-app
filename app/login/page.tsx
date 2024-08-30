// app/login/loginpage.tsx

import React from 'react';
import LoginForm from './loginform';
import styles from './login.module.css';

const LoginPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Iniciar Sesión</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;


