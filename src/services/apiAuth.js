import { supabase } from './supabase';

// export async function getUser() {
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) throw new Error('there is no loged in user!');

//   return user;
// }

export async function getCurrentUser() {
  const { data: session, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) throw new Error(sessionError);
  if (!session.session) return null;
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw new Error(error);

  return user;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) throw new Error(error);

  return data;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();

  if (error) throw new Error(error);

  return null;
}
