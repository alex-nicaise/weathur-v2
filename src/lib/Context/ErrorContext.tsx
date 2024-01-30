import { createContext, useContext, useState } from "react";
import { ErrorContextType } from "../definitions";

export const ErrorContext = createContext<ErrorContextType | null>(null);

export const ErrorContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [appError, setAppError] = useState({
    message: "",
    name: "",
  });

  return (
    <ErrorContext.Provider value={{ appError, setAppError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useErrorContext = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("No Error Context Found.");
  }

  return context;
};
