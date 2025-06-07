import Link from "next/link";
import { ArrowRight, Award, BookOpen, Calendar, Heart } from "lucide-react";
import Image from "next/image";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About the Founder
            </h1>
            <p className="text-xl mb-6">
              The story behind Change the Narrative 333 and its mission
            </p>
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
            <div className="md:col-span-3">
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Christian Gant-Madison
              </h2>
              <div className="prose max-w-none">
                {/* Image */}
                <Image
                  src='/assets/founder.jpg' // or use `Image` if you're using Next.js
                  alt="Christian Gant-Madison"
                  width={300}
                  height={300}
                  className="object-cover mr-4 mb-4 sm:mb-0 float-left"
                />

                {/* Text */}
                <p className="text-gray-700 text-base leading-relaxed">
                  Christian Gant-Madison founded Change the Narrative 333 after
                  personally experiencing the devastating impacts of gun
                  violence and witnessing the struggles many face when trying to
                  access support and resources in its aftermath.
                </p>

                <p className="mb-4">
                  Having lost loved ones to gun violence and navigating the
                  complex journey of recovery, Christian recognized significant
                  gaps in available services, particularly for underserved
                  communities. The fragmentation of support systems and the
                  difficulty in accessing them inspired a vision for a
                  centralized approach to connecting people with the help they
                  need.
                </p>

                <p className="mb-4">
                  Beyond addressing immediate needs, Christian was driven by a
                  deeper conviction: that lasting change requires shifting
                  narratives around violence, trauma, and recovery. This belief
                  in the power of storytelling and community building became a
                  cornerstone of the organization&apos;s approach.
                </p>

                <p>
                  Today, through leadership and personal experience, Christian
                  guides Change the Narrative 333&apos;s mission to bridge resource
                  gaps, foster community healing, and ultimately break cycles of
                  violence and inequality.
                </p>
              </div>

              <h3 className="text-2xl font-bold mt-12 mb-4 text-primary">
                The Significance of &quot;333&quot;
              </h3>
              <div className="prose max-w-none">
                <p className="mb-4">
                  The number &quot;333&quot; holds special significance in our
                  organization&apos;s name and philosophy. In numerology, 333 is
                  often associated with protection, encouragement, and divine
                  guidance. For our founder, it represents:
                </p>

                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li>
                    <strong>Mind, Body, and Spirit</strong> — The three aspects
                    of holistic healing that our programs address
                  </li>
                  <li>
                    <strong>Community, Resources, and Advocacy</strong> — The
                    three pillars of our approach to creating change
                  </li>
                  <li>
                    <strong>Past, Present, and Future</strong> — Acknowledging
                    history, addressing current needs, and building toward a
                    better tomorrow
                  </li>
                </ul>

                <p>
                  The number also serves as a reminder that in moments of
                  darkness, guidance and support are available—just as our
                  organization aims to be a beacon for those in need.
                </p>
              </div>
            </div>

            <div className="md:col-span-2 bg-gray-50 rounded-lg p-6">
              <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg mb-6">
                {/* Placeholder for founder image */}
                <div className="flex items-center justify-center w-full h-full bg-primary/10 rounded-lg">
                  <BookOpen className="h-20 w-20 text-primary/30" />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-primary mb-1">Mission</h4>
                  <p>
                    To transform lives impacted by gun violence and systemic
                    inequality through centralized support, community
                    engagement, and narrative change.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-primary mb-1">Vision</h4>
                  <p>
                    Communities where individuals thrive free from violence,
                    with equitable access to resources and opportunities for
                    healing and growth.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-primary mb-1">Values</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Human-centered approaches</li>
                    <li>Accessibility and equity</li>
                    <li>Trauma-informed care</li>
                    <li>Community collaboration</li>
                    <li>Sustainable impact</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline/Milestones */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-primary text-center">
            Our Journey
          </h2>

          <div className="relative max-w-3xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-primary/20"></div>

            {/* Timeline items */}
            <div className="relative space-y-12">
              <TimelineItem
                year="2020"
                title="Organization Founded"
                content="Change the Narrative 333 established in response to rising gun violence and lack of centralized support."
                isLeft={true}
              />

              <TimelineItem
                year="2021"
                title="First Community Outreach"
                content="Launched initial programs connecting individuals to mental health resources and emergency support services."
                isLeft={false}
              />

              <TimelineItem
                year="2022"
                title="Digital Platform Development"
                content="Created online resource hub and digital storytelling initiative to increase accessibility and reach."
                isLeft={true}
              />

              <TimelineItem
                year="2023"
                title="Partnership Network Expansion"
                content="Established formal partnerships with healthcare providers, housing services, and education resources."
                isLeft={false}
              />

              <TimelineItem
                year="2024"
                title="Comprehensive Support Model"
                content="Integrated survey system to match individuals with tailored resources and ongoing support."
                isLeft={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#F7F3EB]">
        <div className="container-custom text-center">
          <div className="max-w-2xl mx-auto">
            <Heart className="h-16 w-16 mb-6 mx-auto text-gold" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Our Mission
            </h2>
            <p className="text-xl mb-8">
              Help us change narratives and transform lives by getting involved
              today.
            </p>
            <div className="flex flex-col flex-wrap gap-4 md:justify-center items-center md:flex-row">
              <Link href="/register" className="rounded-full w-fit">
                <div className="text-xl md:text-2xl font-extrabold font-sans border-2 border-black rounded-full inline-flex gap-2 hover:gap-6 transition-all ease-in duration-100 p-3 md:p-6">
                  <p>GET INVOLVED</p>
                  <ArrowRight className="self-center" />
                </div>
              </Link>
              <Link href="/donate" className="rounded-full w-fit">
                <div className="text-xl md:text-2xl font-extrabold font-sans border-2 border-black rounded-full inline-flex gap-2 hover:gap-6 transition-all ease-in duration-100 p-3 md:p-6">
                  <p>SUPPORT OUR WORK</p>
                  <ArrowRight className="self-center" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Timeline Item Component
interface TimelineItemProps {
  year: string;
  title: string;
  content: string;
  isLeft: boolean;
}

const TimelineItem = ({ year, title, content, isLeft }: TimelineItemProps) => {
  return (
    <div
      className={`relative flex flex-col ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } items-center`}
    >
      <div className="mb-4 md:mb-0 flex-1">
        <div
          className={`bg-white p-6 rounded-lg shadow-md ${
            isLeft ? "md:mr-8" : "md:ml-8"
          }`}
        >
          <div className="flex items-center mb-2">
            <Calendar className="h-5 w-5 text-accent mr-2" />
            <span className="font-bold text-accent">{year}</span>
          </div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-600">{content}</p>
        </div>
      </div>

      <div className="z-10 bg-primary rounded-full p-2 my-4 md:my-0">
        <Award className="h-5 w-5 text-white" />
      </div>

      <div className="flex-1"></div>
    </div>
  );
};

export default About;
