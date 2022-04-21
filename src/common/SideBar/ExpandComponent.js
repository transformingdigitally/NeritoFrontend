import { useTheme } from "@emotion/react";
import React from "react";

export default function ExpandComponent ({isExpand}){
  const theme = useTheme();
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 40C32.8366 40 40 32.8366 40 24C40 15.1634 32.8366 8 24 8C15.1634 8 8 15.1634 8 24C8 32.8366 15.1634 40 24 40Z" fill="#FAFAFA"/>
      <path d="M24 46C36.1503 46 46 36.1503 46 24C46 11.8497 36.1503 2 24 2C11.8497 2 2 11.8497 2 24C2 36.1503 11.8497 46 24 46Z" stroke={theme.palette.primary.light} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      {isExpand && <path d="M22.3999 30.401L28.7999 24.001L22.3999 17.601" stroke={theme.palette.primary.main} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>}
      {!isExpand && <path d="M26.8 30.401L20.4 24.001L26.8 17.601" stroke={theme.palette.primary.main} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>}
    </svg>
  );
}