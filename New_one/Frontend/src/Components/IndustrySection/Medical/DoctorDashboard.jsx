// // import { useEffect, useState } from "react";

// // export default function DoctorDashboard() {
// //   const [patients, setPatients] = useState([]);

// //   useEffect(() => {
// //     fetch("http://localhost:3001/api/medibot/patients")
// //       .then(res => res.json())
// //       .then(setPatients);
// //   }, []);

// //   return (
// //     <div className="min-h-screen bg-gray-100 p-8">
// //       <h2 className="text-2xl font-semibold mb-6">
// //         🩺 Doctor Dashboard
// //       </h2>

// //       <div className="space-y-4">
// //         {patients.map((p, i) => (
// //           <div
// //             key={i}
// //             className="bg-white p-4 rounded-xl shadow"
// //           >
// //             <p><b>ID:</b> {p.patient_id}</p>
// //             <p><b>Name:</b> {p.patient_name}</p>
// //             <p><b>Symptoms:</b> {p.symptoms}</p>
// //             <p><b>Medicines:</b> {p.medicines}</p>
// //             <p><b>Notes:</b> {p.doctor_notes}</p>
// //             <p>
// //               <b>Follow Up:</b>{" "}
// //               {p.follow_up_required ? "Yes" : "No"}
// //             </p>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }


// import { useEffect, useState } from "react";

// export default function DoctorDashboard() {
//   const [patients, setPatients] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("http://localhost:3001/api/medibot/patients")
//       .then((res) => res.json())
//       .then((data) => {
//         // ✅ Defensive check
//         if (Array.isArray(data)) {
//           setPatients(data);
//         } else {
//           setPatients([]);
//         }
//       })
//       .catch((err) => {
//         console.error("Failed to load patients", err);
//         setPatients([]);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* ================= HEADER ================= */}
//       <header className="bg-black text-white px-8 py-4 flex justify-between items-center">
//         <h1 className="text-xl font-semibold">
//           🩺 Doctor Dashboard
//         </h1>
//         <span className="text-sm text-gray-300">
//           NoteWhisper • MediBot
//         </span>
//       </header>

//       {/* ================= CONTENT ================= */}
//       <main className="p-8 max-w-7xl mx-auto">
//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//           <StatCard
//             title="Total Patients"
//             value={patients.length}
//           />
//           <StatCard
//             title="Follow-ups Required"
//             value={patients.filter(p => p.follow_up_required).length}
//           />
//           <StatCard
//             title="Today's Records"
//             value={patients.filter(p =>
//               new Date(p.created_at).toDateString() ===
//               new Date().toDateString()
//             ).length}
//           />
//         </div>

//         {/* Table */}
//         <div className="bg-white rounded-xl shadow">
//           <div className="px-6 py-4 border-b">
//             <h2 className="text-lg font-semibold">
//               Patient Records
//             </h2>
//           </div>

//           {loading ? (
//             <div className="p-6 text-gray-500">Loading records...</div>
//           ) : patients.length === 0 ? (
//             <div className="p-6 text-gray-500">
//               No patient records found.
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full text-sm">
//                 <thead className="bg-gray-100 text-gray-700">
//                   <tr>
//                     <Th>Patient</Th>
//                     <Th>Symptoms</Th>
//                     <Th>Medicines</Th>
//                     <Th>Follow Up</Th>
//                     <Th>Date</Th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {patients.map((p, i) => (
//                     <tr
//                       key={i}
//                       className="border-b hover:bg-gray-50"
//                     >
//                       <Td className="font-medium">
//                         {p.patient_name || "Unknown"}
//                       </Td>
//                       <Td>{p.symptoms}</Td>
//                       <Td>{p.medicines || "-"}</Td>
//                       <Td>
//                         {p.follow_up_required ? (
//                           <span className="text-red-600 font-semibold">
//                             Yes
//                           </span>
//                         ) : (
//                           <span className="text-green-600">
//                             No
//                           </span>
//                         )}
//                       </Td>
//                       <Td>
//                         {new Date(p.created_at).toLocaleDateString()}
//                       </Td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// /* ================= COMPONENTS ================= */

// function StatCard({ title, value }) {
//   return (
//     <div className="bg-white rounded-xl shadow p-6">
//       <p className="text-gray-500 text-sm">{title}</p>
//       <p className="text-3xl font-bold mt-2">{value}</p>
//     </div>
//   );
// }

// function Th({ children }) {
//   return (
//     <th className="px-6 py-3 text-left font-semibold">
//       {children}
//     </th>
//   );
// }

// function Td({ children, className = "" }) {
//   return (
//     <td className={`px-6 py-4 ${className}`}>
//       {children}
//     </td>
//   );
// }


import { useEffect, useState } from "react";

export default function DoctorDashboard() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/medibot/patients")
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && setPatients(d));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">🩺 Doctor Dashboard</h1>

      {patients.length === 0 && (
        <p className="text-gray-500">No patients yet.</p>
      )}

      <div className="grid gap-4">
        {patients.map((p, i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow">
            <p><b>ID:</b> {p.patient_id}</p>
            <p><b>Symptoms:</b> {p.symptoms}</p>
            <p><b>Medicines:</b> {p.medicines || "-"}</p>
            <p><b>Follow Up:</b> {p.follow_up_required ? "Yes" : "No"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
