const { GoogleGenerativeAI } = require("@google/generative-ai");
function extractJSON(text) {
    const jsonMatch = text.match(/{[\s\S]*}/); // Matches the first JSON object in the string
    return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
}
export const getData = async (prompt)=>{
    const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_GOOGLE_KEY
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // const prompt =
    // "iam preparing for sbi po , give me all topics in each subject hear is my syllabus in json format just give me json"
    const result = await model.generateContent(prompt);
    const len = result.response.text().length;
    console.log("res - " , result.response.text());
    
    const jsobj = extractJSON(result.response.text());
    console.log("result : ",jsobj);
    

    
    return jsobj;
            
}