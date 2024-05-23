

function escortFunction(testInputs: any[], userSubmittedFunction: Function){
    for (let i = 0; i < testInputs.length; i++) {
        let input = testInputs[i];
        let output = userSubmittedFunction(...input);
        console.log(output);
    }

    return "Escort function ran successfully";
}


export { escortFunction };