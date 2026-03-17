// 11/06/2026  -  Create and Work By Abishek and Rithanya 

export const getSettings = async () => {
  const res = await fetch("http://localhost:3001/api/settings");

  if (!res.ok) {
    throw new Error("Failed to load settings");
  }

  const json = await res.json();

  if (!json.data || !json.data.length) {
    return null;
  }

  const row = json.data[0];

  return {
    doctorName: row["Full Name"] || "",
    email: row["Email"] || "",
    phone: row["Phoneno"] || "",

    specialization: row["Specialization"] || "",
    qualification: row["Qualification"] || "",
    experience: row["Experience"] || "",

    clinicName: row["Clinic_name"] || "",
    clinicAddress: row["Clinic_address"] || "",
    clinicPhone: row["Clinic_phoneno"] || "",
    clinicEmail:
      row["Clinic_email"] && row["Clinic_email"] !== "undefined"
        ? row["Clinic_email"]
        : "",

    defaultFees: row["Defaultfees"] || "",
    currency: row["Currencytype"] || "",

    logo:
      row["Logo"] && row["Logo"] !== "null"
        ? row["Logo"]
        : null,

    sign:
      row["Sign"] && row["Sign"] !== "null"
        ? row["Sign"]
        : null,

    seal:
      row["Seal"] && row["Seal"] !== "null"
        ? row["Seal"]
        : null,

    profile:
      row["profile"] && row["profile"] !== "null"
        ? row["profile"]
        : null
  };
};