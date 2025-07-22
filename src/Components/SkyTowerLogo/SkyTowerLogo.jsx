import React from "react";
import { Link } from "react-router";

const SkyTowerLogo = () => {
  return (
    <Link to='/' className="flex items-center gap-2 select-none">
      <span className="font-bold text-2xl tracking-wide">
        Sky<span className="text-primary">Tower</span>
      </span>
    </Link>
  );
};

export default SkyTowerLogo;
