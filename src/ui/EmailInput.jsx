/* eslint-disable react/prop-types */
import { Input } from '../features/auth/AuthStyles';

function EmailInput({ register }) {
  return (
    <Input
      type="email"
      placeholder="Email"
      {...register('email', {
        required: true,
        pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      })}
    />
  );
}

export default EmailInput;
