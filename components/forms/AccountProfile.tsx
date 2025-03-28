"use client"
import React from 'react'
import { useState, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {zodResolver} from '@hookform/resolvers/zod'
import { UserValidation } from '@/lib/validations/user';
import { z } from "zod"
import Image from 'next/image';
import { isBase64Image } from '@/lib/utils';
import {useUploadThing} from '@/lib/uploadthing'
import { updateUser } from '@/lib/actions/user.actions';
import { usePathname, useRouter } from 'next/navigation';

interface Props {
user :{
    id: string,
    objectId: string,
    username: string,
    name: string,
    bio: string,
    image: string
};
btnTitle: string;
}

const AccountProfile = ({user, btnTitle}: Props) => {

    const [files, setFiles] = useState<File[]>([])
    const {startUpload} = useUploadThing("media")

    const pathname = usePathname()
    const router = useRouter()


    const form = useForm({
        resolver : zodResolver(UserValidation),
        defaultValues: {
            profile_photo: user?.image || "",
            name: user?.name || "",
            username: user?.username ||"",
            bio: user?.bio || ""
        }
    })

    const handleImage = (e: ChangeEvent<HTMLInputElement>, 
      fieldChange: (value: string) => void) => {
      e.preventDefault();
  

      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        

        if (!file.type.includes('image')) return;
        
        setFiles(Array.from(e.target.files));
  

        const fileReader = new FileReader();

        fileReader.onload = () => {
          const imageDataUrl = fileReader.result?.toString() || '';
          fieldChange(imageDataUrl);
        };
        
        fileReader.readAsDataURL(file);
      }
    }


const onSubmit = async (values: z.infer<typeof UserValidation>) => { 
    const blob = values.profile_photo;

    const hasImageChanged = isBase64Image(blob);

    if(hasImageChanged){
      const imgRes = await startUpload(files)

      if(imgRes && imgRes[0].url){
        values.profile_photo = imgRes[0].url
      }
    }


    //TODO: Update user profile
    await updateUser({
      userId : user.id,  
      username : values.username,
      name: values.name,
      bio : values.bio,
      image : values.profile_photo,
      path : pathname
    })
    if(pathname === '/profile/edit'){
      router.back();
    } else{
      router.push('/')
    }
  }

    return (
        <Form {...form}>
          <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="flex flex-col justify-start gap-10">
            <FormField
              control={form.control}
              name="profile_photo"
              render={({ field }) => (
                <FormItem className="flex items-center gap-4">
                  <FormLabel className='account-form_image-label'>
                   {field.value?(
                    <Image
                    src={field.value}
                    alt="profile photo"
                    width={96}
                    height={96}
                    priority
                    className='rounded-full object-contain'
                    />
                   )
                   :(
                    <Image
                    src="/assets/profile.svg"
                    alt="profile photo"
                    width={24}
                    height={24}
                    className='object-contain'
                    />)}
                  </FormLabel>
                  <FormControl className='flex-1 text-base-semibold text-gray-200'>
                    <Input 
                    type='file'
                    accept='image/*'
                    placeholder='Upload a profile photo'
                    className='account-form_image-input'
                    onChange={(e) => handleImage(e, field.onChange)}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full gap-3">
                  <FormLabel className='text-base-semibold text-light-2'>
                   Name
                  </FormLabel>
                  <FormControl className='flex-1 text-base-semibold text-gray-200'>
                    <Input 
                    type='text'
                    className='account-form_input no-focus'
                    {...field}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full gap-3">
                  <FormLabel className='text-base-semibold text-light-2'>
                   Username
                  </FormLabel>
                  <FormControl className='flex-1 text-base-semibold text-gray-200'>
                    <Input 
                    type='text'
                    className='account-form_input no-focus'
                    {...field}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full gap-3">
                  <FormLabel className='text-base-semibold text-light-2'>
                   Bio
                  </FormLabel>
                  <FormControl className='flex-1 text-base-semibold text-gray-200'>
                    <Textarea
                    rows={10}
                    className='account-form_input no-focus'
                    {...field}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <Button type="submit" className='bg-primary-500'>Submit</Button>
          </form>
        </Form>
      )
}

export default AccountProfile