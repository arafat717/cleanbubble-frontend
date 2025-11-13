"use client";

import { useForm } from "react-hook-form";
import bg_hero from "@/assets/bg/bg-hero.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import { useSentMessageMutation } from "@/redux/api/admin/repost.api";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

export default function Contact() {
  const { t } = useTranslation();
  const [sentMessage] = useSentMessageMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>();

  const onSubmit = async (data: ContactFormValues) => {
    const res = await sentMessage(data);
    if (res?.data) {
      toast.success(t("contact.form.sendButton") + " " + "successfully!");
      reset();
    } else {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Section */}
        <div
          style={{
            backgroundImage: `url(${typeof bg_hero === "string" ? bg_hero : bg_hero.src})`,
          }}
          className="relative overflow-hidden w-full min-h-[92vh] -mt-16 flex flex-col items-center justify-center bg-cover bg-center"
        >
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-6xl lg:text-[80px] font-normal leading-tight text-[#17171A]">
              {t("contact.heroTitle")}
            </h1>
            <h4 className="text-base md:text-xl lg:text-2xl text-[#17171A] font-roboto font-medium leading-relaxed mt-4">
              {t("contact.heroSubtitle1")} <br className="hidden md:block" />{" "}
              {t("contact.heroSubtitle2")}
            </h4>
          </div>
        </div>

        {/* Contact Section */}
        <section className="mx-auto px-4 max-w-[1500px]">
          <div className="mx-auto px-4 py-16">
            {/* Contact Us Button */}
            <div className="text-center mb-8">
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-full">
                {t("contact.contactUsButton")}
              </Button>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-16 text-balance">
              {t("contact.mainHeading")}
            </h1>

            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Contact Information Card */}
              <Card className="p-8 bg-white border border-gray-200 rounded-2xl">
                <div className="space-y-8">
                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Mail className="w-4 h-4 text-cyan-600" />
                    </div>
                    <div>
                      <p className="text-gray-900 font-medium">{t("contact.contactInfo.email")}</p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <MapPin className="w-4 h-4 text-cyan-600" />
                    </div>
                    <div>
                      <p className="text-gray-900 font-medium">{t("contact.contactInfo.addressLine1")}</p>
                      <p className="text-gray-900 font-medium">{t("contact.contactInfo.addressLine2")}</p>
                    </div>
                  </div>

                  {/* Phone Numbers */}
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Phone className="w-4 h-4 text-cyan-600" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-900 font-medium">{t("contact.contactInfo.phone1")}</p>
                      <p className="text-gray-900 font-medium">{t("contact.contactInfo.phone2")}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Contact Form */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                  {t("contact.form.heading")}
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t("contact.form.name")}</label>
                    <Input
                      type="text"
                      placeholder={t("contact.form.namePlaceholder")}
                      {...register("name", { required: t("contact.formErrors.nameRequired") })}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t("contact.form.email")}</label>
                    <Input
                      type="email"
                      placeholder={t("contact.form.emailPlaceholder")}
                      {...register("email", {
                        required: t("contact.formErrors.emailRequired"),
                        pattern: {
                          value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                          message: t("contact.formErrors.emailInvalid"),
                        },
                      })}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t("contact.form.message")}</label>
                    <Textarea
                      rows={6}
                      placeholder={t("contact.form.messagePlaceholder")}
                      {...register("message", {
                        required: t("contact.formErrors.messageRequired"),
                        minLength: {
                          value: 10,
                          message: t("contact.formErrors.messageMin"),
                        },
                      })}
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                  >
                    {isSubmitting ? t("contact.form.sending") : t("contact.form.sendButton")}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
