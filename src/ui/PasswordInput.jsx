/* eslint-disable react/prop-types */
import { useState } from 'react';
import {
  EyeOffIcon,
  EyeOnIcon,
  Input,
  InputContainer,
} from '../features/auth/AuthStyles';

function PasswordInput({ register, variant = 'password' }) {
  // there are two variants, 'password' for normal password, and 'confirm' for confirming a password
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  function handlePasswordVisibility() {
    setIsVisiblePassword(isVisiblePassword => !isVisiblePassword);
  }

  return (
    <InputContainer>
      <Input
        type={`${isVisiblePassword ? 'text' : 'password'}`}
        placeholder={`${
          variant === 'password'
            ? 'Password'
            : variant === 'confirm'
            ? 'Confirm'
            : null
        }`}
        {...register(
          `${
            variant === 'password'
              ? 'password'
              : variant === 'confirm'
              ? 'confirm'
              : null
          }`,
          { required: true, minLength: 6 }
        )}
      />
      {/* Toggle password visibility */}
      {isVisiblePassword ? (
        <EyeOffIcon onClick={handlePasswordVisibility} />
      ) : (
        <EyeOnIcon onClick={handlePasswordVisibility} />
      )}
    </InputContainer>
  );
}

export default PasswordInput;
