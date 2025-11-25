import { createClient } from "@supabase/supabase-js";

const url = "https://yzevmtcuxafjhmmrfjen.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6ZXZtdGN1eGFmamhtbXJmamVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwNDE4NzYsImV4cCI6MjA3OTYxNzg3Nn0.XhTzUR64ZU5hrJxuyU6pdzjuBg5S-i-e79Qee_HTm0Q";

const supabase = createClient(url, key);

export default function uploadFile(file) {
	return new Promise((resolve, reject) => {
		const timeStamp = Date.now();
		const fileName = timeStamp + "_" + file.name;
		supabase.storage.from("images").upload(fileName, file, {
			cacheControl: "3600",
			upsert: false,
		}).then(
            ()=>{
                const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
                resolve(publicUrl);
            }
        ).catch((error)=>{
            reject(error);
        })
	});
}

