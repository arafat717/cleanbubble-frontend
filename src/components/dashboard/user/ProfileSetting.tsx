/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { Settings, Lock, Upload, Eye, EyeOff } from "lucide-react"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUpdateUserMutation } from "@/redux/api/user/myorder.api"
import { useChangePasswordMutation, useGetMeQuery } from "@/redux/api/authApi"
import { toast } from "sonner"
import { useTranslation } from "react-i18next"
import Loader from "@/components/shared/Loader"

interface ProfileFormData {
    fullName: string
    email: string
    phone: string
}

interface PasswordFormData {
    currentPassword: string
    newPassword: string
}

export default function ProfileSettings() {
    const { t } = useTranslation()
    const { data, isLoading } = useGetMeQuery('')
    console.log("userData=>", data?.data)
    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation()
    const [changePassword, { isLoading: isChanging }] = useChangePasswordMutation()
    const [avatarUrl, setAvatarUrl] = useState(" ")
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)

    // Profile form
    const { control: profileControl, handleSubmit: handleProfileSubmit, reset: resetProfile, formState: { errors: profileErrors, isDirty: isProfileDirty } } = useForm<ProfileFormData>({
        defaultValues: { fullName: "", email: "", phone: "" }
    })

    // Password form
    const { control: passwordControl, handleSubmit: handlePasswordSubmit, reset: resetPassword, formState: { errors: passwordErrors, isDirty: isPasswordDirty } } = useForm<PasswordFormData>({
        defaultValues: { currentPassword: "", newPassword: "" }
    })

    useEffect(() => {
        if (data?.data) {
            const userData = data.data
            resetProfile({
                fullName: userData.fullName || userData.name || "",
                email: userData.email || "",
                phone: userData.phone || "",
            })
            if (userData.avatar || userData.profileImage) {
                setAvatarUrl(userData.avatar || userData.profileImage)
            }
        }
    }, [data?.data, resetProfile])

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedFile(file)
            const reader = new FileReader()
            reader.onloadend = () => setAvatarUrl(reader.result as string)
            reader.readAsDataURL(file)
        }
    }

    const onProfileSubmit = async (formData: ProfileFormData) => {
        try {
            const formDataToSend = new FormData()
            formDataToSend.append('data', JSON.stringify(formData))
            if (selectedFile) formDataToSend.append('profile', selectedFile)
            const res = await updateUser(formDataToSend).unwrap()
            if (res?.data) {
                toast.success(t('profileSettings.success.profileUpdated'))
                setSelectedFile(null)
            }
        } catch (error) {
            toast.error(t('profileSettings.error.profileUpdateFailed'))
        }
    }

    const onPasswordSubmit = async (formData: PasswordFormData) => {
        try {
            const res = await changePassword({ oldPassword: formData.currentPassword, newPassword: formData.newPassword }).unwrap()
            if (res?.data) {
                toast.success(t('profileSettings.success.passwordChanged'))
                resetPassword()
            }
        } catch (error) {
            toast.error(t('profileSettings.error.passwordChangeFailed'))
        }
    }

    const handleCancelProfile = () => {
        if (data?.data) {
            const userData = data.data
            resetProfile({
                fullName: userData.fullName || userData.name || "",
                email: userData.email || userData.email || "",
                phone: userData.phone || ""
            })
            setAvatarUrl(userData.avatar || userData.profileImage || "")
            setSelectedFile(null)
        }
    }

    const handleCancelPassword = () => {
        resetPassword()
        setShowCurrentPassword(false)
        setShowNewPassword(false)
    }

    if (isLoading) return <Loader></Loader>

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:px-10">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6 sm:mb-8">
                    <Settings className="w-12 h-12 text-[#17171A]" />
                    <h1 className="text-2xl sm:text-4xl font-medium text-[#17171A]">{t('profileSettings.title')}</h1>
                </div>

                {/* Profile Form */}
                <form onSubmit={handleProfileSubmit(onProfileSubmit)}>
                    <Card className="mb-6">
                        <CardContent className="flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-6">
                            <Avatar className="w-24 h-24 sm:w-32 sm:h-32">
                                <AvatarImage src={avatarUrl} alt="Profile" />
                                <AvatarFallback>{data?.data?.fullName?.[0] || data?.data?.name?.[0] || "JD"}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                                <label className="cursor-pointer bg-[#319E60] hover:bg-green-600 text-white px-4 py-2 text-sm flex items-center rounded-md">
                                    <Upload className="w-4 h-4 mr-2" /> {t('profileSettings.uploadPhoto')}
                                    <input type="file" accept="image/png, image/jpeg" onChange={handleUpload} className="hidden" />
                                </label>
                                <p className="text-xs sm:text-sm text-gray-500 mt-2">{t('profileSettings.photoInstructions')}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div>
                            <Label htmlFor="fullName">{t('profileSettings.fullName')}</Label>
                            <Controller
                                name="fullName"
                                control={profileControl}
                                rules={{ required: t('profileSettings.validation.required', { field: t('profileSettings.fullName') }) }}
                                render={({ field }) => <Input {...field} placeholder={t('profileSettings.fullName')} />}
                            />
                            {profileErrors.fullName && <p className="text-red-500 text-xs">{profileErrors.fullName.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="email">{t('profileSettings.email')}</Label>
                            <Controller
                                name="email"
                                control={profileControl}
                                rules={{
                                    required: t('profileSettings.validation.required', { field: t('profileSettings.email') }),
                                    pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: t('profileSettings.validation.invalidEmail') }
                                }}
                                render={({ field }) => <Input {...field} type="email" readOnly placeholder="email@gmail.com" />}
                            />
                            {profileErrors.email && <p className="text-red-500 text-xs">{profileErrors.email.message}</p>}
                        </div>
                    </div>

                    <div className="mb-6">
                        <Label htmlFor="phone">{t('profileSettings.phone')}</Label>
                        <Controller
                            name="phone"
                            control={profileControl}
                            rules={{
                                required: t('profileSettings.validation.required', { field: t('profileSettings.phone') }),
                                validate: (value) => (value && value.length < 10 ? t('profileSettings.validation.invalidPhone') : true)
                            }}
                            render={({ field: { onChange, value } }) => (
                                <PhoneInput
                                    country="de"
                                    value={value}
                                    onChange={onChange}
                                    enableSearch
                                    placeholder={t('profileSettings.phone')}
                                    containerStyle={{ width: '100%' }}
                                    inputStyle={{ width: '100%', height: '40px', fontSize: '14px' }}
                                    buttonStyle={{ borderRadius: '6px 0 0 6px' }}
                                />
                            )}
                        />
                        {profileErrors.phone && <p className="text-red-500 text-xs">{profileErrors.phone.message}</p>}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mb-8">
                        <Button type="submit" disabled={isUpdating || (!isProfileDirty && !selectedFile)} className="bg-[#319E60] hover:bg-green-600 text-white px-6 py-2 flex-1 disabled:opacity-50">
                            {isUpdating ? t('profileSettings.saving') : t('profileSettings.saveChanges')}
                        </Button>
                        <Button type="button" variant="ghost" onClick={handleCancelProfile} className="text-gray-600 border hover:text-gray-800 px-6 py-2 flex-1">
                            {t('profileSettings.cancel')}
                        </Button>
                    </div>
                </form>

                {/* Password Form */}
                <Card className="mb-8">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-4">
                            <Lock className="w-5 h-5 text-gray-600" />
                            <span className="text-gray-900 font-medium">{t('profileSettings.changePassword')}</span>
                        </div>

                        <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-4">
                            <Controller
                                name="currentPassword"
                                control={passwordControl}
                                rules={{ required: t('profileSettings.validation.required', { field: t('profileSettings.currentPassword') }) }}
                                render={({ field }) => (
                                    <div className="relative">
                                        <Input {...field} type={showCurrentPassword ? "text" : "password"} placeholder={t('profileSettings.currentPassword')} />
                                        <span onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400">{showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}</span>
                                        {passwordErrors.currentPassword && <p className="text-red-500 text-xs">{passwordErrors.currentPassword.message}</p>}
                                    </div>
                                )}
                            />
                            <Controller
                                name="newPassword"
                                control={passwordControl}
                                rules={{
                                    required: t('profileSettings.validation.required', { field: t('profileSettings.newPassword') }),
                                    minLength: { value: 6, message: t('profileSettings.validation.minLengthPassword', { count: 6 }) }
                                }}
                                render={({ field }) => (
                                    <div className="relative">
                                        <Input {...field} type={showNewPassword ? "text" : "password"} placeholder={t('profileSettings.newPassword')} />
                                        <span onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400">{showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}</span>
                                        {passwordErrors.newPassword && <p className="text-red-500 text-xs">{passwordErrors.newPassword.message}</p>}
                                    </div>
                                )}
                            />
                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <Button type="submit" disabled={isChanging || !isPasswordDirty} className="bg-[#319E60] hover:bg-green-600 text-white px-6 py-2 flex-1 disabled:opacity-50">{isChanging ? t('profileSettings.changing') : t('profileSettings.changePassword')}</Button>
                                <Button type="button" variant="ghost" onClick={handleCancelPassword} className="text-gray-600 border hover:text-gray-800 px-6 py-2 flex-1">{t('profileSettings.cancel')}</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
