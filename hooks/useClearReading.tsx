import { useSettings } from "@hooks/useSettings";

export function useClearReading() {
  const { settings } = useSettings();
  return {
    isClearReading: settings.cognitiveModes.clearReading,
  };
}
