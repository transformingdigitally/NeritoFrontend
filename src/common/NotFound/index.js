import React from "react";
import useTranslation from "../../resources/index";

export default function NotFound(props) {
  const translation = useTranslation();
  return <div>{translation.NO_RECORD_FOUND}</div>;
}
