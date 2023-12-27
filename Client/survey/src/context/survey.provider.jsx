import { createContext, useContext, useEffect, useState } from "react";
const SurveyContext = createContext();
const SurveyProvider = ({ children }) => {
  const [selectedSurvey, setSelectedSurvey] = useState();
  const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <SurveyContext.Provider
      value={{
        selectedSurvey,
        setSelectedSurvey,
        fetchAgain,
        setFetchAgain,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};
export const surveyState = () => {
  return useContext(SurveyContext);
};
export default SurveyProvider;
