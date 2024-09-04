"use client";

import { ImageIcon } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";

const ComboVideo = ({ comboVideo }: { comboVideo: string }) => {
  return (
    <div className="mb-1">
      {comboVideo ? (
        <div suppressHydrationWarning>
          <h2 className="font-bold mb-2">Video:</h2>
          <video controls className="w-full h-auto">
            <source src={comboVideo} type="video/x-ms-wmv" />
          </video>
        </div>
      ) : null}
    </div>
  );
};

export default ComboVideo;
