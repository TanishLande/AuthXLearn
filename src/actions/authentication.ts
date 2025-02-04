"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation";

interface AuthResponse{
    error: null | string,
    sucess: boolean,
    data: unknown | null
}

export async function signup(formdata: FormData): Promise<AuthResponse> {
    const supabase = await createClient();
  
    const { data: signupData, error } = await supabase.auth.signUp({
      email: formdata.get("email") as string,
      password: formdata.get("password") as string,
      options: {
        data: {
          fullName: formdata.get("fullName") as string,
        },
      },
    });
  
    if (error) {
      return {
        error: error.message || "There was something wrong in signing up",
        sucess: false,
        data: null,
      };
    }
  
    // Wait for the user to be created before retrieving the metadata
    await new Promise((resolve) => setTimeout(resolve, 2000));
  
    const { data: userMetadata } = await supabase.from("users").select("*").eq("id", signupData.user?.id).single();
  
    return {
      error: null,
      sucess: true,
      data: {
        ...signupData,
        fullName: userMetadata?.full_name,
      },
    };
  }

export async function login(formdata: FormData): Promise<AuthResponse>{
    const supabase = await createClient();

    const data = {
        email: formdata.get("email") as string,
        password: formdata.get("password") as string,
    }

    const { data: signinData , error } = await supabase.auth.signInWithPassword(data);

    return {
        error: error?.message || 'Opps! There was something wrong in login in',
        sucess: !error,
        data: signinData || null
    };
}

export async function logout(): Promise<void> {
    const supabase = await createClient();

    await supabase.auth.signOut();
    redirect('/login');
} 