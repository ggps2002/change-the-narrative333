import { useAdminSurveys } from "@/hooks/useAdminSurveys";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Download, Loader2, Search, Trash2, Users } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useEffect, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { exportToCSV } from "@/lib/utils";

const formatDate = (ts: any) =>
  ts?.toDate?.()
    ? ts.toDate().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";

const PAGE_SIZE = 5;

const SurveyTab = () => {
  const { surveys, deleteSurvey } = useAdminSurveys();
  const [selectedSurvey, setSelectedSurvey] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState("help-seekers");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleting, setIsDeleting] = useState(false);

  const helpSeekers = surveys.filter((s) => s.role === "help-seeker");
  const supporters = surveys.filter((s) => s.role === "supporter");

  const currentData = activeTab === "help-seekers" ? helpSeekers : supporters;

  const paginatedData = currentData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  useEffect(() => {
    setSelectedIds([]);
    setCurrentPage(1);
  }, [activeTab, surveys]);

  const handleDeleteSelected = async () => {
    setIsDeleting(true);
    await Promise.all(selectedIds.map((id) => deleteSurvey(id)));
    setIsDeleting(false);
    setSelectedIds([]);
  };

  return (
    <TabsContent value="surveys">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" /> Survey Responses
              </CardTitle>
              <CardDescription>
                View and export survey data from help seekers and supporters
              </CardDescription>
            </div>
            <div className="flex gap-2">
              {selectedIds.length > 0 && (
                <Button
                  variant="destructive"
                  onClick={handleDeleteSelected}
                  className="gap-2"
                >
                  {isDeleting ? (
                    <div className="flex gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Deleting...</span>
                    </div>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      Delete Selected ({selectedIds.length})
                    </>
                  )}
                </Button>
              )}
              <Button
                onClick={() => {
                  const dataToExport =
                    activeTab === "help-seekers" ? helpSeekers : supporters;
                  const filename =
                    activeTab === "help-seekers"
                      ? "help_seekers.csv"
                      : "supporters.csv";
                  exportToCSV(dataToExport, filename);
                }}
              >
                <Download className="h-4 w-4 mr-2" />
                {activeTab === "help-seekers"
                  ? "Export Help Seekers"
                  : "Export Supporters"}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs
            defaultValue="help-seekers"
            onValueChange={(value) => setActiveTab(value)}
          >
            <TabsList className="mb-4">
              <TabsTrigger value="help-seekers">Help Seekers</TabsTrigger>
              <TabsTrigger value="supporters">Supporters</TabsTrigger>
            </TabsList>

            <TabsContent value="help-seekers">
              <FilterRow />
              <TableSection
                data={paginatedData}
                setSelectedSurvey={setSelectedSurvey}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
              />
              <PaginationControls
                page={currentPage}
                setPage={setCurrentPage}
                totalItems={currentData.length}
              />
            </TabsContent>

            <TabsContent value="supporters">
              <TableSection
                data={paginatedData}
                setSelectedSurvey={setSelectedSurvey}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
              />
              <PaginationControls
                page={currentPage}
                setPage={setCurrentPage}
                totalItems={currentData.length}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog
        open={!!selectedSurvey}
        onOpenChange={() => setSelectedSurvey(null)}
      >
        <DialogContent style={{ height: "500px", overflowY: "scroll" }}>
          <DialogHeader>
            <DialogTitle>Survey Details</DialogTitle>
          </DialogHeader>
          {selectedSurvey && (
            <div className="space-y-2 text-sm">
              <p>
                <strong>Name:</strong> {selectedSurvey.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedSurvey.email}
              </p>
              {selectedSurvey.role === "help-seeker" ? (
                <>
                  <p>
                    <strong>Location:</strong> {selectedSurvey.location}
                  </p>
                  <p>
                    <strong>Primary Need:</strong> {selectedSurvey.needs}
                  </p>
                  <p>
                    <strong>Consent to use my responses to help me:</strong>{" "}
                    {selectedSurvey.resourceConsent ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>
                      Consent to my anonymized responses being used for
                      research:
                    </strong>{" "}
                    {selectedSurvey.researchConsent ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Gun violence Impact:</strong>{" "}
                    {selectedSurvey.gunViolenceImpact}
                  </p>
                  <p>
                    <strong>Mental Health over past 6 months:</strong>{" "}
                    {selectedSurvey.mentalHealth}
                  </p>
                  {/* <p>
                <strong>Mental Health over past 6 months:</strong> {selectedSurvey.mentalHealth ? "Yes" : "No"}
              </p> */}
                  <p>
                    <strong>Stable Housing:</strong>{" "}
                    {selectedSurvey.stableHousing}
                  </p>
                  <p>
                    <strong>Challenges affording nutritious meals:</strong>{" "}
                    {selectedSurvey.foodChallenges}
                  </p>
                  <p>
                    <strong>
                      Interested in career preparation and job training:
                    </strong>{" "}
                    {selectedSurvey.careerInterest}
                  </p>
                  <p>
                    <strong>
                      Would you like support with financial literacy and money
                      management:
                    </strong>{" "}
                    {selectedSurvey.financialLiteracy}
                  </p>
                  <p>
                    <strong>Impacted by criminal legal system:</strong>{" "}
                    {selectedSurvey.criminalLegalImpact}
                  </p>
                  <p>
                    <strong>
                      If impacted by criminal legal system, has this affected
                      the ability to secure stable employment:
                    </strong>{" "}
                    {selectedSurvey.employmentAffected}
                  </p>
                  <p>
                    <strong>Currently in parole or probation system:</strong>{" "}
                    {selectedSurvey.paroleStatus}
                  </p>
                  <p>
                    <strong>
                      Currently need legal assistance or advocacy:
                    </strong>{" "}
                    {selectedSurvey.legalAssistance}
                  </p>
                  <p>
                    <strong>Registered to vote(if 18 or older):</strong>{" "}
                    {selectedSurvey.voterRegistration}
                  </p>
                  <p>
                    <strong>Participate in Local or National elections:</strong>{" "}
                    {selectedSurvey.electionParticipation}
                  </p>
                  <p>
                    <strong>
                      Interested in educational programs and opportunity:
                    </strong>{" "}
                    {selectedSurvey.educationalInterest}
                  </p>
                  <p>
                    <strong>Do you have a primary care provider(PCP):</strong>{" "}
                    {selectedSurvey.primaryCareProvider}
                  </p>
                  <p>
                    <strong>
                      Any ongoing health concerns you feel have not been
                      properly addressed:
                    </strong>{" "}
                    {selectedSurvey.healthConcerns ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>
                      Would you like to be connected with a mentorship program:
                    </strong>{" "}
                    {selectedSurvey.mentorshipInterest}
                  </p>
                  <p>
                    <strong>Additional Info:</strong>{" "}
                    {selectedSurvey.additionalInfo}
                  </p>
                </>
              ) : (
                <p>
                  <strong>Interest:</strong> {selectedSurvey.interest}
                </p>
              )}
              <p>
                <strong>Status:</strong> {selectedSurvey.status}
              </p>
              <p>
                <strong>Role:</strong> {selectedSurvey.role}
              </p>
              <p>
                <strong>Date:</strong> {formatDate(selectedSurvey.date)}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </TabsContent>
  );
};

const FilterRow = () => (
  <div className="flex justify-between mb-4">
    <div className="flex items-center max-w-sm w-full">
      <Input placeholder="Search respondents..." className="rounded-r-none" />
      <Button className="rounded-l-none" variant="secondary">
        <Search className="h-4 w-4" />
      </Button>
    </div>
    <div className="flex items-center gap-2">
      <Label htmlFor="filter-date" className="text-sm whitespace-nowrap">
        Filter by:
      </Label>
      <select
        id="filter-date"
        className="h-10 px-3 py-2 text-sm rounded-md border border-input bg-background"
      >
        <option value="all">All Time</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
        <option value="year">This Year</option>
      </select>
    </div>
  </div>
);

type Survey = {
  id: string;
  name: string;
  email: string;
  role: string;
  date: any;
  status: string;
  location?: string;
  needs?: string;
  interest?: string;
  // Consent
  resourceConsent: boolean;
  researchConsent: boolean;

  // Social Determinant Questions
  gunViolenceImpact: string;
  mentalHealth: string;
  stableHousing: string;
  foodChallenges: string;
  careerInterest: string;
  financialLiteracy: string;
  criminalLegalImpact: string;
  employmentAffected: string;
  paroleStatus: string;
  legalAssistance: string;
  voterRegistration: string;
  electionParticipation: string;
  educationalInterest: string;
  primaryCareProvider: string;
  healthConcerns: string;
  mentorshipInterest: string;
  additionalInfo: string;
};

interface TableSectionProps {
  data: Survey[];
  setSelectedSurvey: (survey: Survey) => void;
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
}

const TableSection = ({
  data,
  setSelectedSurvey,
  selectedIds,
  setSelectedIds,
}: TableSectionProps) => {
  const isSupporter = data?.[0]?.interest !== undefined;

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-8"></TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            {isSupporter ? (
              <TableHead>Interest</TableHead>
            ) : (
              <>
                <TableHead>Location</TableHead>
                <TableHead>Primary Need</TableHead>
              </>
            )}
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((survey) => (
            <TableRow key={survey.id}>
              <TableCell>
                <Checkbox
                  checked={selectedIds.includes(survey.id)}
                  onCheckedChange={() => toggleSelect(survey.id)}
                />
              </TableCell>
              <TableCell>{formatDate(survey.date)}</TableCell>
              <TableCell>{survey.name}</TableCell>
              <TableCell>{survey.email}</TableCell>
              {isSupporter ? (
                <TableCell>{survey.interest?.slice(0, 20)}...</TableCell>
              ) : (
                <>
                  <TableCell>{survey.location}</TableCell>
                  <TableCell>
                    {survey.needs?.slice(0, 20) ?? "N/A"}...
                  </TableCell>
                </>
              )}
              <TableCell>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                  {survey.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedSurvey(survey)}
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const PaginationControls = ({ page, setPage, totalItems }: any) => {
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-end items-center gap-2 mt-4">
      <Button
        variant="outline"
        size="sm"
        disabled={page === 1}
        onClick={() => setPage((p: number) => p - 1)}
      >
        Previous
      </Button>
      <span className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        disabled={page === totalPages}
        onClick={() => setPage((p: number) => p + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default SurveyTab;
