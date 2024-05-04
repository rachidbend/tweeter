import { supabase } from './supabase';

// when you have not visited the page in some time and you revisit it, this function throws an error (bug)
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
  if (!user) return null;
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

export async function signup({ email, password }) {
  let { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function changePassword({ newPassword }) {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function changeEmail({ newEmail }) {
  const { data, error } = await supabase.auth.updateUser({
    email: newEmail,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function loginWithGoogleAuth() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function forgotPassword(email) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://tweeter-neon-iota.vercel.app/settings/account',
  });

  if (error) throw new Error(error.message);

  return data;
}
