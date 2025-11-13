/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import Image from "next/image";
import authImage from '../../../../public/images/proccessImage.jpg'
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useResetPasswordMutation } from "@/redux/api/authApi";

type ChangePasswordFormData = {
  newPassword: string
  confirmPassword: string
}

export default function ContractorRegistrationPage() {
  const [resetPassword] = useResetPasswordMutation()
  const router = useRouter()
  const { control, handleSubmit, watch, formState: { errors } } = useForm<ChangePasswordFormData>({
    defaultValues: { newPassword: "", confirmPassword: "" }
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const onSubmit = async (data: ChangePasswordFormData) => {
    console.log("Password submitted:", data)
    const email = JSON.parse(localStorage.getItem("email") || "{}");
    try {
      const { newPassword, confirmPassword } = data;
      if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }
      const payload = {
        email: email.email,
        password: newPassword
      }
      const res = await resetPassword(payload);
      if (res.data) {
        toast.success("Password reset successful!");
        localStorage.removeItem("email");
        router.push('/login')
      }
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong!')
    }
  }

  return (
    <div className="max-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="w-full">
        <Image src={authImage} alt="Login Image" width={1000} height={1000} className='h-screen ' />
      </div>
      <div className='itemcenter justify-center flex-1 '>
        <div className="max-h-screen flex items-center justify-center p-4 w-full">
          <div className="min-h-screen bg-gray-50 p-4 w-full flex justify-center items-center">
            <Card className="w-full max-w-md shadow-lg">
              <CardHeader className="text-center space-y-2">
                <CardTitle className="text-2xl font-semibold">Change Password</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Please enter your new password below
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* 🔽 Change Password Form starts here */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* New Password */}
                  <div className="relative">
                    <Controller
                      name="newPassword"
                      control={control}
                      rules={{ required: "New password is required", minLength: { value: 6, message: "Minimum 6 characters" } }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Type new Password"
                          className="w-full pr-10"
                        />
                      )}
                    />
                    <span
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </span>
                    {errors.newPassword && (
                      <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="relative">
                    <Controller
                      name="confirmPassword"
                      control={control}
                      rules={{
                        required: "Please confirm your password",
                        validate: value => value === watch("newPassword") || "Passwords do not match"
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type={showConfirm ? "text" : "password"}
                          placeholder="Re-Type new Password"
                          className="w-full pr-10"
                        />
                      )}
                    />
                    <span
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                      onClick={() => setShowConfirm(!showConfirm)}
                    >
                      {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </span>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                    Change Password
                  </Button>
                </form>
                {/* 🔼 Change Password Form ends here */}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
