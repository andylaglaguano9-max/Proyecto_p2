import styles from './equipo.module.css';

/**
 * Página Equipo (Estudiante A)
 */
const Equipo = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Nuestro Equipo</h1>
      <p className={styles.subtitle}>Conoce a los desarrolladores detrás de EcoMetrics</p>
      
      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.avatar}>A</div>
          <h2>Estudiante A</h2>
          <p className={styles.role}>Estructura y Diseño</p>
          <p>Encargado(a) del desarrollo de componentes base (Header, Footer, Layout) y las vistas estáticas con CSS Modules.</p>
        </div>
        
        <div className={styles.card}>
          <div className={styles.avatar}>B</div>
          <h2>Estudiante B</h2>
          <p className={styles.role}>Lógica y Datos</p>
          <p>Encargado(a) del enrutamiento, formularios interactivos, servicios asíncronos y almacenamiento de datos.</p>
        </div>
      </div>
    </div>
  );
};

export default Equipo;
