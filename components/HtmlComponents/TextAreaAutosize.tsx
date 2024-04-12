'use client'

import React, { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import { AvatarDemo } from './AvatarDemo';
import { useSession } from 'next-auth/react';
import { Laugh, SendHorizonal, SendIcon } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import Link from 'next/link';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Button } from '../ui/button';

const FilterTypes = ["Recent", "Old", "Top"]

const CommentsComponent = ({ selectedFilterType }: { selectedFilterType: string }) => {

  const { data: session } = useSession();
  const [isCommenting, setIsCommenting] = useState(false);
  const [showEmojiList, setShowEmojiList] = useState(false);
  const [fullComment, setFullComment] = useState(false);

  const handleCommenting = () => {
    setIsCommenting((prevState) => !prevState);
  }

  const comment = 'Lorem ipsum dolor m ipsum dolor sit quibus sit quibusdam m ipsum dolor sit quibus dicta repudiandae dicta repudiandae cupiditate adipisci neque laborum corrupti, dicta repudiandae cupiditate adipisci neque laborum corrupti, cupiditate adipisci neque laborum corrupti, dicta repudiandae cupiditate adipisci neque laborum corrupti, dicta dicta repudiandae cupiditate adipisci neque laborum corrupti, dicta repudiandae cupiditate adipisci neque laborum corrupti, repudiandae cupiditate adipisci neque laborum corrupti, dicta repudiandae cupiditate adipisci neque laborum corrupti, nobis nam.';
  const shortComment = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores corrupti in saepe numquam quae eligendi ratione dolore id qui repudiandae sint esse ab ducimus itaque earum, velit nihil tempora reiciendis.'
  const shortendCommentV2 = shortComment.slice(0, 430); 
  const shortendComment = comment.slice(0, 430); 

  return (
    <div className=''>
      <div className='flex items-center gap-2'>
        <p>Comments</p>
        <div className='px-[6px] bg-zinc-500 text-white rounded-full'><span className='font-bold'>11</span></div>
      </div>
      <div className='flex mt-3'>
        <div className='mr-[8px]'>
          <AvatarDemo userImg={session?.user?.image} userNickName={session?.user?.name} />
        </div>
        
        {isCommenting ? (
        <div className='flex gap-[4px] flex-col items-center border-none p-1 rounded-lg w-full'>
          <TextareaAutosize
            autoFocus
            suppressHydrationWarning
            minRows={1}
            maxLength={4000}
            className='border-b-[2px] dark:border-white bg-transparent w-full border-black outline-none text-sm'
            placeholder="Write a comment..."
            style={{ resize: 'none' }}
          />
          <div className={`${showEmojiList ? 'relative' : 'justify-end'} flex sm:justify-between w-full items-center`}>
            <div className='flex flex-col'>
              <div onClick={() => setShowEmojiList(!showEmojiList)} className='p-2 w-fit hidden sm:block cursor-pointer rounded-full dark:hover:bg-stone-800 hover:bg-stone-300'>
                <Laugh className='size-5' />
              </div>
              <div className={`${showEmojiList ? 'block' : 'hidden'} `}>
                <div className='absolute top-0 left-[35px]'>
                  <EmojiPicker
                    height={250}
                    previewConfig={{ showPreview: false }}
                    onEmojiClick={(emoji: any) => console.log(emoji)}
                    emojiStyle={'twitter' as any}
                    theme={'dark' as any}
                  />
                </div>
              </div>
            </div>
            <div className={`flex ${showEmojiList ? 'absolute right-0 top-[2px]' : ''} `}>
              <button type='button' onClick={handleCommenting} className='cursor-pointer px-4 py-1 mr-1 dark:hover:bg-stone-800 hover:bg-stone-300 rounded-2xl'>Cancel</button>
              <div className='flex justify-center w-[60px] px-2 py-1 cursor-pointer rounded-2xl dark:hover:bg-cyan-400 hover:bg-cyan-400'>
                <SendHorizonal className='size-6' />
              </div>
            </div>
          </div>
        </div>
        ) : (
          <div onClick={handleCommenting} className='flex cursor-text gap-[4px] flex-col items-center border-none p-1 rounded-lg w-full'>
            <p className='border-b-[2px] dark:border-white text-zinc-400 w-full border-black outline-none text-sm'>Write a comment...</p>
          </div>
        )}
      </div>
      <div className='mt-[20px] flex flex-col'>
        <div className='flex w-full tinymax:px-[10px] px-[40px] py-2 items-center border rounded-xl dark:border-none dark:bg-[#212529]'>
          <div className='flex tinymax:gap-1 gap-4 items-center text-sm'>
            <p className='text-zinc-400'>Filter by:</p>
            {FilterTypes.map((filterType) => (
              <Link
                key={filterType}
                href={`?${new URLSearchParams({
                  filter: filterType,
                })}`}
                scroll={false}
                className={`cursor-pointer ${filterType === selectedFilterType ? 'bg-zinc-500 text-white' : 'hover:bg-stone-200 dark:hover:bg-zinc-600'} text-center place-content-center w-[60px] p-1 rounded-sm`}
              >
                {filterType}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className='p-2 mt-[15px] petitmax:flex-col flex gap-[15px] border rounded-lg'>
            <div className='flex items-start'>
              <div className='flex items-center gap-1'>
                <div className='px-[11px] cursor-pointer border-1 hover:border-lime-400 h-[25px] place-content-center bg-zinc-500 text-white rounded-full'>
                  <span className='font-bold'>+1</span>
                </div>
                <Link scroll={false} href={'#'} className='cursor-pointer'>
                  <AvatarDemo className='' userImg={session?.user?.image} userNickName={session?.user?.name} />
                </Link>
              </div>
            </div>
            <div className='flex flex-col text-sm'>
              <div className=''>
                <div>
                  {fullComment? (
                    <div>
                      {/*talvez tirar a o comment.lenght < 400 pois comment é certeza que é > 400*/}
                      {comment.length < 400 ? (
                        <p className='petitmax:text-[13px]'>{comment}</p>
                      ) : (
                        <div>
                          <p className='petitmax:text-[13px]'>{comment}</p>
                          <p className='cursor-pointer underline' onClick={() => setFullComment(!fullComment)}>{`Read Less... >`}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      {comment.length < 400 ? (
                        <p className='petitmax:text-[13px]'>{comment}</p>
                      ) : (
                        <div>
                          <p className='petitmax:text-[13px]'>{comment.slice(0, 430)}...</p>
                          <p className='cursor-pointer underline' onClick={() => setFullComment(!fullComment)}>{`Read More... >`}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentsComponent