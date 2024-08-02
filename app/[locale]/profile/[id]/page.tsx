import React from "react";
import 'react-image-crop/dist/ReactCrop.css'
import SingleProfilePage from "@/components/SingleProfilePage/SingleProfilePage";

type Props = {
  params: {
    id: string;
  };
}

export default function page({ params }: Props) {
  const { id } = params
  return (
    <SingleProfilePage ParamsUserId={id} />
  )
}
