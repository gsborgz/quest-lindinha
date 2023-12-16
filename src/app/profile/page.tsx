'use client'

import { useContext, useEffect, useState } from 'react';
import { useDictionary } from '@src/hooks/dictionary.hook';
import { SnackbarContext } from '@src/providers/snackbar.provider';
import { SnackbarType } from '@src/types/components/snackbar.type';
import Input from '@src/components/input.component';
import Button from '@src/components/button.component';
import Image from 'next/image';
import { useAuthService } from '@src/hooks/auth-service.hook';
import { UpdatePasswordDTO } from '@src/types/models/auth.type';
import { SessionContext } from '@src/providers/session.provider';
import { ModalContext } from '@src/providers/modal.provider';
import SelectAvatarDialog from '@src/dialogs/select-avatar.dialog';
import { UpdateProfileDTO } from '../../types/models/user.type';

export default function Profile() {
  const authService = useAuthService();
  const { showModal, toggleModal } = useContext(ModalContext);
  const { locale } = useDictionary();
  const { openSnackbar } = useContext(SnackbarContext);
  const { user, setAvatar } = useContext(SessionContext);
  const [mounted, setMounted] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState<string>('');
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (!name && user) {
    setName(user.name);
  }

  async function savePassword(event: React.FormEvent): Promise<void> {
    event.preventDefault();

    if (!currentPassword || !newPassword || !newPasswordConfirmation) {
      return;
    }

    if (newPassword !== newPasswordConfirmation) {
      openSnackbar(locale('text.passwords_do_not_match'), SnackbarType.ERROR);

      return;
    }

    const updatePasswordData = new UpdatePasswordDTO();

    updatePasswordData.current_password = currentPassword;
    updatePasswordData.password = newPassword;
    updatePasswordData.password_confirmation = newPasswordConfirmation;

    await authService.updatePassword(updatePasswordData)
      .then(() => {
        openSnackbar(locale('text.password_updated'), SnackbarType.SUCCESS);

        setCurrentPassword('');
        setNewPassword('');
        setNewPasswordConfirmation('');
      })
      .catch(() => {
        openSnackbar(locale('text.update_password_fail'), SnackbarType.ERROR);
      });
  }

  async function saveProfile(event: React.FormEvent): Promise<void> {
    event.preventDefault();

    const updateProfileData = new UpdateProfileDTO();

    if (!name) {
      return;
    }

    updateProfileData.name = name;
    updateProfileData.avatar = user?.avatar || 'avatar-0';

    await authService.updateProfile(updateProfileData)
      .then(() => {
        openSnackbar(locale('text.profile_updated'), SnackbarType.SUCCESS);

        setAvatar(updateProfileData.avatar);
      })
      .catch(() => {
        openSnackbar(locale('text.profile_update_fail'), SnackbarType.ERROR);
      });
  }

  function setModal() {
    if (!showModal) {
      const dialog = <SelectAvatarDialog />;

      toggleModal(dialog);
    } else {
      toggleModal(null);
    }
  }

  return (
    <section className='flex flex-col items-center justify-center gap-10'>
      <div className='rounded shadow-lg p-8 bg-slate-100 dark:bg-slate-700 flex items-center justify-center w-[30rem]'>
        <form className='flex flex-col gap-8 w-full' onSubmit={ saveProfile }>
          <div className='flex items-center gap-8'>
            <Image
              src={ `/avatar/${user?.avatar || 'avatar-0'}.jpg` }
              width={40}
              height={40}
              alt='Profile picture'
              className='h-14 w-14 rounded-full border-2 border-blue-600 dark:border-blue-500 cursor-pointer'
              onClick={ setModal }
            />
            
            <Input
              id='user_name'
              label={locale('text.name')}
              type='text'
              required
              minLength={2}
              maxLength={100}
              initialValue={user?.name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <Button type='submit' label={locale('text.save')} primary />
        </form>
      </div>

      <div className='rounded shadow-lg p-8 bg-slate-100 dark:bg-slate-700 flex items-center justify-center w-[30rem]'>
        <form className='flex flex-col gap-8 w-full' onSubmit={ savePassword }>
          <Input
            id='user_current_password'
            label={locale('text.current_password')}
            type='password'
            required
            minLength={8}
            maxLength={100}
            onChange={(event) => setCurrentPassword(event.target.value)}
          />

          <Input
            id='user_new_password'
            label={locale('text.new_password')}
            type='password'
            required
            minLength={8}
            maxLength={100}
            onChange={(event) => setNewPassword(event.target.value)}
          />

          <Input
            id='user_new_password_confirmation'
            label={locale('text.new_password_confirmation')}
            type='password'
            required
            minLength={8}
            maxLength={100}
            onChange={(event) => setNewPasswordConfirmation(event.target.value)}
          />

          <Button type='submit' label={locale('text.save')} primary />
        </form>
      </div>
    </section>
  );
}