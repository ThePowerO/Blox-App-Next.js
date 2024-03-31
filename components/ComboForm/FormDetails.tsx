'use client';

import React, { useEffect, useState } from 'react'
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import TextareaAutosize from 'react-textarea-autosize';
import { useFormState } from '../FormContext';
import { useRouter } from 'next/navigation';
import { useLocale } from '@/LocaleContext';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import ReactPlayer from 'react-player'
import { isUri } from 'valid-url';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FileUpload } from '../HtmlComponents/FileUpload';
import { revalidatePath } from 'next/cache';
import { PlusCircle, ImageIcon, Pencil, X, XCircleIcon, PencilIcon } from 'lucide-react';
import { UploadButton } from '@/lib/uploadthing';
import { Separator } from '../ui/separator';

export default function ComboFormDetails() {

  const { locale } = useLocale();
  const router = useRouter();

  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedMainStats, setSelectedMainStats] = useState("");
  //const [videoFilePath, setVideoFilePath] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const { onHandleBack, setFormData, formData } = useFormState();

  const toggleEditting = () => setIsEditing((prevIsEditing) => !prevIsEditing);

  const FormSchema = z.object({
    combotitle: z
      .string()
      .min(1, 'Please enter a combo name'),
    combodescription: z
      .string()
      .max(250, 'Description must be less than 250 characters'),
    specialty: z
      .string(),
    race: z
      .string(),
    mainStats: z
      .string(),
    comboVideo: z
      .string()
  })

  type InputForm = z.infer<typeof FormSchema>

  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting} } = useForm<InputForm>({
    resolver: zodResolver(FormSchema),
    defaultValues: formData
  });

  const [comboVideo, setComboVideo] = useState<string | undefined>(formData.comboVideo);

  const submitComboDetails: SubmitHandler<InputForm> = async (data) => {
    setFormData((prevFormData) => ({...prevFormData, ...data}));
    const formDataToSend = {
      ...formData,  // existing formData
      ...data,      // new form data
    };

    try {
      const newCombo = await fetch('http://localhost:3000/api/createCombo', {
        method: 'POST',
        body: JSON.stringify(formDataToSend),
        headers: {
          'Content-Type': 'application/json',
          },
      });

      const result = await newCombo.json();
      console.log(result);
      reset();
      //window.location.replace(`/${locale}/create-combo`);
      toast.success('Combo created successfully');
    } catch (error) {
      console.error(error);
      toast.error('Error creating combo');
    }
  };

  const handleSpecialtyChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue("specialty", e.currentTarget.value);
    setSelectedSpecialty(e.currentTarget.value);
  };

  const handleMainStatsChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue('mainStats', e.currentTarget.value);
    setSelectedMainStats(e.currentTarget.value);
  }

  const handleRaceChange = (value: string) => {
    setValue('race', value);
  }

  const ComboSpecialtys = [
    {
      specialty: "PVP",
    },
    {
      specialty: "PVE",
    },
    {
      specialty: "Grind",
    },
  ]

  const ComboMainStats = [
    {
      Stats: "Main Fruit",
    },
    {
      Stats: "Main Sword",
    },
    {
      Stats: "Main Gun",
    },
    {
      Stats: "Hybrid",
      padding: true,
    },
  ]

  //const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //  setValue('comboVideo', event.target.files![0].name.replace('.wmv', '.mp4'));
  //  setComboVideo(event.target.files![0].name.replace('.wmv', '.mp4'));
  //  console.log(event.target.files![0].name);
  //  toggleEditting();
  //  setVideoFilePath(URL.createObjectURL(event.target.files![0]));
  //};

  const [isValidUrl, setIsValidUrl] = useState(true);

  const handleVideoUpload = (url: string) => {
    if (isUri(videoUrl)) {
      setIsValidUrl(true);
      setValue('comboVideo', url);
      setComboVideo(url);
      toggleEditting();
      setVideoUrl(url);
    } else {
      setIsValidUrl(false);
      return; // Don't proceed if URL is invalid
    }
  }

  return (
    <div className='grid place-items-center p-2 petit:mt-[35px]'>
      <div className='bg-stone-50 dark:bg-zinc-800 p-5 w-full tiny:max-w-[400px] sm:max-w-[400px] md:max-w-[400px] border-t-4 border-[#3d95ec] rounded-lg'>
        <div>
          <h1>
            Combo Details
          </h1>
          <form onSubmit={handleSubmit(submitComboDetails)} className='mt-[15px]'>
            <div className='flex flex-col gap-[10px]'>
              <div>
                <Input
                  className='border dark:border-white'
                  type='text'
                  placeholder='Combo Title'
                  {...register("combotitle")}
                />
                {!!errors.combotitle && <p className='text-red-500 text-sm'>{errors.combotitle?.message}</p>}
              </div>
              <div className=''>
                <TextareaAutosize
                  {...register("combodescription")}
                  className='w-full p-3 bg-transparent border border-input dark:border-white outline-black rounded-lg'
                  placeholder='Combo Description'
                  minRows={5}
                  maxRows={7}
                />
                {!!errors.combodescription && <p className='text-red-500 text-sm'>{errors.combodescription?.message}</p>}
              </div>
              <Select onValueChange={handleRaceChange} defaultValue={formData.race}>
                <SelectTrigger className="dark:border-white">
                  <SelectValue placeholder="Select a race" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Races:</SelectLabel>
                    <SelectItem value="Skypian">Skypian</SelectItem>
                    <SelectItem value="Mink">Mink</SelectItem>
                    <SelectItem value="Fishman">Fishman</SelectItem>
                    <SelectItem value="Cyborg">Cyborg</SelectItem>
                    <SelectItem value="Human">Human</SelectItem>
                    <SelectItem value="Ghoul">Ghoul</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div>
                <div className='flex justify-between items-center'>
                  <label className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Combo Video:</label>
                  <button onClick={toggleEditting} type='button' className='text-sm flex items-center gap-[5px]'>
                    {isEditing ? (
                      <div className='flex gap-[3px] items-center'>
                        <XCircleIcon className='size-4' /> Cancel
                      </div>
                    ) : (
                      <div className='flex gap-[3px] items-center'>
                        
                        {!comboVideo ? "" : <><PencilIcon className='size-4' />Edit Video</>}
                      </div>
                    )}
                    
                  </button>
                </div>
                {!isEditing && (
                  !comboVideo ? (
                    <div className='flex text-sm items-center justify-center h-10 bg-slate-200 dark:bg-zinc-600 rounded-md'>
                      <button className='flex gap-[5px]' type='button' onClick={toggleEditting}>
                        <PlusCircle className='size-5' /> Add video here
                      </button>
                    </div>
                  ) : (
                    <ReactPlayer
                      playsinline
                      playing={true}
                      controls={true}
                      url={comboVideo}
                      width="100%"
                      height="100%"
                      config={{
                        file: {
                          forceVideo: true,
                        },
                      }}
                      />
                  )
                )}
                {isEditing && (
                  <div className='border border-input rounded-lg p-2 dark:border-white'>
                    <UploadButton
                      endpoint="comboVideo"
                      onClientUploadComplete={(res) => {
                        // Do something with the response
                        console.log("Files: ", res);
                        setComboVideo(res[0].url);
                        toggleEditting();
                        setValue("comboVideo", res[0].url);
                      }}
                      onUploadError={(error: Error) => {
                        // Do something with the error.
                        toast.error(`ERROR! ${error.message}`);
                      }}
                    />
                    <Separator className='my-2 dark:bg-white' />
                    <p className='text-sm'>Or by URL:</p>
                    <div className='flex gap-[5px] items-center'>
                      <Input
                        className='border dark:border-white'
                        type="text"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        placeholder="Enter YouTube video URL"
                      />
                      <Button type="button" onClick={() => handleVideoUpload(videoUrl)}>Play</Button>
                    </div>
                    {!isValidUrl && <p className='text-red-500 text-sm'>Please enter a valid URL.</p>}
                  </div>
                )}
              </div>
              <h3 className='text-sm'>Combo type:</h3>
              <ul
                className="items-center w-full text-sm font-medium border rounded-lg grid grid-cols-3 petit:flex
                bg-gray-900 border-gray-600 text-white"
              >
                {ComboSpecialtys.map((specialty) => (
                  <li key={specialty.specialty} className="w-full border-b petit:border-b-0 border-r border-gray-600">
                    <div className="flex items-center ps-3">
                      <input
                        id={specialty.specialty}
                        type="radio"
                        value={specialty.specialty}
                        checked={selectedSpecialty === specialty.specialty}
                        onChange={handleSpecialtyChange}
                        name="list-specialty-group"
                        className="w-4 h-4 text-blue-600 bg-gray-600 border-gray-500"
                      />
                      <label htmlFor={specialty.specialty} className="w-full py-3 ms-2 text-sm font-medium text-gray-300">{specialty.specialty}</label>
                    </div>
                  </li>
                ))}
              </ul>
              <h3 className='text-sm'>Combo Stats:</h3>
              <ul
                className="items-center w-full text-sm font-medium border rounded-lg grid grid-cols-2 petit:flex
                bg-gray-900 border-gray-600 text-white"
              >
                {ComboMainStats.map((mainstats) => (
                  <li key={mainstats.Stats} className="w-full border-b petit:border-b-0 petit:border-r border-gray-600">
                    <div className="flex items-center ps-3 ">
                      <input
                        id={mainstats.Stats}
                        type="radio"
                        value={mainstats.Stats}
                        checked={selectedMainStats === mainstats.Stats}
                        onChange={handleMainStatsChange}
                        name="list-mainstats-group"
                        className="w-4 h-4 text-blue-600 bg-gray-600 border-gray-500"
                      />
                      <label htmlFor={mainstats.Stats} className={`w-full py-3 ms-2 text-sm text-gray-300 ${mainstats.padding === true ? 'pr-[3px]' : ''}`}>{mainstats.Stats}</label>
                    </div>
                  </li>
                ))}
              </ul>
              <div className='flex justify-between petit:justify-end gap-[8px]'>
                <Button onClick={onHandleBack} className='bg-[#3d95ec] text-white hover:bg-[#5994cf]'>
                  Back
                </Button>
                <Button disabled={isSubmitting} className='bg-[#3d95ec] text-white hover:bg-[#5994cf]'type='submit'>
                  Create Combo
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
