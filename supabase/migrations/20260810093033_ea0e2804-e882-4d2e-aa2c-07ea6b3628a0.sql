DROP POLICY IF EXISTS "Service role can manage visitor stats" ON public.visitor_stats;

CREATE POLICY "Service role can manage visitor stats"
ON public.visitor_stats
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

REVOKE INSERT, UPDATE, DELETE ON public.visitor_stats FROM anon, authenticated;
GRANT SELECT ON public.visitor_stats TO anon, authenticated;
GRANT ALL ON public.visitor_stats TO service_role;