import { Redirect } from "expo-router";
import { useFirstAccess } from "../hooks/useFirstAccess";

export default function Index() {
  //const { isFirstAccess } = useFirstAccess();
  const isFirstAccess = true;

  if (isFirstAccess) {
    return <Redirect href="/opening" />;
  }

  return <Redirect href="/home" />;
}
