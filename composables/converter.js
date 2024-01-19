export default function useTemperatureConverter() {
    const celsiusToKelvin = (celsius) => {
        return celsius + 273.15;
    };
    return {
        celsiusToKelvin,
    };
}