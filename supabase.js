const dotenv = require('dotenv'); // Importez dotenv
dotenv.config(); // Chargez les variables d'environnement à partir du fichier .env
const { createClient } = require('@supabase/supabase-js');


const supabaseUrl = process.env.URL_SUPABASE
const supabaseKey = process.env.CLE_API_SUPABASE 

const supabase = createClient(supabaseUrl,supabaseKey)



function useSupabase(){
    return {supabase}
}


module.exports = {useSupabase};