import { guardarCalculo, obtenerHistorial } from './database-service';

/**
 * Servicio de Cálculo de Huella de Carbono (Estudiante B)
 * Realiza peticiones Fetch a una API externa.
 */

// URL simulada de API externa de emisiones eléctricas
const API_URL = 'https://api.carbonintensity.org.uk/intensity'; 

// Factor por galón fijo según el requerimiento
const EMISSION_FACTOR_GALLON = 10.15; // kg CO2 por galón

const getElectricIntensityFactor = async () => {
  try {
    const response = await fetch(API_URL);
    if (response.ok) {
      const data = await response.json();
      return (data.data[0]?.intensity?.actual || 450) / 1000;
    }
  } catch (error) {
    console.warn('Error al conectar con la API externa. Usando factor de emisión por defecto.', error);
  }
  return 0.45;
};

export const calculateEmissions = async (inputs) => {
    const { kwh, gallons, gas = 0, waste = 0, flights = 0 } = inputs;
    
    // Obtener factor eléctrico (o usar fallback)
    const factorElec = await getElectricIntensityFactor();
    
    // Matemática:
    const emisionesElec = parseFloat(kwh) * factorElec;
    const emisionesCombustible = parseFloat(gallons) * EMISSION_FACTOR_GALLON;
    const emisionesGas = parseFloat(gas) * 2.1;
    const emisionesWaste = parseFloat(waste) * 0.5;
    const emisionesFlights = parseFloat(flights) * 90;
    
    // Total CO2
    const totalEmissions = emisionesElec + emisionesCombustible + emisionesGas + emisionesWaste + emisionesFlights;
    
    // Algoritmo Numérico de Mitigación:
    const treesNeeded = Math.ceil(totalEmissions / 22);

    const record = {
      kwh,
      gallons,
      gas,
      waste,
      flights,
      totalEmissions: Number(totalEmissions.toFixed(2)),
      treesNeeded
    };
  
  return await guardarCalculo(record);
};

export const fetchHistory = async () => {
  return await obtenerHistorial();
};
