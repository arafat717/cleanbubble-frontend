"use client";

import { useTranslation } from "react-i18next";

export default function TermsOfServicePage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-background">
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-[600] text-[#222]">
              {t("termsOfService.title")}
            </h1>
          </div>

          <div className="prose prose-gray max-w-none space-y-8">
            <div>
              <p className="text-[#595959] text-lg font-[400] mb-6">
                {t("termsOfService.intro")}
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-[500] text-[#222] mb-4">
                {t("termsOfService.acceptanceOfTerms")}
              </h2>
              <p className="text-[#595959] text-lg font-[400]">
                {t("termsOfService.acceptanceText")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-[500] text-[#222] mb-4">
                {t("termsOfService.userRoles")}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">{t("termsOfService.jobPosters")}</h3>
                  <p className="text-[#595959] text-lg font-[400]">
                    {t("termsOfService.jobPostersText")}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">{t("termsOfService.contractors")}</h3>
                  <p className="text-[#595959] text-lg font-[400]">
                    {t("termsOfService.contractorsText")}
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-[500] text-[#222] mb-4">
                {t("termsOfService.accountRegistration")}
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-[#595959] text-lg font-[400]">
                <li>{t("termsOfService.accountRule1")}</li>
                <li>{t("termsOfService.accountRule2")}</li>
                <li>{t("termsOfService.accountRule3")}</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-[500] text-[#222] mb-4">
                {t("termsOfService.postingJobs")}
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-[#595959] text-lg font-[400]">
                <li>{t("termsOfService.postJobRule1")}</li>
                <li>{t("termsOfService.postJobRule2")}</li>
                <li>{t("termsOfService.postJobRule3")}</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-[500] text-[#222] mb-4">
                {t("termsOfService.paymentsAndFees")}
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-[#595959] text-lg font-[400]">
                <li>{t("termsOfService.paymentRule1")}</li>
                <li>{t("termsOfService.paymentRule2")}</li>
                <li>{t("termsOfService.paymentRule3")}</li>
                <li>{t("termsOfService.paymentRule4")}</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-[500] text-[#222] mb-4">
                {t("termsOfService.prohibitedActivities")}
              </h2>
              <p className="text-[#595959] text-lg font-[400] mb-4">
                {t("termsOfService.youAgreeNotTo")}
              </p>
              <ol className="list-decimal list-inside space-y-2 text-[#595959] text-lg font-[400]">
                <li>{t("termsOfService.prohibited1")}</li>
                <li>{t("termsOfService.prohibited2")}</li>
                <li>{t("termsOfService.prohibited3")}</li>
                <li>{t("termsOfService.prohibited4")}</li>
                <li>{t("termsOfService.prohibited5")}</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-[500] text-[#222] mb-4">
                {t("termsOfService.privacyDataUse")}
              </h2>
              <p className="text-[#595959] text-lg font-[400]">
                {t("termsOfService.privacyText")}
                <a href="/privacy-policy" className="text-primary hover:underline">
                  {t("termsOfService.here")}
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-[500] text-[#222] mb-4">
                {t("termsOfService.dataRetention")}
              </h2>
              <p className="text-[#595959] text-lg font-[400]">
                {t("termsOfService.dataRetentionText")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-[500] text-[#222] mb-4">
                {t("termsOfService.intellectualProperty")}
              </h2>
              <p className="text-[#595959] text-lg font-[400]">
                {t("termsOfService.intellectualPropertyText")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-[500] text-[#222] mb-4">
                {t("termsOfService.governingLaw")}
              </h2>
              <p className="text-[#595959] text-lg font-[400]">
                {t("termsOfService.governingLawText")}
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
