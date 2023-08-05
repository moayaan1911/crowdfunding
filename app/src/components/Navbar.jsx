import React from "react";
import logo from "../assets/logo.png";
import { ConnectWallet } from "@thirdweb-dev/react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-pink-500 md:px-12 flex-nowrap w-auto">
      <div className="flex items-center">
        <img className="h-12 mr-3" src={logo} alt="Logo" />
      </div>

      <ConnectWallet
        theme="light"
        auth={{
          loginOptional: true,
        }}
      />
    </nav>
  );
}
