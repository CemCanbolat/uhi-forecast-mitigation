// import { FeatureCollection, Feature, Point } from 'geojson';

// export interface MitigationAction {
//   icon: string;
//   action: string;
//   impact: string;
// }
// export interface FeatureProperties {
//   intensity: number;
//   name: string;
//   mitigationActions: MitigationAction[];
// }

// export type HeatIslandFeature = Feature<Point, FeatureProperties>;


// const heatIslandData: FeatureCollection<Point, FeatureProperties> = {
//   type: 'FeatureCollection',
//   features: [
//     {
//       type: 'Feature',
//       properties: {
//         intensity: 0.95,
//         name: 'Taksim Square',
//         mitigationActions: [
//           { icon: '🌳', action: 'Urban tree planting', impact: 'Reduce surface temperature by 2-4°C' },
//           { icon: '🏙️', action: 'Green roofs on surrounding buildings', impact: 'Reduce building energy use by 15-30%' },
//           { icon: '💧', action: 'Permeable pavements', impact: 'Increase water infiltration and reduce runoff' }
//         ]
//       },
//       geometry: {
//         type: 'Point',
//         coordinates: [28.9851, 41.0370]
//       }
//     },
//     {
//       type: 'Feature',
//       properties: {
//         intensity: 0.9,
//         name: 'Grand Bazaar',
//         mitigationActions: [
//           { icon: '🏙️', action: 'Cool roofs', impact: 'Reflect up to 80% of solar radiation' },
//           { icon: '🌬️', action: 'Improved ventilation', impact: 'Enhance air circulation and cooling' },
//           { icon: '🌳', action: 'Vertical gardens', impact: 'Provide shade and evaporative cooling' }
//         ]
//       },
//       geometry: {
//         type: 'Point',
//         coordinates: [28.9680, 41.0100]
//       }
//     },
//     {
//       type: 'Feature',
//       properties: {
//         intensity: 0.85,
//         name: 'Sultanahmet',
//         mitigationActions: [
//           { icon: '💧', action: 'Water features', impact: 'Provide evaporative cooling in public spaces' },
//           { icon: '🏙️', action: 'Shade structures', impact: 'Reduce direct solar radiation exposure' },
//           { icon: '🌳', action: 'Historic-compatible green spaces', impact: 'Preserve heritage while cooling environment' }
//         ]
//       },
//       geometry: {
//         type: 'Point',
//         coordinates: [28.9784, 41.0082]
//       }
//     },
//     {
//       type: 'Feature',
//       properties: {
//         intensity: 0.8,
//         name: 'Kadıköy',
//         mitigationActions: [
//           { icon: '🌊', action: 'Coastal cooling corridors', impact: 'Utilize sea breezes for natural cooling' },
//           { icon: '🌳', action: 'Street tree canopy', impact: 'Create continuous shade along major streets' },
//           { icon: '🏙️', action: 'Building retrofits', impact: 'Improve energy efficiency and reduce waste heat' }
//         ]
//       },
//       geometry: {
//         type: 'Point',
//         coordinates: [29.0300, 40.9900]
//       }
//     },
//     {
//       type: 'Feature',
//       properties: {
//         intensity: 0.75,
//         name: 'Beşiktaş',
//         mitigationActions: [
//           { icon: '🌳', action: 'Pocket parks', impact: 'Create small green spaces throughout urban fabric' },
//           { icon: '🏙️', action: 'Cool pavements', impact: 'Replace dark surfaces with reflective materials' },
//           { icon: '💧', action: 'Rainwater harvesting', impact: 'Collect water for irrigation during dry periods' }
//         ]
//       },
//       geometry: {
//         type: 'Point',
//         coordinates: [29.0100, 41.0430]
//       }
//     },
//     {
//       type: 'Feature',
//       properties: {
//         intensity: 0.7,
//         name: 'Üsküdar',
//         mitigationActions: [
//           { icon: '🌳', action: 'Waterfront greening', impact: 'Enhance natural cooling from water bodies' },
//           { icon: '🏙️', action: 'Green corridors', impact: 'Connect existing parks with tree-lined paths' },
//           { icon: '💧', action: 'Sustainable drainage', impact: 'Manage water resources for cooling' }
//         ]
//       },
//       geometry: {
//         type: 'Point',
//         coordinates: [29.0150, 41.0230]
//       }
//     },
//     {
//       type: 'Feature',
//       properties: {
//         intensity: 0.65,
//         name: 'Bakırköy',
//         mitigationActions: [
//           { icon: '🌳', action: 'Urban forests', impact: 'Create dense tree canopy in available spaces' },
//           { icon: '🏙️', action: 'Green parking lots', impact: 'Reduce asphalt and increase vegetation' },
//           { icon: '💧', action: 'Water-sensitive urban design', impact: 'Integrate water management into planning' }
//         ]
//       },
//       geometry: {
//         type: 'Point',
//         coordinates: [28.8770, 40.9800]
//       }
//     },
//     {
//       type: 'Feature',
//       properties: {
//         intensity: 0.6,
//         name: 'Şişli',
//         mitigationActions: [
//           { icon: '🏙️', action: 'High-rise greening', impact: 'Implement green roofs and walls on tall buildings' },
//           { icon: '🌳', action: 'Commercial district cooling', impact: 'Centralized cooling systems to reduce waste heat' },
//           { icon: '💧', action: 'Misting systems', impact: 'Provide cooling in pedestrian areas during peak heat' }
//         ]
//       },
//       geometry: {
//         type: 'Point',
//         coordinates: [28.9870, 41.0600]
//       }
//     },
//     {
//       type: 'Feature',
//       properties: {
//         intensity: 0.55,
//         name: 'Fatih',
//         mitigationActions: [
//           { icon: '🏙️', action: 'Historic building adaptation', impact: 'Retrofit heritage buildings with cooling features' },
//           { icon: '🌳', action: 'Courtyard greening', impact: 'Transform internal spaces into cool microenvironments' },
//           { icon: '💧', action: 'Traditional fountain restoration', impact: 'Revive historical cooling methods' }
//         ]
//       },
//       geometry: {
//         type: 'Point',
//         coordinates: [28.9500, 41.0200]
//       }
//     },
//     {
//       type: 'Feature',
//       properties: {
//         intensity: 0.4,
//         name: 'Eyüp',
//         mitigationActions: [
//           { icon: '🌳', action: 'Forest preservation', impact: 'Maintain natural cooling assets' },
//           { icon: '🏠', action: 'Residential greening', impact: 'Encourage home gardens and green spaces' },
//           { icon: '💧', action: 'Water conservation', impact: 'Sustainable water management for cooling' }
//         ]
//       },
//       geometry: {
//         type: 'Point',
//         coordinates: [28.9340, 41.0480]
//       }
//     }
//   ]
// };

// export default heatIslandData;
