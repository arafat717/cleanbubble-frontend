/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import Image from "next/image";
import authImage from '../../../../public/images/proccessImage.jpg'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from 'react';
import { Eye, EyeOff, Upload } from "lucide-react"
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { useRegisterMutation } from '@/redux/api/authApi';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { setUser } from '@/redux/features/authSlice';
import { useTranslation } from "react-i18next";

type FormValues = {
  email: string
  password: string
}

export default function ContractorRegistrationPage() {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false)
  const [companyPhoto, setCompanyPhoto] = useState<File | null>(null)
  const [insuranceFile, setInsuranceFile] = useState<File | null>(null)
  const [registerContractor] = useRegisterMutation()
  const router = useRouter()
  const dispatch = useAppDispatch();

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { email: "", password: "" }
  })

  useEffect(() => {
    const storedData = localStorage.getItem("registrationData")
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData)
        reset({ email: parsed.email || "", password: "" })
      } catch (err) {
        console.error("Error parsing registrationData:", err)
      }
    }
  }, [reset])

  const handleCompanyPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyPhoto(e.target.files?.[0] || null)
  }

  const handleInsuranceFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInsuranceFile(e.target.files?.[0] || null)
  }

  const onSubmit = async (data: FormValues) => {
    const loadingToast = toast.loading(t("contractorRegistration.registerButton") + "...");

    const storedData = localStorage.getItem("registrationData");
    const fullData: any = storedData ? JSON.parse(storedData) : {};
    fullData.password = data.password;
    fullData.email = data.email;
    fullData.role = 'CONTRACTOR';

    const formData = new FormData()
    formData.append('data', JSON.stringify(fullData))
    if (companyPhoto) formData.append('companyPhoto', companyPhoto)
    if (insuranceFile) formData.append('insuranceDocument', insuranceFile)

    try {
      const result = await registerContractor(formData);
      toast.dismiss(loadingToast);

      if (result?.data) {
        dispatch(setUser({ token: result.data.data.token }));
        toast.success(t("contractorRegistration.registerButton") + " successful!");
        localStorage.removeItem("registrationData");
        router.push('/contractor-payment')
      } else {
        toast.error(
          (result?.error && 'data' in result.error && (result.error as any).data?.message) ||
          (result?.error && 'message' in result.error ? (result.error as { message: string }).message : undefined)
        )
      }
    } catch (err: any) {
      toast.dismiss(loadingToast);
      toast.error(err.message || "Something went wrong!");
    }
  };

  return (
    <div className="max-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="w-full">
        <Image src={authImage} alt="Login Image" width={1000} height={1000} className='h-screen ' />
      </div>

      <div className='flex items-center justify-center flex-1'>
        <div className="max-w-lg w-full p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-semibold text-gray-900">{t("contractorRegistration.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Profile Picture */}
                <div className="space-y-3">
                  <Label className="text-sm text-gray-600">{t("contractorRegistration.profilePictureLabel")}</Label>
                  <div className="relative">
                    <input
                      type="file"
                      id="profile-picture"
                      accept=".jpg,.jpeg,.png"
                      onChange={handleCompanyPhotoChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                      {companyPhoto ? companyPhoto.name : t("contractorRegistration.profilePicturePlaceholder")}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">{t("contractorRegistration.profilePictureFormats")}</p>
                  <div className="flex items-center gap-2">
                    <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById("profile-picture")?.click()}>
                      {t("contractorRegistration.chooseFile")}
                    </Button>
                    <span className="text-sm text-gray-500">{companyPhoto ? companyPhoto.name : t("contractorRegistration.profilePicturePlaceholder")}</span>
                  </div>
                </div>

                {/* Insurance Document */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">{t("contractorRegistration.insuranceLabel")}</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Upload className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="text-xs text-gray-500">{t("contractorRegistration.profilePictureFormats")}</div>
                      <div className="relative">
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          onChange={handleInsuranceFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          id="insurance-upload"
                        />
                        <Button variant="outline" size="sm" className="text-xs px-3 py-1.5 h-auto bg-transparent" asChild>
                          <label htmlFor="insurance-upload" className="cursor-pointer">{t("contractorRegistration.chooseFile")}</label>
                        </Button>
                      </div>
                      <div className="text-xs text-gray-400">{insuranceFile ? insuranceFile.name : t("contractorRegistration.insurancePlaceholder")}</div>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">{t("contractorRegistration.emailLabel")}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("contractorRegistration.emailPlaceholder")}
                    {...register("email")}
                    className="w-full"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">{t("contractorRegistration.passwordLabel")}</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={t("contractorRegistration.passwordPlaceholder")}
                      {...register("password")}
                      className="w-full pr-10"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5">
                  {t("contractorRegistration.registerButton")}
                </Button>
              </form>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  {t("contractorRegistration.loginPrompt")}{" "}
                  <Link href="/login" className="text-green-600 hover:text-green-700 font-medium">
                    {t("contractorRegistration.loginLink")}
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
