// 11/03/2026 - Created  and Worked By Rithanya and Abishek

import { useEffect, useState, useRef } from "react";
import { getSettings } from "./settingsService";

export default function useSettings() {

const [settings, setSettings] = useState(null);
const [loading, setLoading] = useState(true);

const fetched = useRef(false);

useEffect(() => {

if (fetched.current) return;
fetched.current = true;

const loadSettings = async () => {
  try {
    const data = await getSettings();
    setSettings(data);
  } catch (err) {
    console.error("Settings error:", err);
  } finally {
    setLoading(false);
  }
};

loadSettings();

}, []);

return { settings, loading };

} 