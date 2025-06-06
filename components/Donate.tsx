"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, CheckCircle2, Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAdminDonation } from "@/hooks/useAdminDonation";
import BuyMeACoffeeButton from "./BuyMeACoffee";

// Define the Impact type if not imported from elsewhere
type Impact = {
  amount: number;
  description: string;
};

const Donate = () => {
  const { content } = useAdminDonation();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[600px] flex items-center"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1610280899371-079e7b321643?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJvdGVzdCUyMGFnYWluc3QlMjBndW4lMjB2aW9sZW5jZXxlbnwwfHwwfHx8MA%3D%3D")',
          backgroundPosition: "center 30%",
        }}
      >
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Support Our Mission
            </h1>
            <p className="text-xl mb-6 text-white">
              Your contribution helps us provide vital resources and services to
              those affected by gun violence and systemic inequality.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
              Your Impact
            </h2>
            <p className="text-lg text-gray-700">
              At Change the Narrative 333, we believe in transparency. Here's
              how your donation makes a difference in our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1610500796385-3ffc1ae2f046?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIzfHxmdW4lMjBlZHVjYXRpb24lMjBhZHZvY2FjeXxlbnwwfHwwfHx8MA%3D%3D"
                alt="Community support"
                width={800}
                height={400}
                className="w-full h-64 object-cover"
              />
              <div className="p-6 bg-white">
                <h3 className="text-xl font-bold mb-3 text-primary">
                  Community Programs
                </h3>
                <p className="text-gray-700">
                  {content
                    ? `${content.allocation.communityPrograms}% of all donations fund education, advocacy, and prevention initiatives that empower our communities.`
                    : "Actively involved in community welfare programs."}
                </p>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1678656447432-3bbe4eb4eceb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aGVscGluZyUyMHRvd2FyZHMlMjBtZW50YWwlMjBoZWFsdGglMjByZXNvdXJjZXMlMkMlMjBob3VzaW5nJTIwYXNzaXN0YW5jZSUyQyUyMGFuZCUyMG90aGVyJTIwZXNzZW50aWFsJTIwc2VydmljZXMlMjBjb21tdW5pdHl8ZW58MHx8MHx8fDA%3D"
                alt="Direct support services"
                width={800}
                height={400}
                className="w-full h-64 object-cover"
              />
              <div className="p-6 bg-white">
                <h3 className="text-xl font-bold mb-3 text-primary">
                  Direct Support
                </h3>
                <p className="text-gray-700">
                  {content
                    ? `${content.allocation.directSupport}% of donations directly support individuals with mental health resources, housing assistance, and other essential services.`
                    : "Supporting people directly."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Details & Alternative Support */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-accent" />
                  How We Use Your Donations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm font-medium">
                      <span>Direct Support Services</span>
                      <span>{content?.allocation.directSupport}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{
                          width: `${content?.allocation.directSupport ?? 60}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm font-medium">
                      <span>Community Programs</span>
                      <span>{content?.allocation.communityPrograms}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-secondary h-2 rounded-full"
                        style={{
                          width: `${
                            content?.allocation.communityPrograms ?? 25
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm font-medium">
                      <span>Operations</span>
                      <span>{content?.allocation.operations}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-accent h-2 rounded-full"
                        style={{
                          width: `${content?.allocation.operations ?? 15}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 mr-2 text-accent" />
                  What Your Gift Provides
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                    {content?.impacts.map((impact: Impact) => (
                    <div
                      key={impact.description}
                      className="flex items-start gap-4"
                    >
                      <div className="text-2xl font-bold text-primary">
                      ${impact.amount}
                      </div>
                      <p className="text-gray-700">{impact.description}</p>
                    </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Support Us Directly</CardTitle>
              </CardHeader>
              <CardContent className="py-10 flex flex-col items-center justify-center text-center space-y-6">
                <p className="text-lg text-gray-700 max-w-md">
                  Support us directly through BuyMeACoffee — it’s secure,
                  simple, and appreciated!
                </p>
                <BuyMeACoffeeButton />
              </CardContent>
            </Card>

            {/* Other Ways to Support */}
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Other Ways to Support</h3>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-start space-x-4 mb-4">
                  <Users className="h-6 w-6 text-secondary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Volunteer Your Time</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Share your skills and expertise to help our mission.
                    </p>
                    <Link href="/register">
                      <Button
                        variant="outline"
                        className="hover:text-black"
                        size="sm"
                      >
                        Register
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Heart className="h-6 w-6 text-accent mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Become a Partner</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Organizations can partner with us to amplify our impact.
                    </p>
                    <Button
                      variant="outline"
                      className="hover:text-black"
                      size="sm"
                      onClick={() =>
                        (window.location.href =
                          "mailto:admin@changethenarrative333.org")
                      }
                    >
                      Contact Us
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Donate;
