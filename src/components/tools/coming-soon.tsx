import { HardHat } from 'lucide-react';

export default function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 md:p-16 rounded-lg bg-secondary/50">
      <HardHat className="h-16 w-16 text-primary mb-4" />
      <h2 className="text-2xl font-bold">Tool Coming Soon!</h2>
      <p className="text-muted-foreground mt-2">
        This tool is under construction. We're working hard to bring it to you.
      </p>
    </div>
  );
}
