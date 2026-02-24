import { SettingsContext } from "@context/SettingsContext";
import { useContext } from "react";

export const useSettings = () => {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error("O método useSettings deve ser usado dentro de um SettingsProvider.");
  }

  return context;
};