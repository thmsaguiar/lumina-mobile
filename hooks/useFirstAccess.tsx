import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

export function useFirstAccess() {
  const [isFirstAccess, setIsFirstAccess] = useState<boolean | null>(null);

  useEffect(() => {
    async function check() {
      const value = await SecureStore.getItemAsync("first_access");

      if (value) {
        setIsFirstAccess(false);
      } else {
        await SecureStore.setItemAsync("first_access", "done");
        setIsFirstAccess(true);
      }
      
    }

    check();
  }, []);

  return { isFirstAccess };
}
