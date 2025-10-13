import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import React from "react";
import { useLocation } from "react-router-dom";

// Placeholder data
const resources = [
  { id: 1, title: "Lecture 1 Slides", category: "Slides", uploaded: "2025-10-10" },
  { id: 2, title: "Assignment 1 PDF", category: "Assignment", uploaded: "2025-10-11" },
];
const tests = [
  { id: 1, title: "Quiz 1", due: "2025-10-20", submissions: 18, total: 20 },
  { id: 2, title: "Midterm", due: "2025-11-01", submissions: 10, total: 20 },
];
const groups = [
  { id: 1, name: "Project Alpha", members: 4 },
  { id: 2, name: "Project Beta", members: 3 },
];
const forums = [
  { id: 1, topic: "Doubt on Assignment 1", posts: 5, flagged: false },
  { id: 2, topic: "Exam Syllabus", posts: 2, flagged: true },
];
const performance = [
  { id: 1, student: "John Doe", tests: 85, assignments: 90, projects: 100 },
  { id: 2, student: "Jane Smith", tests: 78, assignments: 88, projects: 95 },
];

export default function FacultyDashboard() {
  const { theme } = useTheme();
  const location = useLocation();
  const tab = React.useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('tab') || 'resources';
  }, [location.search]);

  // Action handlers
  const handleUploadResource = () => alert("Upload resource (demo)");
  const handleCreateTest = () => alert("Create test (demo)");
  const handleCreateGroup = () => alert("Create project group (demo)");
  const handleModerateForum = () => alert("Moderate forum (demo)");
  const handleViewPerformance = () => alert("View performance (demo)");

  React.useEffect(() => {
    const handler = () => {
      switch (tab) {
        case 'resources': handleUploadResource(); break;
        case 'tests': handleCreateTest(); break;
        case 'groups': handleCreateGroup(); break;
        case 'forums': handleModerateForum(); break;
        case 'performance': handleViewPerformance(); break;
        default: break;
      }
    };
    window.addEventListener('faculty-action', handler);
    return () => window.removeEventListener('faculty-action', handler);
  }, [tab]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-neon-blue">Faculty/Teacher Dashboard</h1>
      {/* Resource Management */}
      {tab === 'resources' && (
        <Card>
          <CardHeader>
            <CardTitle>Academic Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4 text-left">Title</th>
                  <th className="py-2 px-4 text-left">Category</th>
                  <th className="py-2 px-4 text-left">Uploaded</th>
                </tr>
              </thead>
              <tbody>
                {resources.map((res) => (
                  <tr key={res.id} className="border-b hover:bg-muted/20">
                    <td className="py-2 px-4 align-middle">{res.title}</td>
                    <td className="py-2 px-4 align-middle">{res.category}</td>
                    <td className="py-2 px-4 align-middle">{res.uploaded}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button className="mt-4" variant="default" onClick={handleUploadResource}>Upload Resource</Button>
          </CardContent>
        </Card>
      )}
      {/* Test & Assignment Management */}
      {tab === 'tests' && (
        <Card>
          <CardHeader>
            <CardTitle>Tests & Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4 text-left">Title</th>
                  <th className="py-2 px-4 text-left">Due Date</th>
                  <th className="py-2 px-4 text-left">Submissions</th>
                </tr>
              </thead>
              <tbody>
                {tests.map((test) => (
                  <tr key={test.id} className="border-b hover:bg-muted/20">
                    <td className="py-2 px-4 align-middle">{test.title}</td>
                    <td className="py-2 px-4 align-middle">{test.due}</td>
                    <td className="py-2 px-4 align-middle">{test.submissions} / {test.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button className="mt-4" variant="default" onClick={handleCreateTest}>Create Test/Assignment</Button>
          </CardContent>
        </Card>
      )}
      {/* Project Group Management */}
      {tab === 'groups' && (
        <Card>
          <CardHeader>
            <CardTitle>Project Groups</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4 text-left">Group Name</th>
                  <th className="py-2 px-4 text-left">Members</th>
                </tr>
              </thead>
              <tbody>
                {groups.map((group) => (
                  <tr key={group.id} className="border-b hover:bg-muted/20">
                    <td className="py-2 px-4 align-middle">{group.name}</td>
                    <td className="py-2 px-4 align-middle">{group.members}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button className="mt-4" variant="default" onClick={handleCreateGroup}>Create Project Group</Button>
          </CardContent>
        </Card>
      )}
      {/* Academic Forum Moderation */}
      {tab === 'forums' && (
        <Card>
          <CardHeader>
            <CardTitle>Academic Forums</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4 text-left">Topic</th>
                  <th className="py-2 px-4 text-left">Posts</th>
                  <th className="py-2 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {forums.map((forum) => (
                  <tr key={forum.id} className="border-b hover:bg-muted/20">
                    <td className="py-2 px-4 align-middle">{forum.topic}</td>
                    <td className="py-2 px-4 align-middle">{forum.posts}</td>
                    <td className="py-2 px-4 align-middle">{forum.flagged ? <Badge variant="destructive">Flagged</Badge> : <Badge variant="default">OK</Badge>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button className="mt-4" variant="default" onClick={handleModerateForum}>Moderate Forum</Button>
          </CardContent>
        </Card>
      )}
      {/* Student Performance Tracking */}
      {tab === 'performance' && (
        <Card>
          <CardHeader>
            <CardTitle>Student Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4 text-left">Student</th>
                  <th className="py-2 px-4 text-left">Tests</th>
                  <th className="py-2 px-4 text-left">Assignments</th>
                  <th className="py-2 px-4 text-left">Projects</th>
                </tr>
              </thead>
              <tbody>
                {performance.map((perf) => (
                  <tr key={perf.id} className="border-b hover:bg-muted/20">
                    <td className="py-2 px-4 align-middle">{perf.student}</td>
                    <td className="py-2 px-4 align-middle">{perf.tests}</td>
                    <td className="py-2 px-4 align-middle">{perf.assignments}</td>
                    <td className="py-2 px-4 align-middle">{perf.projects}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button className="mt-4" variant="default" onClick={handleViewPerformance}>View Performance</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
