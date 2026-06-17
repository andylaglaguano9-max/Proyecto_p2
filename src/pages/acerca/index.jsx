import styles from './acerca.module.css';

/**
 * Página Acerca de (Estudiante A)
 */
const Acerca = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Acerca de EcoMetrics</h1>
      <div className={styles.content}>
        <p>
          EcoMetrics es una Single Page Application (SPA) desarrollada como proyecto académico para la 
          asignatura de Desarrollo Web de 6to Nivel en Tecnologías de la Información.
        </p>
        <h2>Nuestra Misión</h2>
        <p>
          Proveer una herramienta accesible e intuitiva para concientizar sobre el impacto ambiental, 
          permitiendo calcular la masa de CO2 generada y proporcionar un algoritmo numérico de mitigación 
          (cantidad de árboles a plantar).
        </p>
        <h2>Las Fórmulas (Análisis Cuantitativo)</h2>
        <div className={styles.formula}>
          <code>E_total = (Consumo kWh * Factor_API_Elec) + (Galones Combustible * 10.15)</code>
        </div>
        <div className={styles.formula}>
          <code>Árboles a plantar = Ceil(E_total_kg / 22)</code>
        </div>
      </div>
    </div>
  );
};

export default Acerca;
