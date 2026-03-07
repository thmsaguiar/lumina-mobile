import { useSettings } from "@hooks/useSettings";
import React, { createContext, useCallback, useMemo } from "react";

// Níveis de escala
const FONT_SCALE_MAP = {
  small: 0.85,
  medium: 1,
  large: 1.25,
};

interface TypographyContextData {
  fontScale: number;
  scaledFontSize: (size: number) => number;
  sizeLevel?: "small" | "medium" | "large";
}

// Contexto
export const TypographyContext = createContext<TypographyContextData>(
  {} as TypographyContextData,
);

// Provider
export const TypographyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { settings } = useSettings();

  // Caso o contexto ainda não tenha carregado ou não exista defaul é medium
  const currentFontSize = settings?.visual?.fontSize || "medium";

  // O cálculo da escala baseado na mudança em SettingsContext
  const fontScale = useMemo(() => {
    return FONT_SCALE_MAP[currentFontSize];
  }, [currentFontSize]);

  const scaledFontSize = useCallback(
    (size: number) => {
      return size * fontScale;
    },
    [fontScale],
  );

  const value = useMemo(
    () => ({
      fontScale,
      scaledFontSize,
    }),
    [fontScale, scaledFontSize],
  );

  return (
    <TypographyContext.Provider value={value}>
      {children}
    </TypographyContext.Provider>
  );
};
