"use client";

export default function HeroSection() {
  return (
    <>
      <section className="relative flex items-center overflow-hidden bg-dark-grey pt-20 hero-section">
        <video
          className="relative left-1/2 h-[calc(100dvh-5rem)] w-auto max-w-none -translate-x-1/2 sm:static sm:left-auto sm:block sm:aspect-auto sm:h-auto sm:w-full sm:max-w-full sm:translate-x-0"
          src="/Banner_Video.mp4"
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => window.dispatchEvent(new Event("hero-video-ready"))}
        />
      </section>

      <div className="border-t border-grey-1 bg-dark-grey px-6 py-12 md:px-12 md:py-16 lg:px-20">
        <h1 className="bebas text-center text-4xl uppercase leading-[0.95] text-white sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="text-bt-red">Growth Systems</span> for Modern Brands and Businesses
        </h1>
      </div>
    </>
  );
}
