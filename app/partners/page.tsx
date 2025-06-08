import Link from "next/link";
import React from "react";
import Image from "next/image";
import BlackVotesMatter from "@/public/assets/partners/BlackVotesMatter";

// Partner data - replace with your actual partners
const partners = [
  {
    id: 1,
    name: "Black Votes Matter",
    logo: BlackVotesMatter,
    category: "Legal Advocacy",
    description: `Black Voters Matter Fund is a nonprofit organization committed to increasing power in marginalized, predominantly Black communities through voter engagement, policy advocacy, and grassroots organizing. Their work centers on expanding access to voting, supporting Black-led community-based organizations, and promoting policies that advance racial, social, and economic justice. By mobilizing voters and building long-term political infrastructure, Black Voters Matter aims to amplify the voices of Black communities and ensure they are a driving force in shaping democratic outcomes.`,
    website: "https://blackvotersmatterfund.org/",
    partnership_since: "2025",
  },
  {
    id: 2,
    name: "The Ladies of Hope Ministries (LOHM)",
    logo: "https://thelohm.org/wp-content/uploads/2020/03/mainlogo_web.png",
    category: "Community Building",
    description: `The Ladies of Hope Ministries (LOHM) is a nonprofit organization dedicated to empowering 
women and girls who have been directly impacted by the criminal legal system. Founded by 
justice reform advocate Topeka K. Sam, the organization works to create sustainable reentry 
pathways through housing, education, advocacy, and entrepreneurship. Through initiatives like 
the Hope House and Faces of Women Imprisoned, LOHM focuses on restoring dignity, 
amplifying the voices of system-impacted individuals, and transforming the narrative around 
incarceration—especially for women of color.`,
    website: "https://thelohm.org/ ",
    partnership_since: "2025",
  },
  {
    id: 3,
    name: "National Alliance on Mental Illness (NAMI)",
    logo: "/assets/partners/nami-logo.png",
    category: "Research & Policy",
    description: `The National Alliance on Mental Illness (NAMI) is the United States' largest grassroots mental 
health organization dedicated to building better lives for individuals affected by mental illness. 
NAMI provides advocacy, education, support, and public awareness to ensure that individuals 
and families impacted by mental health conditions can access the care and resources they need. 
Through a network of local affiliates and state organizations, NAMI offers free mental health 
programs, peer support groups, crisis intervention, and initiatives to reduce stigma and promote 
mental health equity nationwide.`,
    website: "https://www.nami.org/ ",
    partnership_since: "2021",
  },
  {
    id: 4,
    name: "Aniyiah’s Companions",
    category: "Financial Literacy",
    description: `Aniyah’s Companions is a Philadelphia-based organization dedicated to empowering youth and 
adults through comprehensive life skills and financial literacy education. The organization offers 
hands-on support in areas such as banking, credit, budgeting, and money 
management—equipping participants with the tools needed for long-term financial stability. 
Through workshops on homeownership, small business development, and wealth building, 
Aniyah’s Companions promotes economic empowerment across generations. In addition, the 
organization provides critical life skills training in areas like career readiness, educational 
planning, health, mental wellness, tenant rights, and relationship building. Their holistic 
approach connects individuals to essential community resources while fostering confidence, 
independence, and leadership through interactive programming and community engagement.`,
    website: "",
    partnership_since: "2025",
  },
  {
    id: 5,
    name: "Center for Policing Equity",
    logo: "https://policingequity.org/wp-content/uploads/2024/05/CPE-FullColor-Logo-145x38.webp",
    category: "Youth Development",
    description: `The Center for Policing Equity (CPE) is a research and action organization that works to advance 
justice by confronting and eliminating racial bias in public safety systems. Rooted in data science 
and social justice, CPE partners with communities and law enforcement agencies to analyze 
policing practices, measure equity, and develop actionable strategies for reducing harm and 
promoting accountability. Their work includes producing reports on racial disparities in policing, 
supporting departments with reform implementation, and empowering communities with data to 
drive change. By using rigorous research and community collaboration, CPE aims to build 
systems of public safety that are rooted in equity, transparency, and public trust.`,
    website: "https://policingequity.org/ ",
    partnership_since: "2025",
  },
  {
    id: 6,
    name: "REFORM Alliance ",
    logo: '/assets/partners/Reform.svg',
    category: "Economic Empowerment",
    description: `REFORM Alliance is a national nonprofit organization committed to transforming probation, 
parole, and the broader criminal justice system in the United States. Co-founded by leaders in 
entertainment, business, and advocacy—including Meek Mill and Jay-Z—the organization works 
to reduce the number of people trapped in the criminal legal system through smart, measurable 
policy change. By focusing on supervision reform, REFORM aims to create pathways for 
success rather than cycles of incarceration. Through legislation, public awareness campaigns, 
and partnerships with impacted communities, REFORM Alliance seeks to advance a more 
equitable and restorative approach to justice.`,
    website: "https://reformalliance.com/",
    partnership_since: "2023",
  },
];

const PartnerCard = ({ partner }: { partner: (typeof partners)[0] }) => (
  <div className="w-full bg-white border-t border-b border-gray-200 py-8 px-4 sm:px-8 lg:px-16 hover:bg-gray-50 transition-all duration-300">
    <div className="flex flex-col md:flex-row md:items-center gap-6">
      {/* Logo */}
      <div className="flex-shrink-0 w-64 h-64 bg-[#E2E8F0] rounded-full overflow-hidden flex items-center justify-center mx-auto md:mx-0">
        {typeof partner.logo === "function" ? (
          <partner.logo className="w-28 h-28 object-contain" />
        ) : partner.logo ? (
          <Image
            src={partner.logo}
            alt={partner.name}
            width={100}
            height={100}
            className="object-contain"
          />
        ) : (
          <div className="text-sm text-gray-400">No logo</div>
        )}
      </div>

      {/* Text Content */}
      <div className="flex-1">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
          {partner.name}
        </h3>

        <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-sm font-medium rounded-full border border-amber-200 mb-4">
          {partner.category}
        </span>

        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {partner.description}
        </p>

        <div className="flex flex-wrap justify-between items-center pt-2 border-t border-gray-100 text-sm text-gray-500">
          <span className="mt-2 md:mt-0">
            Partner since {partner.partnership_since}
          </span>
          { partner.website && <a
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-700 hover:text-amber-900 font-medium mt-2 md:mt-0 flex items-center gap-1"
          >
            Learn More
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>}
        </div>
      </div>
    </div>
  </div>
);

const page = () => {
  return (
    <>
      <section className="relative w-full overflow-hidden pb-16">
        {/* Background Image Layer */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1660547923766-1214fc9e0a83?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDU1fHxoZWxwJTIwY29tbXVuaXRpZXMlMjB0b2dldGhlciUyMG5vbiUyMHByb2ZpdCUyMG9yZ2FuaXphdGlvbnxlbnwwfHwwfHx8MA%3D%3D)`,
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 -top-[4%] -left-[3%] md:-top-[3%] md:left-[10%] w-fit">
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

        <div className="px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              OUR PARTNERS
            </h1>

            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8">
              Building Alliances. Creating Change.
            </h2>

            <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto mb-4">
              We believe in the power of collaboration. Our partners share our
              commitment to centering people, building access, and advancing
              justice in communities across the nation.
            </p>

            <p className="text-base text-gray-200 font-medium">
              Together, we are stronger. Together, we change the narrative.
            </p>
          </div>
        </div>
      </section>
      <section>
        {/* Partners Grid */}
        <section className="w-full bg-gray-50 py-10">
          {partners.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
        </section>
      </section>
    </>
  );
};

export default page;
