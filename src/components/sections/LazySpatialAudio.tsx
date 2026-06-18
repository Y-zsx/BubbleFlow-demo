"use client";

import dynamic from "next/dynamic";

const SpatialAudio = dynamic(() => import("./SpatialAudio"), { ssr: false });

export default function LazySpatialAudio() {
  return <SpatialAudio />;
}
