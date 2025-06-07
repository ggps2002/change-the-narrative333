"use client";

import BlackVotesMatter from "@/public/assets/partners/BlackVotesMatter";
import Reform from "@/public/assets/partners/Reform";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [showFullProblem, setShowFullProblem] = useState(false);
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Bold, full-width with impactful typography */}
      <section className="relative md:h-[70vh] h-[40vh] w-full overflow-hidden">
        <div className="relative z-10 -top-[4%] -left-[3%] md:-top-[6%] md:left-[10%] w-fit">
          <div className="container-custom">
            <Link href="/" className=" text-white">
              <Image
                src="/assets/logo.svg"
                height={140}
                width={140}
                alt="logo"
                className="invert md:h-[250px] md:w-[250px]"
              />
            </Link>
          </div>
        </div>
        {/* Background Image Layer */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: `url(/assets/heroImage.jpg)`,
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Right-aligned welcome text */}
        {/* <div className="relative p-2 bg-red-500 z-10 w-[200px] h-fit">
          <div className="text-white space-y-2">
            <h2 className="text-sm md:text-lg font-bold">
              Welcome to Philadelphia
            </h2>
            <p className="text-xs md:text-sm text-white/80">
              Centering community, justice, and resilience
              <br /> in the City of Brotherly Love.
            </p>
          </div>
        </div> */}
      </section>

      {/* Overlapping Typography Box with blend mode */}
      <div className="md:-mt-[3rem] lg:-mt-[4.8rem] -mt-[2.5rem] z-10 relative">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase mb-4 tracking-tight">
            <span className="text-white whitespace-nowrap">
              CHANGING NARRATIVES{" "}
            </span>
            <br />
            TO REDEFINE WHAT'S POSSIBLE.
          </h1>
          <p className="text-lg md:text-2xl text-black mb-2">
            Centering People. Building Access. Driven by Justice.
          </p>
          <p className="text-sm mb-6">501(c)(3) Non-Profit Organization</p>
          <div className="flex gap-6 flex-wrap mt-10 mb-6 md:mb-16">
            {/* <Link href="/register" className="rounded-full w-fit">
              <div className="text-xl md:text-2xl font-extrabold font-sans border-2 border-black rounded-full inline-flex gap-2 hover:gap-6 transition-all ease-in duration-200 p-3 md:p-6">
                <p>GET HELP</p>
                <ArrowRight className="self-center" />
              </div>
            </Link> */}
            <Link href="/donate" className="rounded-full w-fit">
              <div className="text-xl font-extrabold font-sans border-2 border-black rounded-full inline-flex gap-2 hover:gap-6 transition-all ease-in duration-200 p-3 md:p-6">
                <p>SUPPORT US</p>
                <ArrowRight className="self-center" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Issues We Fight For Section - Inspired by SPLC layout */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-5xl font-black mb-12 uppercase">
            What we advocate for
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-6 grid-rows-[repeat(2,minmax(200px,1fr))] gap-6">
            {/* Problem (Big block) */}
            <div className="relative rounded-xl overflow-hidden group col-span-1 row-span-1 md:col-span-4 md:row-span-2 h-80 md:h-[41.5rem]">
              <Image
                src="https://images.unsplash.com/photo-1557089041-7fa93ffc2e08?w=600&auto=format&fit=crop&q=60"
                alt="Gun Violence Context"
                width={987}
                height={640}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 p-6 flex flex-col justify-end text-white">
                <h3 className="text-2xl font-bold mb-2">
                  Understanding the Problem
                </h3>
                <p className="text-sm">
                  Gun violence is not an isolated issue—it’s the result of
                  intersecting social challenges like poverty, housing
                  instability, underfunded schools, and generational trauma.
                </p>
                <div className="flex gap-1">
                  <Link
                    href="/about"
                    className="text-gold hover:underline font-medium mt-3"
                  >
                    View More
                  </Link>
                  <span className="self-end text-gold">→</span>
                </div>
              </div>
            </div>

            {/* Solution */}
            <div className="relative rounded-xl overflow-hidden group col-span-1 md:col-span-2 row-span-1 h-80">
              <Image
                src="https://images.unsplash.com/photo-1587426301582-fe3d3deaf58a?w=600&auto=format&fit=crop&q=60"
                alt="Solution Image"
                width={987}
                height={640}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 p-6 flex flex-col justify-end text-white">
                <h3 className="text-2xl font-bold mb-2">Our Approach</h3>
                <p className="text-sm">
                  We build bridges between communities and resources by
                  partnering with local and national organizations, creating
                  resource hubs, and increasing visibility through media and
                  events
                </p>
                <div className="flex gap-1">
                  <Link
                    href="/about"
                    className="text-gold hover:underline font-medium mt-3"
                  >
                    View More
                  </Link>
                  <span className="self-end text-gold">→</span>
                </div>
              </div>
            </div>

            {/* Vision (Tall block) */}
            <div className="relative rounded-xl overflow-hidden group col-span-1 md:col-span-2 row-span-2 h-80">
              <Image
                src="https://images.unsplash.com/photo-1590962374541-d368b15568e9?w=600&auto=format&fit=crop&q=60"
                alt="Impact Image"
                width={987}
                height={640}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 p-6 flex flex-col justify-end text-white">
                <h3 className="text-2xl font-bold mb-2">The Vision</h3>
                <p className="text-sm">
                  We envision safer, more stable communities where individuals
                  have the tools to heal, grow, and break cycles of
                  trauma—unlocking their full potential.
                </p>
                <div className="flex gap-1">
                  <Link
                    href="/about"
                    className="text-gold hover:underline font-medium mt-3"
                  >
                    View More
                  </Link>
                  <span className="self-end text-gold">→</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bold Mission Section - Large Typography */}
      <section className="py-16 bg-[#F7F3EB]">
        <div className="container-custom">
          <div className="md:flex md:items-start md:gap-12">
            <div className="md:w-2/3">
              <h2 className="text-5xl md:text-7xl font-black mb-8 uppercase tracking-tight">
                CHANGE THE NARRATIVE. <br /> THEN LEAD ETHICALLY.
              </h2>

              <div className="prose max-w-none text-lg">
                <p className="mb-4">
                  Persistent gaps in access and opportunity continue to plague
                  our communities, often by creating cycles of trauma that are
                  difficult to break.
                </p>

                {showFullProblem ? (
                  <>
                    <p className="mb-4">
                      Many individuals affected by these issues lack access to
                      crucial resources, support systems, and opportunities for
                      healing and growth. This creates a perpetuating cycle
                      where:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                      <li>
                        <strong>
                          Limited access to mental health resources
                        </strong>{" "}
                        prevents healing from trauma
                      </li>
                      <li>
                        <strong>Economic barriers</strong> restrict
                        opportunities for advancement
                      </li>
                      <li>
                        <strong>Fragmented support systems</strong> make it
                        difficult to navigate available services
                      </li>
                      <li>
                        <strong>Stigma and misunderstanding</strong> around
                        violence and trauma prevent open dialogue and effective
                        solutions
                      </li>
                    </ul>
                    <p>
                      These challenges require a holistic approach that
                      addresses immediate needs while working toward long-term
                      systemic change—the mission at the heart of Change the
                      Narrative 333.
                    </p>
                  </>
                ) : null}

                <button
                  onClick={() => setShowFullProblem(!showFullProblem)}
                  className="flex items-center font-semibold mt-2 hover:underline focus:outline-none"
                >
                  {showFullProblem ? (
                    <>
                      <span>Read Less</span>
                      <ChevronUp className="ml-1 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <span>Read More</span>
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="mt-8 md:mt-0 md:w-1/3">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-4">
                  Our Esteemed Partners
                </h3>
                <div className="grid grid-cols-5 gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2">
                      <BlackVotesMatter />
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2">
                      <Image
                        src="https://thelohm.org/wp-content/uploads/2020/03/mainlogo_web.png"
                        height={100}
                        width={100}
                        alt="TheLOHM"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-[#0C64A0] p-2 rounded-full flex items-center justify-center mb-2">
                      <Image
                        src="/assets/partners/nami-logo.png"
                        height={100}
                        width={100}
                        alt="nami"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2">
                      <Image
                        src="https://policingequity.org/wp-content/uploads/2024/05/CPE-FullColor-Logo-145x38.webp"
                        height={100}
                        width={100}
                        alt="PolicyEquity"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2">
                      <Reform />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section with Bold Headlines */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="space-y-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase">
                REIMAGINING JUSTICE
              </h2>
              <div className="flex flex-col md:flex-row">
                <div className="mr-4 rounded">
                  <Image
                    src="https://images.unsplash.com/photo-1743897981335-2e4c3f9fb488?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG5vbiUyMHByb2ZpdCUyMG9yZ2FuaXphdGlvbnxlbnwwfHwwfHx8MA%3D%3D"
                    height={500}
                    width={500}
                    alt="protest"
                  />
                </div>
                <div>
                  <p className="text-lg">
                    Representing people from communities affected by structural
                    violence, creating new frameworks for justice.
                  </p>
                  <Link
                    href="/about"
                    className="text-accent hover:underline font-medium"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase">
                INSPIRING HOPE
              </h2>
              <div className="flex flex-col md:flex-row">
                <div className="mr-4 rounded">
                  <Image
                    src="https://images.unsplash.com/photo-1592081164105-70c567c6cfa2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEyfHxub24lMjBwcm9maXQlMjBvcmdhbml6YXRpb258ZW58MHx8MHx8fDA%3D"
                    height={500}
                    width={500}
                    alt="peace"
                  />
                </div>
                <div>
                  <p className="text-lg">
                    Sharing stories of resilience and recovery from those
                    who&apos;ve rebuilt after trauma.
                  </p>
                  <Link
                    href="/about"
                    className="text-accent hover:underline font-medium"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase">
                TRACKING ISSUES
              </h2>
              <div className="flex flex-col md:flex-row">
                <div className="mr-4 rounded">
                  <Image
                    src="https://images.unsplash.com/photo-1693027986160-78f29eabc5de?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fG5vbiUyMHByb2ZpdCUyMG9yZ2FuaXphdGlvbiUyMGNvbW11bml0eSUyMHBlb3BsZSUyMGZpZ2h0aW5nJTIwb3ZlciUyMHZpb2xlbmNlfGVufDB8fDB8fHww"
                    height={500}
                    width={500}
                    alt="people"
                  />
                </div>
                <div>
                  <p className="text-lg">
                    Monitoring incidents of violence and systemic inequality
                    across the nation.
                  </p>
                  <Link
                    href="/blog"
                    className="text-accent hover:underline font-medium"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Two Column Layout */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="container-custom">
          <div className="md:flex">
            <div className="md:w-1/2 flex flex-col justify-around">
              <div>
                <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase">
                  Take Action
                </h2>
                <p className="text-xl mb-6">
                  Change starts with individual actions. Join us in our mission
                  to break cycles of violence and create stronger, more
                  equitable communities.
                </p>
              </div>
              <Link href="/register" className="rounded-full w-fit">
                <div className="text-xl md:text-2xl font-extrabold font-sans border-2 border-black rounded-full inline-flex gap-2 hover:gap-6 transition-all ease-in duration-100 p-3 md:p-6">
                  <p>GET INVOLVED</p>
                  <ArrowRight className="self-center" />
                </div>
              </Link>
            </div>

            <div className="mt-8 md:mt-0 md:w-1/2 md:pl-12">
              <Image
                src="https://images.unsplash.com/photo-1655720359248-eeace8c709c5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d2UlMjBhcmUlMjB0b2dldGhlciUyMHRvJTIwaGVscCUyMGVhY2hvdGhlcnxlbnwwfHwwfHx8MA%3D%3D"
                alt="People at protest"
                width={1074}
                height={720}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
