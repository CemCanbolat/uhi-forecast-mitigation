// not used (for now )

// 'use client';

// import { FC } from 'react';

// interface RiskItem {
//   location: string;
//   riskLevel: string;
//   percentage: number;
// }

// interface RiskAssessmentProps {
//   riskData: RiskItem[];
// }

// const RiskAssessment: FC<RiskAssessmentProps> = ({ riskData }) => {
//   // Helper function to render risk assessment item
//   const renderRiskItem = (location: string, riskLevel: string, percentage: number) => (
//     <div>
//       <div className="flex justify-between items-center mb-1">
//         <span className="text-xs sm:text-sm font-medium text-gray-300">{location}</span>
//         <span className={`text-xs sm:text-sm font-medium ${riskLevel === 'Very High Risk' || riskLevel === 'High Risk' ? 'text-red-600' : 'text-orange-500'}`}>
//           {riskLevel}
//         </span>
//       </div>
//       <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
//         <div
//           className={`h-1.5 sm:h-2 rounded-full ${percentage > 80 ? 'bg-red-600' : 'bg-orange-500'}`}
//           style={{ width: `${percentage}%` }}
//         ></div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="bg-gray-800 rounded-lg shadow p-3 sm:p-6">
//       <h2 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Risk Assessment</h2>
//       <div className="space-y-3 sm:space-y-4">
//         {riskData.map((item, index) => (
//           <div key={index}>
//             {renderRiskItem(item.location, item.riskLevel, item.percentage)}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RiskAssessment;
