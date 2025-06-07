"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  HelpCircle,
  ArrowRight,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Heart,
  Users,
} from "lucide-react";
import { Timestamp } from "firebase/firestore";
import { TabsContent } from "@/components/ui/tabs";
import { useAdminSurveys } from "@/hooks/useAdminSurveys";
import { Checkbox } from "./ui/checkbox";
import Image from "next/image";

const SeekingHelpTab = () => {
  const { addSurvey } = useAdminSurveys();

  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);
  const [form, setForm] = useState({
    // Basic Info
    name: "",
    email: "",
    location: "",
    needs: "",
    status: "Pending",

    // Consent
    resourceConsent: false,
    researchConsent: false,

    // Social Determinant Questions
    gunViolenceImpact: "",
    mentalHealth: "",
    stableHousing: "",
    foodChallenges: "",
    careerInterest: "",
    financialLiteracy: "",
    criminalLegalImpact: "",
    employmentAffected: "",
    paroleStatus: "",
    legalAssistance: "",
    voterRegistration: "",
    electionParticipation: "",
    educationalInterest: "",
    primaryCareProvider: "",
    healthConcerns: "",
    mentorshipInterest: "",
    additionalInfo: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.location || !form.needs) return;
    setSubmitting(true);
    await addSurvey({
      ...form,
      role: "help-seeker",
      date: Timestamp.now(),
    });
    setShowThankYou(true);
    setSubmitting(false);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setCurrentStep(0);
    setShowThankYou(false);
    setForm({
      name: "",
      email: "",
      location: "",
      needs: "",
      status: "Pending",
      resourceConsent: false,
      researchConsent: false,
      gunViolenceImpact: "",
      mentalHealth: "",
      stableHousing: "",
      foodChallenges: "",
      careerInterest: "",
      financialLiteracy: "",
      criminalLegalImpact: "",
      employmentAffected: "",
      paroleStatus: "",
      legalAssistance: "",
      voterRegistration: "",
      electionParticipation: "",
      educationalInterest: "",
      primaryCareProvider: "",
      healthConcerns: "",
      mentorshipInterest: "",
      additionalInfo: "",
    });
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const canProceedFromStep = (step: number) => {
    switch (step) {
      case 0:
        return form.name && form.email && form.location && form.needs;
      case 1:
        return form.resourceConsent;
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    if (showThankYou) {
      return (
        <div className="text-center py-8 space-y-6">
          <div className="flex justify-center">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Thank You!</h2>
            <p className="text-lg text-gray-700">
              Your survey has been submitted successfully.
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Heart className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-blue-900">
                What Happens Next?
              </h3>
            </div>

            <div className="space-y-3 text-sm text-blue-800">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-200 rounded-full p-1 mt-0.5">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <p>Our team will review your responses within 24-48 hours</p>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-blue-200 rounded-full p-1 mt-0.5">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <p>
                  We'll match you with relevant resources and support services
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-blue-200 rounded-full p-1 mt-0.5">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <p>
                  A member of our team will contact you at{" "}
                  <strong>{form.email}</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Users className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold text-purple-900">
                You're Not Alone
              </h3>
            </div>

            <p className="text-sm text-purple-800">
              By sharing your story, you're helping us build stronger
              communities and connect people with the support they need. Your
              voice matters in creating positive change.
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-yellow-800">
                  Immediate Support Needed?
                </p>
                <p className="text-yellow-700">
                  If you need immediate assistance, please don't wait for our
                  response. Call 211 for local resources or 988 for mental
                  health support.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button
              onClick={handleCloseDialog}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Close
            </Button>
          </div>
        </div>
      );
    }
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div>
              <Label className="mb-2 block">Name *</Label>
              <Input
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <Label className="mb-2 block">Email *</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter your email address"
              />
            </div>
            <div>
              <Label className="mb-2 block">Location *</Label>
              <Input
                value={form.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="Enter your city/area"
              />
            </div>
            <div>
              <Label className="mb-2 block">Your Primary Need *</Label>
              <Textarea
                rows={3}
                value={form.needs}
                onChange={(e) => handleChange("needs", e.target.value)}
                placeholder="Briefly describe what kind of support you're looking for"
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-4">Consent and Privacy</h3>
              <p className="text-sm text-gray-600 mb-4">
                By answering the questions in this form, you consent to allow
                Change the Narrative 333 and its trusted partner organizations
                to securely access and review your responses for the purpose of
                connecting you with relevant resources, support services, and
                opportunities based on your needs. Your information will be
                handled with care and used only to support your wellbeing.
              </p>
              <p className="text-sm text-gray-600 mb-4 font-medium">
                Please note: All questions are optional. You may skip any that
                you are uncomfortable answering.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="resourceConsent"
                  checked={form.resourceConsent}
                  onCheckedChange={(checked) =>
                    handleChange("resourceConsent", checked)
                  }
                />
                <Label
                  htmlFor="resourceConsent"
                  className="text-sm leading-relaxed"
                >
                  I consent to Change the Narrative 333 and its partners using
                  my responses to help connect me with resources and support
                  services. *
                </Label>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="researchConsent"
                  checked={form.researchConsent}
                  onCheckedChange={(checked) =>
                    handleChange("researchConsent", checked)
                  }
                />
                <Label
                  htmlFor="researchConsent"
                  className="text-sm leading-relaxed"
                >
                  I consent to my anonymized responses being used for research
                  aimed at better understanding and addressing the issues
                  impacting urban communities.
                </Label>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="font-semibold mb-4">
              Social Determinant Screening - Part 1
            </h3>

            <div>
              <Label className="mb-2 block">
                1. How has the city's gun violence epidemic impacted you?
              </Label>
              <Textarea
                rows={3}
                value={form.gunViolenceImpact}
                onChange={(e) =>
                  handleChange("gunViolenceImpact", e.target.value)
                }
                placeholder="Optional - Share your experience if comfortable"
              />
            </div>

            <div>
              <Label className="mb-2 block">
                2. How would you describe your mental health over the past 6
                months?
              </Label>
              <Textarea
                rows={3}
                value={form.mentalHealth}
                onChange={(e) => handleChange("mentalHealth", e.target.value)}
                placeholder="Optional - Describe your mental health experience"
              />
            </div>

            <div>
              <Label className="mb-3 block">
                3. Do you currently have stable housing?
              </Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="housing-yes"
                    name="stableHousing"
                    value="Yes"
                    checked={form.stableHousing === "Yes"}
                    onChange={(e) =>
                      handleChange("stableHousing", e.target.value)
                    }
                  />
                  <Label htmlFor="housing-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="housing-no"
                    name="stableHousing"
                    value="No"
                    checked={form.stableHousing === "No"}
                    onChange={(e) =>
                      handleChange("stableHousing", e.target.value)
                    }
                  />
                  <Label htmlFor="housing-no">No</Label>
                </div>
              </div>
            </div>

            <div>
              <Label className="mb-3 block">
                4. Do you face challenges affording nutritious meals?
              </Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="food-yes"
                    name="foodChallenges"
                    value="Yes"
                    checked={form.foodChallenges === "Yes"}
                    onChange={(e) =>
                      handleChange("foodChallenges", e.target.value)
                    }
                  />
                  <Label htmlFor="food-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="food-no"
                    name="foodChallenges"
                    value="No"
                    checked={form.foodChallenges === "No"}
                    onChange={(e) =>
                      handleChange("foodChallenges", e.target.value)
                    }
                  />
                  <Label htmlFor="food-no">No</Label>
                </div>
              </div>
            </div>

            <div>
              <Label className="mb-3 block">
                5. Are you interested in career preparation or job training?
              </Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="career-yes"
                    name="careerInterest"
                    value="Yes"
                    checked={form.careerInterest === "Yes"}
                    onChange={(e) =>
                      handleChange("careerInterest", e.target.value)
                    }
                  />
                  <Label htmlFor="career-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="career-no"
                    name="careerInterest"
                    value="No"
                    checked={form.careerInterest === "No"}
                    onChange={(e) =>
                      handleChange("careerInterest", e.target.value)
                    }
                  />
                  <Label htmlFor="career-no">No</Label>
                </div>
              </div>
            </div>

            <div>
              <Label className="mb-3 block">
                6. Would you like support with financial literacy and money
                management?
              </Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="financial-yes"
                    name="financialLiteracy"
                    value="Yes"
                    checked={form.financialLiteracy === "Yes"}
                    onChange={(e) =>
                      handleChange("financialLiteracy", e.target.value)
                    }
                  />
                  <Label htmlFor="financial-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="financial-no"
                    name="financialLiteracy"
                    value="No"
                    checked={form.financialLiteracy === "No"}
                    onChange={(e) =>
                      handleChange("financialLiteracy", e.target.value)
                    }
                  />
                  <Label htmlFor="financial-no">No</Label>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="font-semibold mb-4">
              Social Determinant Screening - Part 2
            </h3>

            <div>
              <Label className="mb-3 block">
                7. Have you been impacted by the criminal legal system
                (personally or through a family member)?
              </Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="legal-yes"
                    name="criminalLegalImpact"
                    value="Yes"
                    checked={form.criminalLegalImpact === "Yes"}
                    onChange={(e) =>
                      handleChange("criminalLegalImpact", e.target.value)
                    }
                  />
                  <Label htmlFor="legal-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="legal-no"
                    name="criminalLegalImpact"
                    value="No"
                    checked={form.criminalLegalImpact === "No"}
                    onChange={(e) =>
                      handleChange("criminalLegalImpact", e.target.value)
                    }
                  />
                  <Label htmlFor="legal-no">No</Label>
                </div>
              </div>
            </div>

            {form.criminalLegalImpact === "Yes" && (
              <div>
                <Label className="mb-3 block">
                  8. If yes, has this affected your ability to secure stable
                  employment?
                </Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="employment-yes"
                      name="employmentAffected"
                      value="Yes"
                      checked={form.employmentAffected === "Yes"}
                      onChange={(e) =>
                        handleChange("employmentAffected", e.target.value)
                      }
                    />
                    <Label htmlFor="employment-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="employment-no"
                      name="employmentAffected"
                      value="No"
                      checked={form.employmentAffected === "No"}
                      onChange={(e) =>
                        handleChange("employmentAffected", e.target.value)
                      }
                    />
                    <Label htmlFor="employment-no">No</Label>
                  </div>
                </div>
              </div>
            )}

            <div>
              <Label className="mb-3 block">
                9. Are you currently in the parole or probation system?
              </Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="parole-yes"
                    name="paroleStatus"
                    value="Yes"
                    checked={form.paroleStatus === "Yes"}
                    onChange={(e) =>
                      handleChange("paroleStatus", e.target.value)
                    }
                  />
                  <Label htmlFor="parole-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="parole-no"
                    name="paroleStatus"
                    value="No"
                    checked={form.paroleStatus === "No"}
                    onChange={(e) =>
                      handleChange("paroleStatus", e.target.value)
                    }
                  />
                  <Label htmlFor="parole-no">No</Label>
                </div>
              </div>
            </div>

            <div>
              <Label className="mb-3 block">
                10. Do you currently need legal assistance or advocacy?
              </Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="legal-assist-yes"
                    name="legalAssistance"
                    value="Yes"
                    checked={form.legalAssistance === "Yes"}
                    onChange={(e) =>
                      handleChange("legalAssistance", e.target.value)
                    }
                  />
                  <Label htmlFor="legal-assist-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="legal-assist-no"
                    name="legalAssistance"
                    value="No"
                    checked={form.legalAssistance === "No"}
                    onChange={(e) =>
                      handleChange("legalAssistance", e.target.value)
                    }
                  />
                  <Label htmlFor="legal-assist-no">No</Label>
                </div>
              </div>
            </div>

            <div>
              <Label className="mb-3 block">
                11. Are you registered to vote? (If 18 or older)
              </Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="vote-reg-yes"
                    name="voterRegistration"
                    value="Yes"
                    checked={form.voterRegistration === "Yes"}
                    onChange={(e) =>
                      handleChange("voterRegistration", e.target.value)
                    }
                  />
                  <Label htmlFor="vote-reg-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="vote-reg-no"
                    name="voterRegistration"
                    value="No"
                    checked={form.voterRegistration === "No"}
                    onChange={(e) =>
                      handleChange("voterRegistration", e.target.value)
                    }
                  />
                  <Label htmlFor="vote-reg-no">No</Label>
                </div>
              </div>
            </div>

            <div>
              <Label className="mb-3 block">
                12. Do you participate in local and national elections? (If 18
                or older)
              </Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="elections-yes"
                    name="electionParticipation"
                    value="Yes"
                    checked={form.electionParticipation === "Yes"}
                    onChange={(e) =>
                      handleChange("electionParticipation", e.target.value)
                    }
                  />
                  <Label htmlFor="elections-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="elections-no"
                    name="electionParticipation"
                    value="No"
                    checked={form.electionParticipation === "No"}
                    onChange={(e) =>
                      handleChange("electionParticipation", e.target.value)
                    }
                  />
                  <Label htmlFor="elections-no">No</Label>
                </div>
              </div>
            </div>

            <div>
              <Label className="mb-3 block">
                13. Are you interested in educational resources, programs, or
                opportunities?
              </Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="education-yes"
                    name="educationalInterest"
                    value="Yes"
                    checked={form.educationalInterest === "Yes"}
                    onChange={(e) =>
                      handleChange("educationalInterest", e.target.value)
                    }
                  />
                  <Label htmlFor="education-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="education-no"
                    name="educationalInterest"
                    value="No"
                    checked={form.educationalInterest === "No"}
                    onChange={(e) =>
                      handleChange("educationalInterest", e.target.value)
                    }
                  />
                  <Label htmlFor="education-no">No</Label>
                </div>
              </div>
            </div>

            <div>
              <Label className="mb-3 block">
                14. Do you have a primary care provider (PCP)?
              </Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="pcp-yes"
                    name="primaryCareProvider"
                    value="Yes"
                    checked={form.primaryCareProvider === "Yes"}
                    onChange={(e) =>
                      handleChange("primaryCareProvider", e.target.value)
                    }
                  />
                  <Label htmlFor="pcp-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="pcp-no"
                    name="primaryCareProvider"
                    value="No"
                    checked={form.primaryCareProvider === "No"}
                    onChange={(e) =>
                      handleChange("primaryCareProvider", e.target.value)
                    }
                  />
                  <Label htmlFor="pcp-no">No</Label>
                </div>
              </div>
            </div>

            <div>
              <Label className="mb-3 block">
                15. Are there any ongoing health concerns you feel have not been
                properly addressed?
              </Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="health-yes"
                    name="healthConcerns"
                    value="Yes"
                    checked={form.healthConcerns === "Yes"}
                    onChange={(e) =>
                      handleChange("healthConcerns", e.target.value)
                    }
                  />
                  <Label htmlFor="health-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="health-no"
                    name="healthConcerns"
                    value="No"
                    checked={form.healthConcerns === "No"}
                    onChange={(e) =>
                      handleChange("healthConcerns", e.target.value)
                    }
                  />
                  <Label htmlFor="health-no">No</Label>
                </div>
              </div>
            </div>

            <div>
              <Label className="mb-3 block">
                16. Would you like to be connected with a mentorship program?
              </Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="mentor-yes"
                    name="mentorshipInterest"
                    value="Yes"
                    checked={form.mentorshipInterest === "Yes"}
                    onChange={(e) =>
                      handleChange("mentorshipInterest", e.target.value)
                    }
                  />
                  <Label htmlFor="mentor-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="mentor-no"
                    name="mentorshipInterest"
                    value="No"
                    checked={form.mentorshipInterest === "No"}
                    onChange={(e) =>
                      handleChange("mentorshipInterest", e.target.value)
                    }
                  />
                  <Label htmlFor="mentor-no">No</Label>
                </div>
              </div>
            </div>

            <div>
              <Label className="mb-2 block">
                17. Is there anything else you would like to share with us?
              </Label>
              <Textarea
                rows={4}
                value={form.additionalInfo}
                onChange={(e) => handleChange("additionalInfo", e.target.value)}
                placeholder="Optional - Share any additional information or concerns"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getStepTitle = () => {
    if (showThankYou) return "Thank You!";
    switch (currentStep) {
      case 0:
        return "Basic Information";
      case 1:
        return "Consent & Privacy";
      case 2:
        return "Screening Questions (1/2)";
      case 3:
        return "Screening Questions (2/2)";
      default:
        return "Survey";
    }
  };

  return (
    <TabsContent value="seeking-help">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <HelpCircle className="h-5 w-5 mr-2 text-accent" />
            Find Support
          </CardTitle>
          <CardDescription>
            Complete our survey to help us understand your needs and connect you
            with appropriate resources.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-secondary/10 rounded-lg p-6 mb-6">
            <h3 className="font-semibold mb-2">Start Your Support Journey</h3>
            <p className="mb-4 text-sm">
              Our survey helps us understand your specific situation and needs
              so we can provide the most relevant resources and support options.
            </p>
            <Button className="flex items-center" onClick={() => setOpen(true)}>
              Begin Survey
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="bg-yellow-50 text-yellow-800 p-4 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Note:</p>
              <p className="text-sm">
                If you're in an emergency situation, please call 911 or your
                local emergency services immediately.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={open}
        onOpenChange={showThankYou ? handleCloseDialog : setOpen}
      >
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{getStepTitle()}</DialogTitle>
            {!showThankYou && (
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Step {currentStep + 1} of 4</span>
                <div className="flex space-x-1">
                  {[0, 1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`w-2 h-2 rounded-full ${
                        step <= currentStep ? "bg-blue-500" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </DialogHeader>

          <div className="py-4">{renderStepContent()}</div>

          <div className="flex justify-between pt-4 border-t">
            {!showThankYou && (
              <>
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex items-center"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>

                {currentStep < 3 ? (
                  <Button
                    onClick={nextStep}
                    disabled={!canProceedFromStep(currentStep)}
                    className="flex items-center"
                  >
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={submitting || !canProceedFromStep(0)}
                    className="flex items-center"
                  >
                    {submitting ? "Submitting..." : "Submit Survey"}
                  </Button>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </TabsContent>
  );
};

export default SeekingHelpTab;
