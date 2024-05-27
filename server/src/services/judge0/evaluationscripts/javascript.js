
const inputs = {{inputs}};
{{userSubmittedFunction}};

let outputs = [];
for (let i = 0; i < inputs.length; i++) {
    let input = inputs[i];
    let output = {{userSubmittedFunctionName}}(...input);
    outputs.push(output);
}
console.log(JSON.stringify(outputs));



