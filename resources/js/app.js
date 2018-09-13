// Enter was pressed
document.addEventListener('keypress', function(event) {
    if (event.keyCode === 13 || event.which === 13) {
        LookUpDefinition();
    }
});

// Button was clicked
$("button").click(function () {
    LookUpDefinition();
});

function LookUpDefinition() {
    // Get Input
    var input = document.getElementById("input").value;
    var query = "define_" + input;
    
    if(input !== "") {
    
        // Clear content placeholders
        document.getElementById("contentError").innerHTML = "";
        document.getElementById("content1").innerHTML = "";
        document.getElementById("content2").innerHTML = "";

        // Clear input
        document.getElementById("input").value = "";

        // AJAX Get Request
        $.ajax({
            type: 'GET',
            // Lock API keys to production site during deployment
            url: "https://www.googleapis.com/customsearch/v1?key=AIzaSyB7_z9x1JbepRx5R_9uxDbuDuUTyLsDL8U&cx=011706972057152550531:ukyftn4tpzk&q=" + query,
            success: function (response) {
                try {
                    // Convert JSON to string
                    var responseString = JSON.stringify(response.items);

                    // Create query string
                    var inputWithDefinition = input.substring(1) + " definition,";

                    // Find desired response
                    if (responseString.includes(inputWithDefinition)) {
                        var startIndex = responseString.indexOf(inputWithDefinition) + 12 + input.length;
                    } else {
                        var startIndex = responseString.indexOf("definition,") + 12;
                    }
                    var definition = responseString.substring(startIndex);

                    // Remove any new lines characters
                    for(i = 0; i < 5; i++) {
                        definition = definition.replace("\\n", "");
                    }

                    // -------------- Find desired ending index --------------
                    var endIndexSeeMore = definition.indexOf("See more") - 1;
                    var endIndexDotDot = definition.indexOf("...") + 3;

                    var endIndex;
                    if (endIndexSeeMore < endIndexDotDot || endIndexDotDot === 2) {
                        endIndex = endIndexSeeMore;
                        if (endIndexDotDot === 2) {
                            endIndexDotDot = 999;
                        }
                    } else {
                        endIndex = endIndexDotDot;
                    }
                    var endIndexSemiColin = definition.indexOf(";");
                    if (endIndexSemiColin < endIndexSeeMore && endIndexSemiColin < endIndexDotDot && endIndexSemiColin != -1) {
                        endIndex = endIndexSemiColin;
                    }
                    definition = definition.substring(0, endIndex);

                    var endIndexColin = definition.indexOf(":");
                    if (endIndexColin < endIndexSeeMore && endIndexColin < endIndexDotDot && endIndexColin < endIndexSemiColin && endIndexColin != -1) {
                        endIndex = endIndexColin;
                    }
                    definition = definition.substring(0, endIndex);

                    var endIndexHtmlSnippet = definition.indexOf("\",\"htmlSnippet");
                    if (endIndexHtmlSnippet < endIndexSeeMore && endIndexHtmlSnippet < endIndexDotDot && endIndexHtmlSnippet < endIndexSemiColin && endIndexHtmlSnippet < endIndexColin && endIndexHtmlSnippet != -1) {
                        endIndex = endIndexHtmlSnippet;
                    }
                    definition = definition.substring(0, endIndex);
                    // -------------------------------------------------------

                    // Remove any new lines characters
                    for(i = 0; i < 5; i++) {
                        definition = definition.replace("\\n", "");
                    }

                    // If definition is in parentheses, remove parentheses
                    if (definition.startsWith("(") && definition.endsWith(")")) {
                        definition = definition.substr(1, definition.length - 2);
                    }

                    // If definition was not found, throw error
                    if(definition.length < 3) {
                        definition = 3/0;
                    }
                    console.log(definition);
                    if(definition.startsWith("to state or set forth")) {
                        definition = 3/0;
                    }
                    

                    // If definition doesn't end with a period, add a period
                    if (!definition.endsWith(".")) {
                        definition += ".";
                    }

                    // Capitalize first letter of the first word
                    definition = definition.charAt(0).toUpperCase() + definition.substr(1);

                    // Typing effect, content1
                    input = input.charAt(0).toUpperCase() + input.substr(1);
                    var txt1 = input + " Definition:";
                    var i1 = 0;
                    var speed = 50;
                    typeWriter1();
                    function typeWriter1() {
                        if (i1 < txt1.length) {
                            document.getElementById("content1").innerHTML += txt1.charAt(i1);
                            i1++;
                            setTimeout(typeWriter1, speed);
                        }
                        else {
                            typeWriter2();
                        }
                    }
                    // Typing effect, content2
                    var i2 = 0;
                    var txt2 = definition;
                    function typeWriter2() {
                      if (i2 < txt2.length) {
                        document.getElementById("content2").innerHTML += txt2.charAt(i2);
                        i2++;
                        setTimeout(typeWriter2, speed);
                      }
                    }
                } catch (error) {
                    var txt = "Cannot find the definition of " + input;
                    var i = 0;
                    var speed = 50;
                    typeWriter();
                    function typeWriter() {
                      if (i < txt.length) {
                        document.getElementById("contentError").innerHTML += txt.charAt(i);
                        i++;
                        setTimeout(typeWriter, speed);
                      }
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var txt = "Error: Maximum API Calls Reached.";
                var i = 0;
                var speed = 50;
                typeWriter();
                function typeWriter() {
                  if (i < txt.length) {
                    document.getElementById("contentError").innerHTML += txt.charAt(i);
                    i++;
                    setTimeout(typeWriter, speed);
                  }
                }
            }
        });
    }
}