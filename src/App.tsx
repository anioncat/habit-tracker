import dayjs from "dayjs";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import * as Pages from "./pages";
import { Footer } from "./components";
import { useSelectionStore } from "./stores";

export const App = () => {
  const setSelection = useSelectionStore((s) => s.setSelection);

  // Set default to now
  useEffect(() => {
    const t = new Date().getTime();
    const djs = dayjs(t);
    const year = djs.year();
    const month = djs.month() + 1;
    const date = djs.date();
    setSelection(year, month, date);
  }, [setSelection]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Pages.Landing />} />
        <Route path="/entry/:year/:month/:date" element={<Pages.DayView />} />
        <Route path="*" element={<Pages.Landing />} />
      </Routes>
      <Footer />
    </>
  );
};
