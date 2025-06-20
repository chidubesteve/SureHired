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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  LuUsers,
  LuEye,
  LuCalendar,
  LuTrendingUp,
  LuBuilding,
} from "react-icons/lu";
import { FiEdit } from "react-icons/fi";
import Header from "@/components/Header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserApplicationStatus } from "@/app/user/profile/components/UserAppliedJobs";
import Link from "next/link";

const companyStatuses = Object.values(UserApplicationStatus).filter(
  (status) => status !== UserApplicationStatus.Withdrawn
);

// Mock data for charts
const applicationsData = [
  { month: "Jan", applications: 45 },
  { month: "Feb", applications: 52 },
  { month: "Mar", applications: 38 },
  { month: "Apr", applications: 61 },
  { month: "May", applications: 55 },
  { month: "Jun", applications: 42 },
];

const statusData = [
  { name: "Applied", value: 156, color: "#3b82f6" },
  { name: "Interviewing", value: 34, color: "#f59e0b" },
  { name: "Hired", value: 12, color: "#10b981" },
  { name: "Rejected", value: 78, color: "#ef4444" },
];

const jobsData = [
  {
    id: 1,
    title: "Senior Software Engineer",
    applicants: 45,
    status: "Open",
    posted: "2025-05-20",
    applications: { applied: 45, interviewing: 8, hired: 0, rejected: 12 },
  },
  {
    id: 2,
    title: "Product Manager",
    applicants: 38,
    status: "Open",
    posted: "2025-05-15",
    applications: { applied: 38, interviewing: 12, hired: 2, rejected: 8 },
  },
  {
    id: 3,
    title: "UX Designer",
    applicants: 29,
    status: "Closed",
    posted: "2025-05-10",
    applications: { applied: 29, interviewing: 6, hired: 1, rejected: 22 },
  },
];

const chartConfig = {
  applications: {
    label: "Applications",
    color: "#3b82f6",
  },
};

const CompanyDashboard = () => {
  const [selectedJob, setSelectedJob] = useState(jobsData[0]);

  const handleStatusChange = (
    applicantId: string,
    newStatus: UserApplicationStatus
  ) => {
    console.log(`Update applicant ${applicantId} to ${newStatus}`);
    // TODO: Call API or update state here
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">
              Company Dashboard
            </h1>
            <p className="text-neutral-600">
              Manage your jobs and track applicant analytics
            </p>
          </div>
          <Button className="bg-brand-600 hover:bg-brand-700">
            <Link href={"./update-profile"} className="flex">
              <FiEdit className="w-4 h-4 mr-2" />
              Update Company Profile
            </Link>
          </Button>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Applications
              </CardTitle>
              <LuUsers className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">280</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
              <LuBuilding className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                2 posted this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Profile Views
              </CardTitle>
              <LuEye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">
                +8% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Hires This Month
              </CardTitle>
              <LuTrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">
                +25% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="jobs">Job Management</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6">
            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Applications Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Applications Over Time</CardTitle>
                  <CardDescription>Monthly application trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={applicationsData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="applications"
                          stroke="var(--color-applications)"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Application Status Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Application Status</CardTitle>
                  <CardDescription>
                    Current status distribution of all applications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={statusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {statusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <div className="flex flex-wrap gap-4 mt-4">
                    {statusData.map((item) => (
                      <div key={item.name} className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-neutral-600">
                          {item.name}: {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Applications Bar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Application Volume</CardTitle>
                <CardDescription>
                  Applications received per day this week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={[
                        { day: "Mon", applications: 12 },
                        { day: "Tue", applications: 18 },
                        { day: "Wed", applications: 8 },
                        { day: "Thu", applications: 15 },
                        { day: "Fri", applications: 22 },
                        { day: "Sat", applications: 4 },
                        { day: "Sun", applications: 2 },
                      ]}
                    >
                      <XAxis dataKey="day" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar
                        dataKey="applications"
                        fill="var(--color-applications)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-6">
            {/* Job Management */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Jobs List */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Job Posts</CardTitle>
                    <CardDescription>
                      Click on a job to view applicant details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {jobsData.map((job) => (
                      <div
                        key={job.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedJob.id === job.id
                            ? "border-brand-500 bg-brand-50"
                            : "border-neutral-200 hover:border-neutral-300"
                        }`}
                        onClick={() => setSelectedJob(job)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-neutral-900">
                            {job.title}
                          </h3>
                          <Badge
                            variant={
                              job.status === "Open" ? "default" : "secondary"
                            }
                          >
                            {job.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-neutral-600">
                          <span className="flex items-center gap-1">
                            <LuUsers className="w-4 h-4" />
                            {job.applicants} applicants
                          </span>
                          <span className="flex items-center gap-1">
                            <LuCalendar className="w-4 h-4" />
                            {new Date(job.posted).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Selected Job Details */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>{selectedJob.title} - Applicants</CardTitle>
                    <CardDescription>
                      Manage applications for this position
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {selectedJob.applications.applied}
                        </div>
                        <div className="text-sm text-neutral-600">Applied</div>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-amber-600">
                          {selectedJob.applications.interviewing}
                        </div>
                        <div className="text-sm text-neutral-600">
                          Interviewing
                        </div>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {selectedJob.applications.hired}
                        </div>
                        <div className="text-sm text-neutral-600">Hired</div>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-red-600">
                          {selectedJob.applications.rejected}
                        </div>
                        <div className="text-sm text-neutral-600">Rejected</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium text-neutral-900">
                        Recent Applications
                      </h4>
                      {/* Mock applicant list */}
                      {[
                        {
                          name: "John Doe",
                          id: "app_001",
                          status: "Applied",
                          appliedDate: "2025-06-01",
                        },
                        {
                          name: "Jane Smith",
                          id: "app_002",
                          status: "Interviewing",
                          appliedDate: "2025-05-30",
                        },
                        {
                          name: "Mike Johnson",
                          id: "app_002",
                          status: "Applied",
                          appliedDate: "2025-05-29",
                        },
                      ].map((applicant, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div>
                            <div className="font-medium text-neutral-900">
                              {applicant.name}
                            </div>
                            <div className="text-sm text-neutral-600">
                              Applied {applicant.appliedDate}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                applicant.status === "Applied"
                                  ? "secondary"
                                  : applicant.status === "Interviewing"
                                  ? "default"
                                  : "outline"
                              }
                            >
                              {applicant.status}
                            </Badge>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                  Update Status
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuLabel>Status</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {companyStatuses.map((status) => (
                                  <DropdownMenuItem
                                    key={status}
                                    onClick={() =>
                                      handleStatusChange(applicant.id, status)
                                    }
                                  >
                                    {status.charAt(0).toUpperCase() +
                                      status.slice(1)}
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CompanyDashboard;
