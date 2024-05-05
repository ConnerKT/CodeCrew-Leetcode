function extractInputOutput(description) {
    let results = {input: "", output: ""};
    const regex = /<strong>Input:<\/strong>(.*?)<strong>Output:<\/strong>(.*?)(<pre>|<\/p>)/s;


        const match = description.match(regex);
        if (match) {
            const input = match[1].trim().replace(/<[^>]*>?/gm, '');  // Remove HTML tags and trim
            const output = match[2].trim().replace(/<[^>]*>?/gm, ''); // Remove HTML tags and trim
            results ={ input, output };
        }
    

    return results;
}

export { extractInputOutput };