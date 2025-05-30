import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";

import SignInForm from "./components/sign-in-form";
import SignUpForm from "./components/sign-up-form";

// const loginSchema = z.object({
//   email: z.string().trim().email({ message: "Email inválido" }),
//   password: z
//     .string()
//     .min(8, { message: "Senha deve ter pelo menos 8 caracteres" }),
// });

export default async function AuthenticationPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session?.user) {
    redirect("/dashboard");
  }
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Tabs defaultValue="login" className="w-[400px]">
        <div className="mb-4 flex items-center justify-center">
          <Image src="/logo.svg" alt="Doctor Agenda" width={250} height={28} />
        </div>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Faça seu Login</TabsTrigger>
          <TabsTrigger value="register">Criar sua conta</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <SignInForm />
        </TabsContent>
        <TabsContent value="register">
          <SignUpForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
