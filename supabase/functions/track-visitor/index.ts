import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const today = new Date().toISOString().split('T')[0];
    
    // Try to increment existing count for today
    const { data: existing, error: fetchError } = await supabase
      .from('visitor_stats')
      .select('*')
      .eq('visit_date', today)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching visitor stats:', fetchError);
      throw fetchError;
    }

    if (existing) {
      // Update existing record
      const { error: updateError } = await supabase
        .from('visitor_stats')
        .update({ visit_count: existing.visit_count + 1 })
        .eq('visit_date', today);

      if (updateError) {
        console.error('Error updating visitor stats:', updateError);
        throw updateError;
      }

      console.log(`Updated visitor count for ${today}: ${existing.visit_count + 1}`);
    } else {
      // Insert new record for today
      const { error: insertError } = await supabase
        .from('visitor_stats')
        .insert({ visit_date: today, visit_count: 1 });

      if (insertError) {
        console.error('Error inserting visitor stats:', insertError);
        throw insertError;
      }

      console.log(`Created new visitor count for ${today}: 1`);
    }

    // Get total visitor count
    const { data: allStats, error: totalError } = await supabase
      .from('visitor_stats')
      .select('visit_count');

    if (totalError) {
      console.error('Error fetching total stats:', totalError);
      throw totalError;
    }

    const totalVisitors = allStats?.reduce((sum, stat) => sum + stat.visit_count, 0) || 0;

    return new Response(
      JSON.stringify({ 
        success: true, 
        totalVisitors,
        message: 'Visitor tracked successfully' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error in track-visitor function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
