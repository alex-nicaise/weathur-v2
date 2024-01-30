import { createContext, useContext, useState } from "react";
import { LoadingContextType } from "../definitions";

export const LoadingContext = createContext<LoadingContextType | false>(false);

export const LoadingContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoadingContext = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("No Loading Context Found.");
  }

  return context;
};
