import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useVisitorTracking = () => {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Only track once per session
        const hasTracked = sessionStorage.getItem('visitor_tracked');
        if (hasTracked) return;

        const { error } = await supabase.functions.invoke('track-visitor');
        
        if (error) {
          console.error('Error tracking visitor:', error);
        } else {
          sessionStorage.setItem('visitor_tracked', 'true');
        }
      } catch (error) {
        console.error('Error in visitor tracking:', error);
      }
    };

    trackVisitor();
  }, []);
};
