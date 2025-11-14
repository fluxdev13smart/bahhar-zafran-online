-- Create a table to track website visitors
CREATE TABLE IF NOT EXISTS public.visitor_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  visit_date DATE NOT NULL DEFAULT CURRENT_DATE,
  visit_count INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(visit_date)
);

-- Enable Row Level Security
ALTER TABLE public.visitor_stats ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read visitor stats (public data)
CREATE POLICY "Anyone can view visitor stats"
ON public.visitor_stats
FOR SELECT
USING (true);

-- Create policy to allow the edge function to insert/update visitor stats
CREATE POLICY "Service role can manage visitor stats"
ON public.visitor_stats
FOR ALL
USING (true)
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_visitor_stats_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_visitor_stats_updated_at
BEFORE UPDATE ON public.visitor_stats
FOR EACH ROW
EXECUTE FUNCTION public.update_visitor_stats_updated_at();