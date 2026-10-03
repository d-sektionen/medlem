import GeoPattern from "geopattern";
import { useEffect, useState } from "react";

import { Ppattern } from "./ui.module.css";

const Pattern = ({ seed = null }) => {
  const [pattern, setPattern] = useState(null);

  useEffect(() => {
    setPattern(GeoPattern.generate(seed).toDataUrl());
  }, [seed]);

  return <div className={Ppattern} style={{ backgroundImage: pattern }} />;
};

export default Pattern;
