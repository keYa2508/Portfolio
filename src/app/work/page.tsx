"use client";

import "swiper/css";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";

import { ProjectsList, StackType } from "@/lib/types";
import WorkSliderBtns from "@/components/WorkSliderBtns";
import { clientProjects, organizationalProjects } from "@/lib/datas";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

const Work = () => {
  const [organizationalProject, setOrganizationalProject] =
    useState<ProjectsList>(organizationalProjects.projects[0]);
  const [clientProject, setClientProject] = useState<ProjectsList>(
    clientProjects.projects[0]
  );

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[80hv] flex flex-col justify-center py-12 xl:px-0"
    >
      <div className="container mx-auto">
      <h1 className="text-white text-4xl font-extrabold mb-8 text-wrap">⇒{organizationalProjects.title}</h1>
        <div className="flex flex-col xl:flex-row xl:gap-[30px] mb-28">
          <div className="w-full xl:w-[50%] cl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none gap-[30px]">
            <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
              {organizationalProject.num}
            </div>
            <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
              {organizationalProject.category} Project
            </h2>
            <p className="text-white/60">{organizationalProject.description}</p>
            <ul className="flex flex-wrap gap-4">
              {organizationalProject.stack.map((item: StackType, index) => (
                <li key={index} className="flex flex-row gap-2 items-center">
                  <span className="w-[6px] h-[6px] bg-white" />
                  <span className="text-xl text-accent">{item.name}</span>
                </li>
              ))}
            </ul>
            <div className="w-full border-b border-b-white" />
          </div>
          <div className="w-full xl:w-[50%]">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              className="xl:h-[520px] mb-12 justify-center items-center"
              onSlideChange={(swiper) => {
                const currentIndex = swiper.activeIndex;
                setOrganizationalProject(
                  organizationalProjects.projects[currentIndex]
                );
              }}
            >
              {organizationalProjects.projects.map(
                (item: ProjectsList, index: number) => (
                  <SwiperSlide key={index} className="w-full">
                    <div className="h-[460px] relative group flex justify-center items-center bg-pink-50/20 rounded">
                      <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10" />
                      <div className="relative w-full h-full">
                        <Image
                          src={item.image}
                          fill
                          className="object-cover rounded"
                          alt={item.title}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                )
              )}
              <WorkSliderBtns
                containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none "
                btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all rounded-full"
                iconStyles="text-bold"
              />
            </Swiper>
          </div>
        </div>

        <h1 className="text-white text-4xl font-extrabold mb-8 text-wrap">⇒{clientProjects.title}</h1>
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          <div className="w-full xl:w-[50%] cl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none gap-[30px]">
            <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
              {clientProject.num}
            </div>
            <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
              {clientProject.category} Project
            </h2>
            <p className="text-white/60">{clientProject.description}</p>
            <ul className="flex flex-wrap gap-4">
              {clientProject.stack.map((item: StackType, index) => (
                <li key={index} className="flex flex-row gap-2 items-center">
                  <span className="w-[6px] h-[6px] bg-white" />
                  <span className="text-xl text-accent">{item.name}</span>
                </li>
              ))}
            </ul>
            <div className="w-full border-b border-b-white" />
          </div>
          <div className="w-full xl:w-[50%]">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              className="xl:h-[520px] mb-12 justify-center items-center"
              onSlideChange={(swiper) => {
                const currentIndex = swiper.activeIndex;
                setClientProject(
                  clientProjects.projects[currentIndex]
                );
              }}
            >
              {clientProjects.projects.map(
                (item: ProjectsList, index: number) => (
                  <SwiperSlide key={index} className="w-full">
                    <div className="h-[460px] relative group flex justify-center items-center bg-pink-50/20 rounded">
                      <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10" />
                      <div className="relative w-full h-full">
                        <Image
                          src={item.image}
                          fill
                          className="object-cover rounded"
                          alt={item.title}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                )
              )}
              <WorkSliderBtns
                containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none "
                btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all rounded-full"
                iconStyles="text-bold"
              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Work;
