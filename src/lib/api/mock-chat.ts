// Mock chat API for development - replace with real backend API
import appGuide from '@/lib/app_guide.json';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export interface ChatResponse {
  reply: string;
  success: boolean;
  error?: string;
}

// Enhanced mock responses based on app guide
const getModuleResponse = (module: string) => {
  const moduleInfo = appGuide.modules[module as keyof typeof appGuide.modules];
  if (moduleInfo) {
    return `The ${module} module in Campus Connect allows you to ${moduleInfo.description.toLowerCase()}. Key features include: ${moduleInfo.features.slice(0, 3).join(', ')}. Access it from the main navigation.`;
  }
  return `The ${module} module provides various campus services. Check the navigation menu to access it.`;
};

const getRoleResponse = (role: string) => {
  const roleInfo = appGuide.roles[role as keyof typeof appGuide.roles];
  if (roleInfo) {
    return `As a ${role} in Campus Connect, you have access to: ${roleInfo.permissions.slice(0, 3).join(', ')}. Your dashboard provides ${roleInfo.dashboard_features.join(', ')}.`;
  }
  return `Your role in Campus Connect provides access to various campus services. Check your dashboard for available features.`;
};

const campusKeywords = {
  // Library related
  library: "The Library module in Campus Connect lets you browse books, issue/return using QR codes, track due dates, and pay fines. Students can reserve books, while librarians manage inventory and process returns.",
  "borrow book": "To borrow a book: 1) Browse the catalog in Library section, 2) Scan the book's QR code or select it, 3) System checks availability, 4) Book is issued with due date. You'll receive confirmation.",
  "return book": "To return a book: 1) Go to Library section, 2) Scan the book's QR code, 3) System identifies the book and calculates any fines, 4) Book is returned and availability updated.",
  "due date": "Check your due dates in the Library section under 'My Issued Books'. Overdue books will show fines that can be paid online.",
  "library fine": "Pay library fines in the Library section. Overdue books automatically calculate fines which can be paid through the digital payment system.",
  
  // Canteen related
  canteen: "The Canteen module offers pre-ordering to skip queues. Students can view the menu, place orders, track status, and pay digitally. Staff can manage inventory and process orders.",
  "pre order": "To pre-order: 1) Go to Canteen section, 2) Browse available menu items, 3) Select items and quantities, 4) Place order, 5) Pick up when ready. You'll get notifications about order status.",
  "canteen menu": "View the current menu in the Canteen section. Items show real-time availability and prices. You can filter by category and see what's in stock.",
  "order status": "Track your canteen orders in the Canteen section. You'll see pending, ready, and completed orders with timestamps.",
  
  // Academic related
  academic: "The Academic module provides study materials, assignment submission, study groups, and forums. Students can download resources and collaborate, while professors can upload materials and grade assignments.",
  "study materials": "Download study materials in the Academic section. Materials are organized by subject with ratings and download counts. Professors can upload new resources.",
  "assignment": "Submit assignments in the Academic section. View due dates, download requirements, and upload completed work. Professors can grade and provide feedback.",
  "study group": "Join study groups in the Academic section. Create or join groups by subject, schedule meetings, and collaborate with peers.",
  "forum": "Participate in academic forums in the Academic section. Ask questions, help others, and engage in subject-specific discussions.",
  
  // Campus related
  campus: "The Campus module manages events, facility bookings, services, and announcements. Register for events, book facilities, and stay updated with campus news.",
  "event": "Register for campus events in the Campus section. View upcoming events, check capacity, and get event details. You'll receive notifications about registered events.",
  "facility booking": "Book campus facilities like labs or conference rooms in the Campus section. Check availability, select time slots, and get booking confirmations.",
  "announcement": "View campus announcements in the Campus section. Important updates are highlighted, and you can mark them as read.",
  
  // General
  dashboard: "Your Dashboard shows personalized overview with quick stats, recent activity, notifications, and quick actions based on your role (Student, Professor, Librarian, etc.).",
  "change theme": "Switch between Classic and Cyber themes using the theme toggle button in the navigation bar. Your preference is saved automatically.",
  "help": "I'm your Campus Connect assistant! I can help with library services, canteen pre-ordering, academic resources, campus events, and general navigation. What do you need help with?",
  "permission": "Your permissions depend on your role. Students can access library, canteen, academic, and campus services. Professors can upload materials and manage assignments. Librarians manage books. Canteen staff manage orders. Admins have full access.",
  
  // Role specific
  student: getRoleResponse("Student"),
  professor: getRoleResponse("Professor"),
  librarian: getRoleResponse("Librarian"),
  "canteen staff": getRoleResponse("Canteen Staff"),
  admin: getRoleResponse("Admin"),
};

export const sendChatMessage = async (message: string): Promise<ChatResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

  const lowerMessage = message.toLowerCase();
  
  // Check for specific campus-related keywords (prioritize more specific matches)
  for (const [keyword, response] of Object.entries(campusKeywords)) {
    if (lowerMessage.includes(keyword)) {
      return {
        reply: response,
        success: true,
      };
    }
  }

  // Check for greeting patterns
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return {
      reply: "Hello! I'm your Campus Connect assistant. I can help you with library services, canteen pre-ordering, academic resources, campus events, and general navigation. What would you like to know about?",
      success: true,
    };
  }

  // Check for help requests
  if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
    return {
      reply: `I can help you with Campus Connect features:

📚 **Library**: Borrow/return books, QR code scanning, due dates, fines
🍽️ **Canteen**: Pre-order meals, view menu, track orders, payments
🎓 **Academic**: Study materials, assignments, study groups, forums
🏫 **Campus**: Events, facility booking, announcements, services
⚙️ **General**: Dashboard, themes, permissions, navigation

What specific area would you like assistance with?`,
      success: true,
    };
  }

  // Check for module names
  const moduleNames = Object.keys(appGuide.modules);
  for (const module of moduleNames) {
    if (lowerMessage.includes(module.toLowerCase())) {
      return {
        reply: getModuleResponse(module),
        success: true,
      };
    }
  }

  // Check for role names
  const roleNames = Object.keys(appGuide.roles);
  for (const role of roleNames) {
    if (lowerMessage.includes(role.toLowerCase())) {
      return {
        reply: getRoleResponse(role),
        success: true,
      };
    }
  }

  // Check for out-of-scope queries
  const outOfScopeKeywords = ['weather', 'news', 'sports', 'politics', 'cooking', 'travel', 'movie', 'music'];
  if (outOfScopeKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return {
      reply: "I can help only with Campus Connect-related queries. Please ask me about library services, canteen pre-ordering, academic resources, campus events, or other Campus Connect features.",
      success: true,
    };
  }

  // Default response with helpful suggestions
  return {
    reply: `I'm here to help with Campus Connect! You can ask me about:

• **Library services** - borrowing, returning, QR codes, fines
• **Canteen pre-ordering** - menu, orders, payments
• **Academic resources** - materials, assignments, study groups
• **Campus events** - registration, facilities, announcements
• **Your role and permissions** - what you can access
• **Navigation help** - how to use different features

What would you like to know?`,
    success: true,
  };
};

// For production, replace this with actual OpenAI API call:
/*
export const sendChatMessage = async (message: string): Promise<ChatResponse> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      reply: data.reply,
      success: true,
    };
  } catch (error) {
    console.error('Chat API error:', error);
    return {
      reply: 'Sorry, I encountered an error. Please try again.',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
*/
