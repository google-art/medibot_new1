// // // import { Routes, Route } from "react-router-dom";
// // // import Hero from "../Components/FirstPage/HeroSection";
// // // import Login from "../Components/FirstPage/LoginForm";
// // // import Signup from "../Components/FirstPage/SignUpPage";
// // // import UniversalTools from "../Components/SecondSection/Universal";

// // // export default function HeroPage() {
// // //   return (
// // //     <Routes>
// // //       <Route index element={<Hero />} />
// // //       <UniversalTools/>
// // //       <Route path="login" element={<Login />} />
// // //       <Route path="signup" element={<Signup />} />
// // //     </Routes>
// // //   );
// // // }



// // // import { useState } from "react";
// // // import UniversalTools from "../Components/SecondSection/Universal";

// // // import Hero from "../Components/FirstPage/HeroSection";
// // // import LeadEnrichmentPage from "../Components/SecondSection/LeadScrappling";
// // // import AutomaticSocialPage from "../Components/SecondSection/AutomaticSocialPage";
// // // import UnifiedLeadMake from "../Components/SecondSection/UnifiedMake";
// // // import ReviewReputation from "../Components/SecondSection/ReviewReputation";
// // // import AIAutoReply from "../Components/SecondSection/Aiautoreply";
// // // import Industry from "../Components/ThirdSection/Industry";
// // // import WhyWyn from "../Components/ThirdSection/whywyn";
// // // import Browse from "../Components/ThirdSection/Browse";
// // // import AutoDocument from "../Components/SecondSection/AutoDocument";


// // // export default function HeroPage() {
// // //   const [activeTool, setActiveTool] = useState(null);

// // //   return (
// // //     <>
// // //     <Hero/>
// // //       <UniversalTools onSelect={setActiveTool} />

// // //       {activeTool === "Lead Scraping & Enrichment" && (
// // //         <LeadEnrichmentPage/>

// // //       )}
// // //       {activeTool === "Automatic Social Media Content" && (
// // //         <AutomaticSocialPage/>
// // //       )}

// // //       {/* {activeTool ==="Unified Lead Intake & CRM Sync" && (
// // //         <UnifiedLeadMake/>

// // //       )} */}

// // //     {
// // //       activeTool=="Auto Document" && (
// // //         <AutoDocument/>
// // //       )
// // //     }

// // //       {
// // //         activeTool ==="Review & Reputation Management" && (
// // //             <ReviewReputation/>
// // //         )
// // //       }
// // //       {
// // //         activeTool ==="AI Auto-Reply & Follow-Up" && (
// // //             <AIAutoReply/>
// // //         )
// // //       }
// // //       <Industry onSelect={setActiveTool}/>
// // //       <WhyWyn/>
// // //       <Browse/>
      
// // //     </>
// // //   );
// // // }



// // import { useState } from "react";

// // import Hero from "../Components/FirstPage/HeroSection";
// // import UniversalTools from "../Components/SecondSection/Universal";

// // import LeadEnrichmentPage from "../Components/SecondSection/LeadScrappling";
// // import AutomaticSocialPage from "../Components/SecondSection/AutomaticSocialPage";
// // import AutoDocument from "../Components/SecondSection/AutoDocument";
// // import ReviewReputation from "../Components/SecondSection/ReviewReputation";
// // import AIAutoReply from "../Components/SecondSection/Aiautoreply";

// // import Industry from "../Components/ThirdSection/Industry";
// // import WhyWyn from "../Components/ThirdSection/whywyn";
// // import Browse from "../Components/ThirdSection/Browse";

// // export default function HeroPage() {
// //   const [activeTool, setActiveTool] = useState(null);

// //   return (
// //     <>
// //       <Hero />

// //       <UniversalTools onSelect={setActiveTool} />

// //       {activeTool === "Lead Scraping & Enrichment" && (
// //         <LeadEnrichmentPage />
// //       )}

// //       {activeTool === "Automatic Social Media Content" && (
// //         <AutomaticSocialPage />
// //       )}

// //       {activeTool === "Auto Document" && (
// //         <AutoDocument />
// //       )}

// //       {activeTool === "Review & Reputation Management" && (
// //         <ReviewReputation />
// //       )}

// //       {activeTool === "AI Auto-Reply & Follow-Up" && (
// //         <AIAutoReply />
// //       )}

// //       <Industry onSelect={setActiveTool} />
// //       <WhyWyn />
// //       <Browse />
// //     </>
// //   );
// // }


// import { useState } from "react";

// import Hero from "../Components/FirstPage/HeroSection";
// import UniversalTools from "../Components/SecondSection/Universal";

// import LeadEnrichmentPage from "../Components/SecondSection/LeadScrappling";
// import AutomaticSocialPage from "../Components/SecondSection/AutomaticSocialPage";
// import AutoDocument from "../Components/SecondSection/AutoDocument";
// import AIInvoice from "../Components/SecondSection/";
// import AIAutoReply from "../Components/SecondSection/Aiautoreply";

// import Industry from "../Components/ThirdSection/Industry";
// import WhyWyn from "../Components/ThirdSection/whywyn";
// import Browse from "../Components/ThirdSection/Browse";

// export default function HeroPage() {
//   const [activeTool, setActiveTool] = useState(null);

//   return (
//     <>
//       {/* ================= HERO ================= */}
//       <Hero />

//       {/* ================= TOOL SELECTOR ================= */}
//       <UniversalTools onSelect={setActiveTool} />

//       {/* ================= TOOL SECTIONS ================= */}

//       {activeTool === "Lead Scraping & Enrichment" && (
//         <LeadEnrichmentPage />
//       )}

//       {activeTool === "Automatic Social Media Content" && (
//         <AutomaticSocialPage />
//       )}

//       {activeTool === "Auto Document" && (
//         <AutoDocument />
//       )}

//       {activeTool === "AI Invoicing & Payment" && (
//         <AIInvoice />
//       )}

//       {activeTool === "AI Auto-Reply & Follow-Up" && (
//         <AIAutoReply />
//       )}

//       {/* ================= STATIC SECTIONS ================= */}
//       <Industry onSelect={setActiveTool} />
//       <WhyWyn />
//       <Browse />
//     </>
//   );
// }



import { useState } from "react";

import Hero from "../Components/FirstPage/HeroSection";
import UniversalTools from "../Components/SecondSection/Universal";

import LeadEnrichmentPage from "../Components/SecondSection/LeadScrappling";
import AutomaticSocialPage from "../Components/SecondSection/AutomaticSocialPage";
import AutoDocument from "../Components/SecondSection/AutoDocument";
import AIInvoice from "../Components/SecondSection/aiinvoice";
import Appointment from "../Components/SecondSection/Appointment";
import AIAutoReply from "../Components/SecondSection/Aiautoreply";

import Industry from "../Components/ThirdSection/Industry";
import WhyWyn from "../Components/ThirdSection/whywyn";
import Browse from "../Components/ThirdSection/Browse";

export default function HeroPage() {
  const [activeTool, setActiveTool] = useState(null);

  return (
    <>
      {/* HERO */}
      <Hero />

      {/* TOOL SELECTOR */}
      <UniversalTools onSelect={setActiveTool} />

      {/* TOOL RENDERING */}
      {activeTool === "Lead Scraping & Enrichment" && (
        <LeadEnrichmentPage />
      )}

      {activeTool === "Automatic Social Media Content" && (
        <AutomaticSocialPage />
      )}

      {activeTool === "Auto Document" && (
        <AutoDocument />
      )}

      {activeTool === "AI Invoicing & Payment" && (
        <AIInvoice />
      )}

      {activeTool === "Appointment Scheduling" && (
        <Appointment />
      )}

      {activeTool === "AI Auto-Reply & Follow-Up" && (
        <AIAutoReply />
      )}

      {/* STATIC SECTIONS */}
      <Industry onSelect={setActiveTool} />
      <WhyWyn />
      <Browse />
    </>
  );
}
