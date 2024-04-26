import toast from 'react-hot-toast';
import { Google, GoogleIcon } from '../features/auth/AuthStyles';
import useSignInWithGoogle from '../hooks/authHooks/useSignInWithGoogle';

function GoogleButton() {
  const { signinWithGoogle, isPending, error } = useSignInWithGoogle();

  function handleClick() {
    signinWithGoogle();
  }

  if (error) toast.error(error.message);

  return (
    <Google onClick={handleClick}>
      <GoogleIcon /> Login with Google
    </Google>
  );
}

export default GoogleButton;
