import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, CheckCircle, Clock, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AdminDashboard = () => {
  // Mock data
  const stats = {
    total: 48,
    resolved: 23,
    pending: 15,
    inProgress: 10,
    departments: 6,
  };

  const complaintsByType = [
    { type: "Road", count: 15, color: "bg-blue-500" },
    { type: "Water", count: 12, color: "bg-cyan-500" },
    { type: "Electricity", count: 8, color: "bg-yellow-500" },
    { type: "Sanitation", count: 7, color: "bg-green-500" },
    { type: "Railway", count: 4, color: "bg-purple-500" },
    { type: "Others", count: 2, color: "bg-gray-500" },
  ];

  const officers = [
    { name: "Rajesh Kumar", department: "Road", activeComplaints: 5 },
    { name: "Priya Sharma", department: "Water", activeComplaints: 4 },
    { name: "Amit Patel", department: "Electricity", activeComplaints: 3 },
    { name: "Sunita Verma", department: "Sanitation", activeComplaints: 3 },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gradient-hero py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">System overview and management</p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Complaints</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground">All time</p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Resolved</CardTitle>
                <CheckCircle className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">{stats.resolved}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((stats.resolved / stats.total) * 100)}% completion rate
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <Clock className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">{stats.pending}</div>
                <p className="text-xs text-muted-foreground">Awaiting assignment</p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Departments</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.departments}</div>
                <p className="text-xs text-muted-foreground">Currently operational</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Complaints by Type */}
            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle>Complaints by Department</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complaintsByType.map((item) => (
                    <div key={item.type}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{item.type}</span>
                        <span className="text-sm text-muted-foreground">{item.count}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`${item.color} h-2 rounded-full transition-all`}
                          style={{ width: `${(item.count / stats.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Officers Status */}
            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle>Officers Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {officers.map((officer, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg border hover:shadow-card transition-all"
                    >
                      <div>
                        <p className="font-medium">{officer.name}</p>
                        <p className="text-sm text-muted-foreground">{officer.department}</p>
                      </div>
                      <Badge variant="outline">
                        {officer.activeComplaints} active
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Status Distribution */}
          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle>Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Pending</span>
                    <Badge className="bg-warning text-warning-foreground">
                      {stats.pending}
                    </Badge>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">In Progress</span>
                    <Badge className="bg-primary text-primary-foreground">
                      {stats.inProgress}
                    </Badge>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Resolved</span>
                    <Badge className="bg-success text-success-foreground">
                      {stats.resolved}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
