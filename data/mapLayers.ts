import { HeatmapLayer } from 'react-map-gl';

export const heatmapLayer: HeatmapLayer = {
  id: 'heat',
  type: 'heatmap',
  source: 'heatmap-data',
  paint: {
    'heatmap-weight': [
      'interpolate',
      ['linear'],
      ['get', 'intensity'],
      0, 0.1,
      1, 2
    ],
    'heatmap-intensity': [
      'interpolate',
      ['linear'],
      ['zoom'],
      0, 1,
      9, 3,
      16, 5
    ],
    'heatmap-color': [
      'interpolate',
      ['linear'],
      ['heatmap-density'],
      0, 'rgba(236,222,239,0)',
      0.2, 'rgb(255,219,172)',
      0.4, 'rgb(255,171,130)',
      0.6, 'rgb(255,120,86)',
      0.8, 'rgb(224,58,60)',
      1, 'rgb(180,0,50)'
    ],

    'heatmap-radius': [
      'interpolate',
      ['linear'],
      ['zoom'],
      0, 20,
      10, 100,
      12, 150,
      14, 200,
      16, 300,
      18, 400
    ],
    'heatmap-opacity': 0.9
  }
};

export const pointLayer = {
  id: 'points',
  type: 'circle' as const,
  source: 'heatmap-data',
  minzoom: 15, // Only show points when they become clickable (MIN_POPUP_ZOOM)
  paint: {
    'circle-radius': 15,
    'circle-color': [
      'interpolate',
      ['linear'],
      ['get', 'intensity'],
      0.4, '#ffcc00',
      0.6, '#ff9900',
      0.8, '#ff6600',
      1.0, '#ff0000'
    ] as any,
    'circle-opacity': 0.8,
    'circle-stroke-width': 3,
    'circle-stroke-color': '#ffffff',
    'circle-stroke-opacity': 1
  }
};
