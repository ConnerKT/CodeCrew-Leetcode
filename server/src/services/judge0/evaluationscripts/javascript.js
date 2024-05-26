
const inputs = {{inputs}};
const userSubmittedFunction = {{userSubmittedFunction}};

let outputs = [];
for (let i = 0; i < inputs.length; i++) {
    let input = inputs[i];
    let output = userSubmittedFunction(...input);
    outputs.push(output);
}
console.log(JSON.stringify(outputs));



