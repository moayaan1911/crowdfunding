import React from "react";
import { useLocation } from "react-router-dom";
export default function Details() {
  const location = useLocation();
  const { campaignId } = location.state;
  return <div>{campaignId}</div>;
}
