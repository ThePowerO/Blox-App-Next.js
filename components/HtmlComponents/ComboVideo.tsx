'use client';

import React from 'react'
import ReactPlayer from 'react-player'

const ComboVideo = ({ comboVideo }: any) => {
  return (
    <ReactPlayer
      url={comboVideo}
      className=""
      controls
      width="100%"
      height="350px"
      playing
      loop
    />
  )
}

export default ComboVideo
