export function getWindDirection(direction) {
       return [
         "N",
         "N/NE",
         "N/E",
         "E/NE",
         "E",
         "E/SE",
         "SE",
         "S/SE",
         "S",
         "S/SW",
         "SW",
         "W/SW",
         "W",
         "W/NW",
         "NW",
         "N/NW",
       ][Math.round(direction / 22.5) % 16];
     }