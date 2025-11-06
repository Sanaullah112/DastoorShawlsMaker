import { z } from "zod/v3";

// Creating an object of schema

const User = z.object({
    name : z
    .string({ required_error:"Name is Required."})
    .trim()
    .min(3, {message:"Name must be at least 3 character long."})
    .max(20, {message:"Name Cannot Be Longer Then 20 Characters."}),

    email : z
    .string({ required_error:"Email is Required."})
    .trim()
    .min(10, {message:"Email must be at least 10 character long."})
    .max(30, {message:"Name Cannot Be Longer Then 30 Characters."}),

    password : z
    .string({ required_error:"Password  is Required."})
    .min(6, {message:"Password must be at least 6 character long."})
    .max(100, {message:"Password Cannot Be Longer Then 100 Characters."}),

});

  export default User;


