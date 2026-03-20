import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '@/assets/logo.png';
import { Activity, Menu, X } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';

const navLinks = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Symptom Analyzer', to: '/analyzer' },
  { label: 'Drug Checker', to: '/drug-checker' },
  { label: 'Health Report', to: '/report' },
];

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);



  return (
    <nav className="h-20 border-b border-border bg-surface/80 backdrop-blur-md flex items-center px-4 md:px-8 justify-between sticky top-0 z-10">
      <Dialog>
        <DialogTrigger asChild>
          <button className="flex items-center gap-2 p-1">
            <img src={logo} className="h-28 w-auto" alt="MediCare Logo" />
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-sm">
          <div className="flex flex-col items-center gap-2 text-center">
            <img src={logo} className="h-36 w-auto" alt="MediCare Logo" />
            <DialogTitle>Welcome to MediCare</DialogTitle>
            <DialogDescription>Click the logo anytime for quick app info and help tips.</DialogDescription>
          </div>
          <DialogClose className="mt-4 inline-flex justify-center rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90">
            Close
          </DialogClose>
        </DialogContent>
      </Dialog>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-1">
        {navLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              location.pathname === link.to
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Mobile toggle */}
      <button className="md:hidden p-2 rounded-lg hover:bg-muted" onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {mobileOpen && (
        <div className="absolute top-16 left-0 right-0 bg-surface border-b border-border p-4 flex flex-col gap-2 md:hidden z-50">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};
