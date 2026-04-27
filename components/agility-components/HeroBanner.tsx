import { UnloadedModuleProps } from "@agility/nextjs";
import { getContentItem } from "lib/cms/getContentItem";
import HeroBannerGallery from "./HeroBannerGallery";
import { AgilityPic, ImageField, URLField } from "@agility/nextjs";
import Link from "next/link";

interface HeroBannerFields {
  title: string;
  subtitle?: string;
  overlayOpacity?: number;
  textAlignment?: "left" | "center" | "right";
  backgroundImage?: ImageField;
  ctaLink?: URLField;
  imageGallery?: {
    galleryID: number;
    name: string;
    description?: string;
    media: any[];
    count: number;
  };
}

const HeroBanner = async ({ module, languageCode }: UnloadedModuleProps) => {
  const { fields, contentID } = await getContentItem<HeroBannerFields>({
    contentID: module.contentid,
    languageCode,
  });

  // function to check whether or not the url is absolute
  const isUrlAbsolute = (url: string) => url.indexOf("://") > 0 || url.indexOf("//") === 0;

  // function to generate proper link
  const generateLink = (url: string, target: string, text: string) => {
    // if relative link, use next/link
    if (isUrlAbsolute(url) === false) {
      return (
        <Link
          data-agility-field="ctaLink"
          href={url}
          title={text}
          target={target}
          className="inline-block mt-8 md:mt-8 px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-primary-500 hover:bg-primary-700 dark:bg-primary-400 dark:hover:bg-primary-600 focus:outline-hidden focus:border-primary-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
          {text}
        </Link>
      );
    } else {
      // else use anchor tag
      return (
        <a
          data-agility-field="ctaLink"
          href={url}
          title={text}
          target={target}
          className="inline-block mt-8 md:mt-8 px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-primary-500 hover:bg-primary-700 dark:bg-primary-400 dark:hover:bg-primary-600 focus:outline-hidden focus:border-primary-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
          {text}
        </a>
      );
    }
  };

  // Alignment classes
  const alignmentClass = fields.textAlignment === "center" ? "text-center items-center" : fields.textAlignment === "right" ? "text-right items-end" : "text-left items-start";
  const ctaAlignmentClass = fields.textAlignment === "center" ? "justify-center" : fields.textAlignment === "right" ? "justify-end" : "justify-start";

  // Determine grid order based on alignment
  const isRightAligned = fields.textAlignment === "right";

  return (
    <section id={`${contentID}`} className="relative flex items-center justify-center min-h-[80vh] md:min-h-[60vh] overflow-hidden" data-agility-component={contentID}>
      {fields.backgroundImage && (
        <div className="absolute inset-0 z-0">
          <AgilityPic
            image={fields.backgroundImage}
            className="w-full h-full object-cover"
            fallbackWidth={1200}
            priority={true}
            sources={[
              { media: "(min-width: 1200px)", width: 1920 },
              { media: "(min-width: 640px)", width: 1200 },
              { media: "(max-width: 639px)", width: 640 },
            ]}
          />
        </div>
      )}
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-10 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Mobile: Carousel always on top, text below */}
        <div className={`block md:hidden mb-8`}>{fields.imageGallery?.media && fields.imageGallery.count > 0 ? <HeroBannerGallery images={fields.imageGallery.media} /> : null}</div>
        {isRightAligned ? (
          <>
            {/* Desktop: Carousel on left, text on right */}
            <div className="hidden md:block">{fields.imageGallery?.media && fields.imageGallery.count > 0 ? <HeroBannerGallery images={fields.imageGallery.media} /> : null}</div>
            <div className={`text-white flex flex-col ${alignmentClass}`}>
              <h1 className={`text-4xl md:text-6xl font-bold w-full ${fields.textAlignment ? `text-${fields.textAlignment}` : "text-left"}`}>{fields.title}</h1>
              {fields.subtitle && (
                <p
                  className={`mt-4 text-lg md:text-xl text-gray-200 w-full ${fields.textAlignment ? `text-${fields.textAlignment}` : "text-left"}`}
                  style={{
                    opacity: fields.overlayOpacity !== undefined ? fields.overlayOpacity / 100 : 1,
                    transition: "opacity 0.3s",
                  }}>
                  {fields.subtitle}
                </p>
              )}
              {fields.ctaLink && <div className={`w-full flex mt-8 ${ctaAlignmentClass}`}>{generateLink(fields.ctaLink.href, fields.ctaLink.target, fields.ctaLink.text ?? "Learn More")}</div>}
            </div>
          </>
        ) : (
          <>
            {/* Desktop: Text on left, carousel on right */}
            <div className={`text-white flex flex-col ${alignmentClass}`}>
              <h1 className={`text-4xl md:text-6xl font-bold w-full ${fields.textAlignment ? `text-${fields.textAlignment}` : "text-left"}`}>{fields.title}</h1>
              {fields.subtitle && (
                <p
                  className={`mt-4 text-lg md:text-xl text-gray-200 w-full ${fields.textAlignment ? `text-${fields.textAlignment}` : "text-left"}`}
                  style={{
                    opacity: fields.overlayOpacity !== undefined ? fields.overlayOpacity / 100 : 1,
                    transition: "opacity 0.3s",
                  }}>
                  {fields.subtitle}
                </p>
              )}
              {fields.ctaLink && <div className={`w-full flex mt-8 ${ctaAlignmentClass}`}>{generateLink(fields.ctaLink.href, fields.ctaLink.target, fields.ctaLink.text ?? "Learn More")}</div>}
            </div>
            <div className="hidden md:block">{fields.imageGallery?.media && fields.imageGallery.count > 0 ? <HeroBannerGallery images={fields.imageGallery.media} /> : null}</div>
          </>
        )}
      </div>
    </section>
  );
};

export default HeroBanner;
