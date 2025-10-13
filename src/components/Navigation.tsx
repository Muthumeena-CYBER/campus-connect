import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { UserButton, useUser } from '@clerk/clerk-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { 
  BookOpen, 
  UtensilsCrossed, 
  GraduationCap, 
  Building2, 
  Wallet, 
  Settings,
  Sparkles,
  Moon,
  Sun,
  LogOut
} from 'lucide-react';

export const Navigation = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { isSignedIn } = useUser();

  // Detect dashboard type
  const isLibrarian = location.pathname.startsWith('/librarian');
  const isCanteenIncharge = location.pathname.startsWith('/canteen-incharge');
  const isFaculty = location.pathname.startsWith('/faculty');
  // Faculty nav items
  const facultyNavItems = [
    { tab: 'resources', label: 'Resources' },
    { tab: 'tests', label: 'Tests' },
    { tab: 'groups', label: 'Groups' },
    { tab: 'forums', label: 'Forums' },
    { tab: 'performance', label: 'Performance' },
  ];

  // Student nav items
  const studentNavItems = [
    { path: '/dashboard', label: 'Dashboard', icon: GraduationCap },
    { path: '/library', label: 'Library', icon: BookOpen },
    { path: '/canteen', label: 'Canteen', icon: UtensilsCrossed },
    { path: '/academic', label: 'Academic', icon: GraduationCap },
    { path: '/campus', label: 'Campus', icon: Building2 },
    { path: '/wallet', label: 'Wallet', icon: Wallet },
  ];

  // Librarian nav items (tab param for active state)
  const librarianNavItems = [
    { tab: 'requests', label: 'Requests' },
    { tab: 'inventory', label: 'Inventory' },
    { tab: 'loans', label: 'Loans & Returns' },
    { tab: 'fines', label: 'Fines & Dues' },
  ];

  // Canteen In-charge nav items
  const canteenNavItems = [
    { tab: 'menu', label: 'Menu & Inventory' },
    { tab: 'orders', label: 'Pre-Orders' },
    { tab: 'transactions', label: 'Transactions' },
  ];

  // Get current tab from URL
  const getCurrentTab = () => {
    const params = new URLSearchParams(location.search);
    if (isLibrarian) return params.get('tab') || 'requests';
    if (isCanteenIncharge) return params.get('tab') || 'menu';
    if (isFaculty) return params.get('tab') || 'resources';
    return params.get('tab') || '';
  };

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <nav className="glass-effect sticky top-0 z-50 border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className={theme === 'cyber' ? 'gradient-cyber bg-clip-text text-transparent' : ''}>
              campus connect
            </span>
          </Link>

          {/* Nav Items */}
          <div className="hidden md:flex items-center gap-1 flex-1">
            {!isLibrarian && !isCanteenIncharge && !isFaculty && studentNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path}>
                  <Button 
                    variant={isActive(item.path) ? 'default' : 'ghost'}
                    className="gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
            {isLibrarian && (
              <>
                {librarianNavItems.map((item) => (
                  <Link key={item.tab} to={`/librarian?tab=${item.tab}`}>
                    <Button
                      variant={getCurrentTab() === item.tab ? 'default' : 'ghost'}
                      className="gap-2"
                    >
                      {item.label}
                    </Button>
                  </Link>
                ))}
              </>
            )}
            {isCanteenIncharge && (
              <>
                {canteenNavItems.map((item) => (
                  <Link key={item.tab} to={`/canteen-incharge?tab=${item.tab}`}>
                    <Button
                      variant={getCurrentTab() === item.tab ? 'default' : 'ghost'}
                      className="gap-2"
                    >
                      {item.label}
                    </Button>
                  </Link>
                ))}
              </>
            )}
            {isFaculty && (
              <>
                {facultyNavItems.map((item) => (
                  <Link key={item.tab} to={`/faculty?tab=${item.tab}`}>
                    <Button
                      variant={getCurrentTab() === item.tab ? 'default' : 'ghost'}
                      className="gap-2"
                    >
                      {item.label}
                    </Button>
                  </Link>
                ))}
              </>
            )}
          </div>
          
          {/* Theme Toggle, Dashboard Dropdown & User Menu */}
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTheme}
              className="transition-smooth"
            >
              {theme === 'classic' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
            {/* Dashboard Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Dashboards
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">
                    <span className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" /> Student
                    </span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/librarian">
                    <span className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" /> Librarian
                    </span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/canteen-incharge">
                    <span className="flex items-center gap-2">
                      <UtensilsCrossed className="h-4 w-4" /> Canteen In-charge
                    </span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/faculty">
                    <span className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" /> Faculty/Teacher
                    </span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {isSignedIn && (
              <>
                <Link to="/settings">
                  <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5" />
                  </Button>
                </Link>
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "h-10 w-10"
                    }
                  }}
                  afterSignOutUrl="/"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
