"use client";

import { useTranslation } from "react-i18next";

export default function PrivacyPolicyPage() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen">
            <div className="mx-auto py-8 max-w-7xl">
                <div className="prose prose-gray max-w-none">
                    <h1 className="text-5xl font-[600] text-[#222] text-center my-10">
                        {t("privacyPolicy.title")}
                    </h1>

                    <p className="text-[#595959] text-lg font-[400]">
                        {t("privacyPolicy.intro")}
                    </p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-[500] text-[#222] mb-4">
                            {t("privacyPolicy.whoWeAre")}
                        </h2>
                        <p className="text-[#595959] text-lg font-[400]">
                            {t("privacyPolicy.whoWeAreDesc")}
                        </p>
                        <p className="text-[#595959] text-lg font-[400]">
                            {t("privacyPolicy.contactUs")}
                        </p>
                        <p className="text-[#595959] text-lg font-[400]">
                            {t("privacyPolicy.email")}: {t("privacyPolicy.emailAddress")}
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-[500] text-[#222] mb-4">
                            {t("privacyPolicy.whatInfoWeCollect")}
                        </h2>
                        <p className="text-[#595959] text-lg font-[400]">
                            {t("privacyPolicy.infoCollectDesc")}:
                        </p>

                        <div className="ml-4 mb-4">
                            <h3 className="text-lg font-medium mb-2">
                                {t("privacyPolicy.partnerOffers")}
                            </h3>
                            <ul className="list-disc ml-6 space-y-1">
                                {(t('privacyPolicy.infoList1', { returnObjects: true }) as string[]).map((item, index) => (
                                    <li key={index} className="text-[#595959] text-lg font-[400]">{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="ml-4">
                            <h3 className="text-lg font-medium mb-2">
                                {t("privacyPolicy.partnerOffers")}
                            </h3>
                            <ul className="list-disc ml-6 space-y-1">
                                {(t('privacyPolicy.infoList2', { returnObjects: true }) as string[]).map((item, index) => (
                                    <li key={index} className="text-[#595959] text-lg font-[400]">{item}</li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-[500] text-[#222] mb-4">
                            {t("privacyPolicy.howWeUseInfo")}
                        </h2>
                        <p>{t("privacyPolicy.howWeUseDesc")}</p>
                        <ul className="list-disc ml-6 space-y-1">
                            {(t('privacyPolicy.howWeUseList', { returnObjects: true }) as string[]).map((item, index) => (
                                <li key={index} className="text-[#595959] text-lg font-[400]">{item}</li>
                            ))}
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-[500] text-[#222] mb-4">
                            {t("privacyPolicy.whoWeShareInfoWith")}
                        </h2>
                        <p className="text-[#595959] text-lg font-[400]">
                            {t("privacyPolicy.shareInfoDesc")}
                        </p>
                        <ul className="list-disc ml-6 space-y-1">
                            {(t('privacyPolicy.shareInfoList', { returnObjects: true }) as string[]).map((item, index) => (
                                <li key={index} className="text-[#595959] text-lg font-[400]">{item}</li>
                            ))}
                        </ul>
                    </section>

                    {/* Continue other sections similarly using t() */}
                </div>
            </div>
        </div>
    );
}
