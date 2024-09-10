const fs = require('fs');
const filePath = 'input.txt'; // File path

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }
    
    console.log("Before appending:\n" + data); // Print the original content

    // Step 2: Append "Hello, Node!" to the file
    fs.appendFile(filePath, '\nHello, Node!', (err) => {
        if (err) {
            console.error("Error appending to file:", err);
            return;
        }

        // Step 3: Read the updated content of the file
        fs.readFile(filePath, 'utf8', (err, updatedData) => {
            if (err) {
                console.error("Error reading file:", err);
                return;
            }
            
            console.log("\nAfter appending:\n" + updatedData); 
        });
    });
});
