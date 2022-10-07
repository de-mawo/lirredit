import { UsernamePasswordInput } from "../resolvers/UsernamePasswordInput";

export const validateRegister = (options: UsernamePasswordInput) => {
  if (!options.email.includes("@")) {
    return  [
   
      {
        field: "email",
        message: "invalid email",
      },
    ];
  }

  if (options.username.length <= 2) {
    return  [
        {
          field: "username",
          message: "Username must be at least 2 characters long",
        },
      ]
    
  }

  if (options.username.includes("@")) {
    return  [
        {
          field: "username",
          message: "Username cannot include @ characters",
        },
      ]
    
  }

  if (options.password.length <= 2) {
    return [
        {
          field: "password",
          message: "Password must be at least 2 characters long",
        },
      ]
  
  }

  return null;
};
