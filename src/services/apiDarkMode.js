import { supabase } from './supabase';

export async function getIsDarkMode({ userId }) {
  let { data: isDarkMode, error } = await supabase
    .from('profiles')
    .select('is_dark_mode')
    .eq('id', userId);

  if (error) throw new Error(error.message);

  return isDarkMode?.at(0).is_dark_mode;
}

export async function toggleIsDarkMode({ userId, nextIsDarkMode }) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ is_dark_mode: nextIsDarkMode })
    .eq('id', userId);

  if (error) throw new Error(error.message);

  return data;
}
