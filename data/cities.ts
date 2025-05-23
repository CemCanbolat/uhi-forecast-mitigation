export interface CityInfo {
  id: string;
  name: string;
  country: string;
  longitude: number;
  latitude: number;
  zoom: number;
  minZoom: number;
}

const cities: CityInfo[] = [
  {
    id: 'istanbul',
    name: 'Istanbul',
    country: 'Turkey',
    longitude: 28.9784,
    latitude: 41.0082,
    zoom: 10,
    minZoom: 9
  },
  {
    id: 'london',
    name: 'London',
    country: 'United Kingdom',
    longitude: -0.1276,
    latitude: 51.5074,
    zoom: 10,
    minZoom: 8
  }
  ,
  {
    id: 'rotterdam',
    name: 'Rotterdam',
    country: 'Netherlands',
    longitude: 4.47917,
    latitude: 51.9225,
    zoom: 10,
    minZoom: 8
  }
];

export default cities; 