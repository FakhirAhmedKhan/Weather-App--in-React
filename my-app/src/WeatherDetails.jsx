import {
  MapPin,
  Thermometer,
  Eye,
  Wind,
  Droplets,
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  Zap,
} from "lucide-react";

const iconMap = {
  sunny: <Sun className="w-16 h-16 text-yellow-400" />,
  "partly-cloudy": <Cloud className="w-16 h-16 text-gray-400" />,
  rainy: <CloudRain className="w-16 h-16 text-blue-400" />,
  snowy: <CloudSnow className="w-16 h-16 text-blue-200" />,
  stormy: <Zap className="w-16 h-16 text-yellow-500" />,
};

const getIconKey = (main) => {
  const key = main.toLowerCase();
  if (key.includes("cloud")) return "partly-cloudy";
  if (key.includes("rain")) return "rainy";
  if (key.includes("snow")) return "snowy";
  if (key.includes("storm") || key.includes("thunder")) return "stormy";
  if (key.includes("clear") || key.includes("sun")) return "sunny";
  return "sunny";
};

// eslint-disable-next-line no-unused-vars
const DetailCard = ({ Icon, value, unit, label }) => (
  <div className="bg-white/10 rounded-lg p-4 text-center">
    <Icon className="w-8 h-8 text-white/80 mx-auto mb-2" />
    <div className="text-2xl font-bold text-white">{value}</div>
    <div className="text-sm text-white/80">{unit}</div>
    <div className="text-xs text-white/60">{label}</div>
  </div>
);

export default function WeatherDetails({ weather }) {
  if (!weather) return null;

  const weatherIcon = iconMap[getIconKey(weather.condition)] || iconMap.sunny;

  const details = [
    { Icon: Wind, value: weather.windSpeed, unit: "km/h", label: "Wind Speed" },
    { Icon: Droplets, value: weather.humidity, unit: "%", label: "Humidity" },
    { Icon: Eye, value: weather.visibility, unit: "km", label: "Visibility" },
    {
      Icon: Thermometer,
      value: weather.pressure,
      unit: "hPa",
      label: "Pressure",
    },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <MapPin className="w-5 h-5 text-white/80" />
          <h2 className="text-2xl font-bold text-white">
            {weather.city}, {weather.country}
          </h2>
        </div>
        <div className="flex items-center justify-center gap-6 mb-4">
          {weatherIcon}
          <div>
            <div className="text-6xl font-bold text-white">
              {weather.temperature}°
            </div>
            <div className="text-xl text-white/80">{weather.condition}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {details.map((detail, idx) => (
          <DetailCard key={idx} {...detail} />
        ))}
      </div>
    </div>
  );
}
