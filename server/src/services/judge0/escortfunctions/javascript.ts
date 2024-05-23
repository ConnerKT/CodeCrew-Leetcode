

function escortFunction(testInputs: any[], userSubmittedFunction: Function){
    let outputs: any[] = [];
    for (let i = 0; i < testInputs.length; i++) {
        let input = testInputs[i];
        let output = userSubmittedFunction(...input);
        outputs.push(output);
    }
    console.log(JSON.stringify(outputs));
}


export { escortFunction };