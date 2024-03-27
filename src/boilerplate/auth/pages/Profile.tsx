/* FOLDER */
import { UpdateUsernameForm } from '@/boilerplate/auth/forms/UpdateUsernameForm';

/* FOLDER */
export const ProfilePage = () => {

  return (
    <>
      <div className='flex flex-col mb-4 gap-1.5'>
        <h2 className='text-lg'>Personal information</h2>
        <p className='text-sm'>Provide your name and email so we can get in touch with you.</p>
      </div>
      <UpdateUsernameForm/>
    </>
  )
}
