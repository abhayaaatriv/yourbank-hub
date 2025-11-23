import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock } from 'lucide-react';

interface PinDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVerify: (pin: string) => Promise<boolean>;
  isVerifying: boolean;
}

export function PinDialog({ open, onOpenChange, onVerify, isVerifying }: PinDialogProps) {
  const [pin, setPin] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onVerify(pin);
    if (success) {
      setPin('');
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center">Enter Your PIN</DialogTitle>
          <DialogDescription className="text-center">
            Please enter your 4-digit PIN to view your balance
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            maxLength={4}
            placeholder="••••"
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
            className="text-center text-2xl tracking-widest"
            autoFocus
            disabled={isVerifying}
          />
          <Button type="submit" className="w-full" disabled={isVerifying || pin.length !== 4}>
            {isVerifying ? 'Verifying...' : 'Verify PIN'}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Default PIN is 0000. You can change it in your profile settings.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
