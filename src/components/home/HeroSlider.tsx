"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { heroSlides } from "@/data/home";
import { cn } from "@/lib/utils";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const swiperTheme = {
  "--swiper-navigation-color": "#ffffff",
  "--swiper-navigation-size": "28px",
  "--swiper-pagination-color": "#e9a93b",
  "--swiper-pagination-bullet-inactive-color": "#ffffff",
  "--swiper-pagination-bullet-inactive-opacity": "0.5",
} as CSSProperties;

export function HeroSlider() {
  return (
    <section aria-label="Featured" className="hero-swiper">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        style={swiperTheme}
        loop
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div className={cn("bg-gradient-to-br text-white", slide.gradient)}>
              <div className="container-page flex h-[26rem] flex-col items-center justify-center px-12 pb-10 text-center md:h-[30rem]">
                <h2 className="max-w-3xl font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  {slide.title}
                </h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-white/85 md:text-lg">{slide.text}</p>
                <Link href="/books" className="btn-accent mt-8">
                  Browse Books
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
