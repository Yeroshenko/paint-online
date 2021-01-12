import React, { FC } from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input, Button } from 'components'
import { ReactComponent as UserIcon } from 'assets/icons/user.svg'
import cls from 'styles/components/initial-form.module.sass'

const schema = yup.object().shape({
  username: yup.string().required('Username is a required field')
})

type FormData = { username: string }

type InitialFormProps = {
  onSubmit: (data: FormData) => void
}

export const InitialForm: FC<InitialFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const formSubmit = (data: FormData) => {
    onSubmit(data)
  }

  return (
    <form noValidate onSubmit={handleSubmit(formSubmit)}>
      <Input
        ref={register}
        type='text'
        id='userName'
        name='username'
        placeholder='Enter your username'
        error={!!errors.username}
        errorText={errors?.username?.message}
        Icon={UserIcon}
      />
      <Button htmlType='submit' className={cls.submitButton}>Enter the room</Button>
    </form>
  )
}