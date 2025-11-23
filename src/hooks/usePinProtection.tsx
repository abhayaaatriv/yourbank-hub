import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const usePinProtection = () => {
  const [isPinVerified, setIsPinVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const { user } = useAuth();

  const verifyPin = async (pin: string): Promise<boolean> => {
    if (!user) return false;

    setIsVerifying(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('account_pin')
        .eq('id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (data && data.account_pin === pin) {
        setIsPinVerified(true);
        toast.success('PIN verified successfully');
        return true;
      } else {
        toast.error('Incorrect PIN');
        return false;
      }
    } catch (error) {
      toast.error('Failed to verify PIN');
      return false;
    } finally {
      setIsVerifying(false);
    }
  };

  const resetPinVerification = () => {
    setIsPinVerified(false);
  };

  return { isPinVerified, isVerifying, verifyPin, resetPinVerification };
};
