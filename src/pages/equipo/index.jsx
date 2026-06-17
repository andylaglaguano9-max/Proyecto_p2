import styles from './equipo.module.css';

/**
 * Página Equipo (Estudiante A)
 */
const Equipo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Nuestro Equipo</h1>
        <p className={styles.subtitle}>Las mentes creativas detrás de EcoMetrics</p>
      </div>
      
      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.avatarWrapper}>
            <div className={styles.avatar}>AL</div>
          </div>
          <h2>Andy Laglaguano</h2>
          <div className={styles.badge}>Frontend & Diseño</div>
          <p className={styles.description}>Especialista en UI/UX y maquetación interactiva. Creador de la experiencia visual y los componentes dinámicos con React.</p>
        </div>
        
        <div className={styles.card}>
          <div className={styles.avatarWrapper}>
            <div className={styles.avatar}>EL</div>
          </div>
          <h2>Esteban Larco</h2>
          <div className={styles.badge}>Backend & Datos</div>
          <p className={styles.description}>Arquitecto de bases de datos y lógica de servidor. Responsable de la integración con PostgreSQL y despliegue del API.</p>
        </div>
      </div>
    </div>
  );
};

export default Equipo;
