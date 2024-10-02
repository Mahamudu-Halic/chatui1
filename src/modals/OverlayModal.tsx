import { Overlay } from "@/components/styled/overlay.styled.component";
import React from "react";

type OverlayType = {
  close?: () => void;
};

const OverlayModal = ({ close }: OverlayType) => {
  return <Overlay onClick={close} />;
};

export default OverlayModal;
