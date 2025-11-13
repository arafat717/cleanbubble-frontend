
"use client"

import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import bg_hero from "@/assets/bg/bg-hero.png";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function FAQPage() {
  const { t } = useTranslation();

  const jobPosters = t("faq.jobPosters", { returnObjects: true }) as { q: string; a: string }[];
  const contractors = t("faq.contractors", { returnObjects: true }) as { q: string; a: string }[];

  return (
    <div className="min-h-screen">
      <main>
        <div>
          <div
            style={{
              backgroundImage: `url(${typeof bg_hero === "string" ? bg_hero : bg_hero.src})`,
            }}
            className="relative overflow-hidden w-full min-h-[92vh] -mt-16 flex flex-col items-center justify-center bg-cover bg-center"
          >
            <div className="text-center px-4">
              <h1 className="text-4xl md:text-6xl lg:text-[80px] font-normal leading-tight text-[#17171A]">
                {t("faq.title")}
              </h1>
              <h4 className="text-base md:text-xl lg:text-2xl text-[#17171A] font-roboto font-medium leading-relaxed text-center mt-4">
                {t("faq.subtitle")}
              </h4>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-7xl mx-auto my-20">
            <div className="text-center mb-12">
              <div className="inline-block bg-[#D4F061] text-lime-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
                {t("faq.label")}
              </div>
              <h2 className="text-[44px] font-normal leading-11 text-foreground mb-12">
                {t("faq.heading")}
              </h2>
            </div>

            {/* For Job Posters */}
            <div className="mb-12">
              <h3 className="text-3xl font-normal text-[#17171A] mb-6 leading-12">
                {t("faq.jobPostersTitle")}
              </h3>
              <Accordion type="single" collapsible className="space-y-4">
                {jobPosters.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`jobPoster-${index}`}
                    className="bg-white/80 backdrop-blur-sm rounded-lg border border-lime-200"
                  >
                    <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-lime-500 rounded-full flex items-center justify-center text-white text-sm">?</div>
                        {item.q}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-muted-foreground">{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* For Contractors */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-foreground mb-6">
                {t("faq.contractorsTitle")}
              </h3>
              <Accordion type="single" collapsible className="space-y-4">
                {contractors.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`contractor-${index}`}
                    className="bg-white/80 backdrop-blur-sm rounded-lg border border-lime-200"
                  >
                    <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-lime-500 rounded-full flex items-center justify-center text-white text-sm">?</div>
                        {item.q}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-muted-foreground">{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Still Have Questions */}
            <div className="text-center pb-10">
              <h3 className="text-2xl font-normal text-foreground mb-4">{t("faq.stillQuestionsTitle")}</h3>
              <p className="text-muted-foreground mb-6">{t("faq.stillQuestionsText")}</p>
              <Link href={"/contact"}>
                <Button className="bg-[#319E60] cursor-pointer border border-[#319E60] hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full">
                  {t("faq.contactUs")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
