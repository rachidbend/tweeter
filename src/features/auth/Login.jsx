import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useLogin } from '../../hooks/authHooks/useLogin';
import { useNavigate } from 'react-router';

const StyledLogin = styled.div``;

function Login() {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { email: 'example@gmail.com', password: '123456789' },
  });
  const navigate = useNavigate();
  const { login, loginError } = useLogin();
  function onSubmit(data) {
    console.log(data);
    login(
      { email: data.email, password: data.password },
      {
        onSuccess: () => {
          navigate('/home');
        },
      }
    );
  }

  return (
    <StyledLogin>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>email</p>
        <input type="email" {...register('email')} />
        <p>password</p>
        <input type="password" {...register('password')} />
        {loginError && <p>{loginError.message}</p>}

        <input type="submit" value="login" />
      </form>
    </StyledLogin>
  );
}

export default Login;
