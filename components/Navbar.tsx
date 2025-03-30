// components/Navbar.tsx
import { Button } from "@/components/ui/button"

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-blue-500">
      <div className="text-white font-bold">My Website</div>
      <div className="space-x-4">
        <Button variant="link" className="text-white">Home</Button>
        <Button variant="link" className="text-white">About</Button>
        <Button variant="link" className="text-white">Contact</Button>
      </div>
    </nav>
  );
};

export default Navbar;
