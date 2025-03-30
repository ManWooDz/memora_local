// components/Navbar.tsx
import { Button } from "@/components/ui/button"

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-white">
      <div className="text-black font-bold">MEMORA</div>
      <div className="space-x-4">
        <Button variant="link" className="text-black">Home</Button>
        <Button variant="link" className="text-black">About</Button>
        <Button variant="link" className="text-black">Contact</Button>
      </div>
    </nav>
  );
};

export default Navbar;
