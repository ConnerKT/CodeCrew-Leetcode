import json

testInputs = {{inputs}}
{{userSubmittedFunction}}


outputs = []
for i in range(len(testInputs)):
    input = testInputs[i]
    output = {{userSubmittedFunctionName}}(*input)
    outputs.append(output)
    
print(json.dumps(outputs))
