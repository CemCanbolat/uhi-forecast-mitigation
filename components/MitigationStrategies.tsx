// not used (for now )

// 'use client';

// import { FC } from 'react';

// interface MitigationStrategy {
//   icon: string;
//   title: string;
//   description: string;
// }

// interface MitigationStrategiesProps {
//   strategies: MitigationStrategy[];
// }

// const MitigationStrategies: FC<MitigationStrategiesProps> = ({ strategies }) => {
//   return (
//     <div className="bg-gray-800 rounded-lg shadow p-3 sm:p-6">
//       <h2 className="text-base sm:text-lg font-semibold  text-white mb-3 sm:mb-4">Mitigation Strategies</h2>
//       <ul className="space-y-2 sm:space-y-3">
//         {strategies.map((strategy, index) => (
//           <li key={index} className="flex items-start">
//             <span className="text-xl sm:text-2xl mr-2 sm:mr-3">{strategy.icon}</span>
//             <div>
//               <p className="text-xs sm:text-sm font-medium  text-white">{strategy.title}</p>
//               <p className="text-[10px] sm:text-xs text-gray-400">{strategy.description}</p>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MitigationStrategies;
