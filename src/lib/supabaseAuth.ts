import { supabase } from "../supabase-client";

interface StudentData {
  first_name: string;
  middle_name?: string;
  last_name: string;
  contact_number?: string;
  suffix?: string;
  id_number: string;
  year_level: number;
  course: string;
}

interface SignUpProps {
  email: string;
  password: string;
  userType: "student" | "admin";
  studentData?: StudentData;
}

export async function signUp({
  email,
  password,
  userType,
  studentData,
}: SignUpProps) {
  // Step 1: Create auth account
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) return { error: authError };

  const userId = authData.user!.id;

  // Step 2: Insert into users table
  const { error: userError } = await supabase.from("users").insert({
    id: userId,
    email,
    user_type: userType,
  });

  if (userError) return { error: userError };

  // Step 3: Insert into students table
  if (userType === "student") {
    const { error: studentError } = await supabase.from("students").insert({
      user_id: userId,
      email,
      ...studentData,
    });

    if (studentError) return { error: studentError };
  }

  return { user: authData.user };
}

export async function signIn(email: string, password: string) {
  // Sign in the user
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  // handle error authentication error
  if (error) {
    alert(error.message);
    return undefined;
  }

  // If sign-in is successful, fetch the user's profile from the users table
  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("*")
    .eq("id", data.user.id)
    .single();

  // handle error fetching user profile
  if (profileError) {
    alert("Could not fetch user profile");
    console.error(profileError);
    return undefined;
  }

  // Fetch from admins or students table based on user_type
  const table = profile.user_type === "admin" ? "admins" : "students";

  const { data: extendedProfile, error: extendedError } = await supabase
    .from(table)
    .select("*")
    .eq("user_id", data.user.id)
    .single();

  if (extendedError) {
    alert("Could not fetch extended profile");
    console.error(extendedError);
    return undefined;
  }

  // If everything is successful, return the user's profile
  alert("You are logged in");
  return { ...profile, ...extendedProfile };
}

export async function signOut() {
  // sign out the user
  const { error } = await supabase.auth.signOut();

  // handle error signing out
  if (error) {
    alert(error.message);
    return { error };
  }

  return { success: true };
}
