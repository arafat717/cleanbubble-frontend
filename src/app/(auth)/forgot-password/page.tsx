/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import Image from "next/image";
import authImage from '../../../../public/images/proccessImage.jpg'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useForm } from "react-hook-form";
import { useForgotPasswordMutation } from "@/redux/api/authApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ContractorRegistrationPage() {
  const [forgotPassword] = useForgotPasswordMutation()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<any>()

  const onSubmit = async (data: any) => {
    localStorage.setItem('email', JSON.stringify(data))
    try {
      const res = await forgotPassword(data)
      if (res?.data) {
        toast.success(res?.data?.message)
        router.push('/otp-verification')
      } else if (res?.error) {
        toast.error("Something went wrong!")
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
          <div className="min-h-screen bg-gray-50 p-4 w-full  flex justify-center">
            <div className="mx-auto w-full max-h-full mt-20 flex items-center justify-center">
              <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-foreground">Forgot Password?</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@gmail.com"
                        className={errors.email ? "border-destructive" : ""}
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
                    >
                      {isSubmitting ? "Sending..." : "Continue"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
