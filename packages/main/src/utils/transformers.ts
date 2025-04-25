export const parseDescription = (description: string) : string[] => {
    const splitted = description.split("("),
        namedLocation = splitted[0].trim();
    
    return splitted.length > 1 ? [namedLocation, splitted[1].replaceAll(")", "")] : [namedLocation, ""];
}
  
  export const getRegionFromLatLon = (lat: number, lon: number): string => {
    if (lat >= 35 && lat <= 54 && lon >= -10 && lon <= 15) return "Western Europe";
    if (lat >= 35 && lat <= 54 && lon >= 15 && lon <= 40) return "Eastern Europe";
    if (lat >= 55 && lat <= 80 && lon >= -10 && lon <= 40) return "Northern Europe";
  
    if (lat >= 0 && lat <= 35 && lon >= 35 && lon <= 70) return "Middle East";
    if (lat >= -35 && lat <= 34 && lon >= -20 && lon <= 50) return "Africa";
  
    if (lat >= 15 && lat <= 70 && lon >= -166 && lon <= -100) return "North West America";
    if (lat >= 15 && lat <= 70 && lon >= -99 && lon <= -60) return "North East America";
    if (lat >= -60 && lat <= 14 && lon >= -90 && lon <= -30) return "South America";
  
    if (lat >= 0 && lat <= 50 && lon >= 60 && lon <= 150) return "Asia";
  
    if (lat >= -50 && lat <= 0 && lon >= 110 && lon <= 180) return "Oceania";
    if (lat <= -60) return "Antarctica";
  
    return "Unknown";
  }