import json

testInputs = {{testInputs}}
userSubmittedFunction = {{userSubmittedFunction}}


outputs = []
for i in range(len(testInputs)):
    input = testInputs[i]
    output = userSubmittedFunction(**input)
    outputs.append(output)
    
print(json.dumps(outputs))
