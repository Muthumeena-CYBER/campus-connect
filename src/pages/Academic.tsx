import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  GraduationCap, 
  BookOpen, 
  FileText, 
  Users, 
  MessageSquare,
  Calendar,
  Clock,
  Download,
  Upload,
  Search,
  Filter,
  Star,
  CheckCircle2,
  AlertCircle,
  PlayCircle
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'sonner';

export default function Academic() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Study Materials
  const studyMaterials = [
    { 
      id: 1,
      title: 'Data Structures - Lecture Notes', 
      subject: 'Computer Science',
      type: 'PDF',
      size: '2.4 MB',
      uploaded: '2025-10-15',
      downloads: 156,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop'
    },
    { 
      id: 2,
      title: 'Operating Systems - Lab Manual', 
      subject: 'Computer Science',
      type: 'PDF',
      size: '1.8 MB',
      uploaded: '2025-10-14',
      downloads: 89,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop'
    },
    { 
      id: 3,
      title: 'Database Management - Slides', 
      subject: 'Computer Science',
      type: 'PPT',
      size: '5.2 MB',
      uploaded: '2025-10-13',
      downloads: 203,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=300&fit=crop'
    },
    { 
      id: 4,
      title: 'Mathematics - Problem Sets', 
      subject: 'Mathematics',
      type: 'PDF',
      size: '3.1 MB',
      uploaded: '2025-10-12',
      downloads: 134,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop'
    },
  ];

  // Assignments
  const assignments = [
    { 
      id: 1,
      title: 'Data Structures Assignment 3', 
      subject: 'Computer Science',
      dueDate: '2025-10-20',
      status: 'pending',
      points: 25,
      submitted: false,
      description: 'Implement Binary Search Tree operations'
    },
    { 
      id: 2,
      title: 'Database Design Project', 
      subject: 'Computer Science',
      dueDate: '2025-10-25',
      status: 'in_progress',
      points: 50,
      submitted: false,
      description: 'Design and implement a library management system'
    },
    { 
      id: 3,
      title: 'Mathematics Quiz 2', 
      subject: 'Mathematics',
      dueDate: '2025-10-18',
      status: 'completed',
      points: 15,
      submitted: true,
      description: 'Linear Algebra and Vector Spaces'
    },
  ];

  // Study Groups
  const studyGroups = [
    { 
      id: 1,
      name: 'Data Structures Study Group', 
      subject: 'Computer Science',
      members: 8,
      active: true,
      nextMeeting: '2025-10-16',
      description: 'Weekly study sessions for DS concepts'
    },
    { 
      id: 2,
      name: 'Math Problem Solving', 
      subject: 'Mathematics',
      members: 12,
      active: true,
      nextMeeting: '2025-10-17',
      description: 'Collaborative problem solving sessions'
    },
    { 
      id: 3,
      name: 'Database Design Team', 
      subject: 'Computer Science',
      members: 5,
      active: false,
      nextMeeting: '2025-10-19',
      description: 'Project collaboration group'
    },
  ];

  // Academic Forums
  const forums = [
    { 
      id: 1,
      topic: 'Help with Binary Tree Traversal', 
      subject: 'Computer Science',
      posts: 8,
      lastActivity: '2 hours ago',
      solved: false,
      author: 'John Doe'
    },
    { 
      id: 2,
      topic: 'Database Normalization Questions', 
      subject: 'Computer Science',
      posts: 12,
      lastActivity: '5 hours ago',
      solved: true,
      author: 'Jane Smith'
    },
    { 
      id: 3,
      topic: 'Linear Algebra Problem Set 3', 
      subject: 'Mathematics',
      posts: 6,
      lastActivity: '1 day ago',
      solved: false,
      author: 'Mike Johnson'
    },
  ];

  const downloadMaterial = (material: any) => {
    toast.success(`Downloading ${material.title}`);
  };

  const submitAssignment = (assignment: any) => {
    toast.success(`Assignment "${assignment.title}" submitted successfully!`);
  };

  const joinGroup = (group: any) => {
    toast.success(`Joined ${group.name}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          <span className={theme === 'cyber' ? 'gradient-cyber bg-clip-text text-transparent' : ''}>
            Academic Hub
          </span>
        </h1>
        <p className="text-muted-foreground">Access study materials, assignments, and collaborate with peers</p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="flex gap-3 max-w-2xl">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search materials, assignments, or discussions..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-6">
          <FileText className="h-8 w-8 text-blue-500 mb-2" />
          <p className="font-bold text-2xl">{studyMaterials.length}</p>
          <p className="text-sm text-muted-foreground">Study Materials</p>
        </Card>
        
        <Card className="p-6">
          <CheckCircle2 className="h-8 w-8 text-green-500 mb-2" />
          <p className="font-bold text-2xl">{assignments.filter(a => a.submitted).length}</p>
          <p className="text-sm text-muted-foreground">Completed Assignments</p>
        </Card>
        
        <Card className="p-6">
          <Users className="h-8 w-8 text-purple-500 mb-2" />
          <p className="font-bold text-2xl">{studyGroups.filter(g => g.active).length}</p>
          <p className="text-sm text-muted-foreground">Active Study Groups</p>
        </Card>
        
        <Card className="p-6">
          <MessageSquare className="h-8 w-8 text-orange-500 mb-2" />
          <p className="font-bold text-2xl">{forums.length}</p>
          <p className="text-sm text-muted-foreground">Active Discussions</p>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="materials" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="materials">Study Materials</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="groups">Study Groups</TabsTrigger>
          <TabsTrigger value="forums">Forums</TabsTrigger>
        </TabsList>

        {/* Study Materials Tab */}
        <TabsContent value="materials">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Study Materials</h2>
              <Button className="gap-2">
                <Upload className="h-4 w-4" />
                Upload Material
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studyMaterials.map((material) => (
                <Card key={material.id} className="p-4 hover:shadow-card transition-smooth">
                  <div className="flex gap-4">
                    <img 
                      src={material.image} 
                      alt={material.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-sm line-clamp-2 mb-1">{material.title}</h3>
                          <p className="text-xs text-muted-foreground">{material.subject}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">{material.type}</Badge>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">{material.rating}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{material.downloads} downloads</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{material.size}</span>
                        <Button size="sm" onClick={() => downloadMaterial(material)}>
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Assignments Tab */}
        <TabsContent value="assignments">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">My Assignments</h2>
              <Button className="gap-2">
                <Upload className="h-4 w-4" />
                Submit Assignment
              </Button>
            </div>
            
            <div className="space-y-4">
              {assignments.map((assignment) => (
                <Card key={assignment.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold">{assignment.title}</h3>
                        <Badge variant={assignment.status === 'completed' ? 'default' : assignment.status === 'in_progress' ? 'secondary' : 'destructive'}>
                          {assignment.status}
                        </Badge>
                        <Badge variant="outline">{assignment.points} points</Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">{assignment.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Due: {new Date(assignment.dueDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {assignment.subject}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {!assignment.submitted ? (
                        <Button size="sm" onClick={() => submitAssignment(assignment)}>
                          Submit
                        </Button>
                      ) : (
                        <Badge variant="default" className="gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Submitted
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Study Groups Tab */}
        <TabsContent value="groups">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Study Groups</h2>
              <Button className="gap-2">
                <Users className="h-4 w-4" />
                Create Group
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studyGroups.map((group) => (
                <Card key={group.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold">{group.name}</h3>
                    <Badge variant={group.active ? 'default' : 'secondary'}>
                      {group.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{group.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Members:</span>
                      <span className="font-medium">{group.members}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Next Meeting:</span>
                      <span className="font-medium">{new Date(group.nextMeeting).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Subject:</span>
                      <span className="font-medium">{group.subject}</span>
                    </div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="w-full mt-4" 
                    onClick={() => joinGroup(group)}
                    disabled={!group.active}
                  >
                    {group.active ? 'Join Group' : 'Group Inactive'}
                  </Button>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Forums Tab */}
        <TabsContent value="forums">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Academic Forums</h2>
              <Button className="gap-2">
                <MessageSquare className="h-4 w-4" />
                New Discussion
              </Button>
            </div>
            
            <div className="space-y-4">
              {forums.map((forum) => (
                <Card key={forum.id} className="p-4 hover:shadow-card transition-smooth">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold">{forum.topic}</h3>
                        {forum.solved && (
                          <Badge variant="default" className="gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            Solved
                          </Badge>
                        )}
                        <Badge variant="outline">{forum.subject}</Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>By {forum.author}</span>
                        <span>•</span>
                        <span>{forum.posts} posts</span>
                        <span>•</span>
                        <span>Last activity: {forum.lastActivity}</span>
                      </div>
                    </div>
                    
                    <Button size="sm" variant="outline">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Join Discussion
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}