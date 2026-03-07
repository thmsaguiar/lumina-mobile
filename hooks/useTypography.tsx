import { TypographyContext } from "@context/TypographyContext";
import { useContext } from "react";

export const useTypography = () => {
  const context =  useContext(TypographyContext);

  if (!context) {
    throw new Error("O método useTypography deve ser usado dentro de um TypographyProvider.");
  }

  return context;
};