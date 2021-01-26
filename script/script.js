var passwordLength = 100;
var x = null;
var password = '';
var str = '';   
var characterTypes = [];
var includeLowerCase = false;   
var includeUpperCase = false;   
var includeNumeric = false;   
var includeSpecialCharacters = false;   
var passwordLength = 0;
var characterTypesLength = 0;
var charactersLower = 'abcdefghijklmnopqrstuvwxyz';
var charactersUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var charactersLength = charactersLower.length;
var speed = 1;
var maxLimit = 10000;

var specialCharacters =  "!#$%&'()*+,-./:;=>?@[\]^_`{|}~";
specialCharacters += '"';
//specialCharacters +=  "<";
// FOR specialCharacters "<"; convert when rendering to html equivalent = &lt
// password.replace(/</g, "&lt;")

var specialcharactersLength = specialCharacters.length;

        function start() {
            document.getElementById("btnCancel").style.display = "inline-block";
            document.getElementById("btnCopy").style.display = "inline-block";
            document.getElementById("btnReset").style.display = "none";

            resetVariables();

            speed = document.getElementById("displaySpeedTextBox").value;
           
            if (promptUser() === 1) {
                if (validateDisplaySpeed(speed) === false) {
                    alert("Display Speed must be between 1 and 10000!");
                }
                else {
                    if (promptCharTypes() === 1 ) {                   
                        generatePassword ();
                    }
                }
            }   
         
        }

        function resetVariables() {
            document.getElementById("lblPassword").innerHTML = "";
            document.getElementById("lblTitleTop").innerHTML = "";
            document.getElementById("lblTitle").innerHTML = "";
            passwordLength = 0;
            includeLowerCase = false;   
            includeUpperCase = false;   
            includeNumeric = false;   
            includeSpecialCharacters = false;  
            password = '';
            str = '';    
            characterTypes = [];
            characterTypesLength = 0;
            speed = 1;
        }

        function promptUser() {
            //passwordLengthTextBox
            passwordLength = document.getElementById("passwordLengthTextBox").value;

            if (validatePasswordLength(passwordLength) === false) {
                alert("Password length must be between 1 and 10000!");
                return 0;
            }
            else {
                return 1;
            }           
        }

        function promptCharTypes() {
            // includeSpecialCharacters = false;

            includeLowerCase = document.getElementById("lowerCaseType").checked;
            includeUpperCase = document.getElementById("upperCaseType").checked;
            includeNumeric = document.getElementById("numberType").checked;
            includeSpecialCharacters = document.getElementById("specialCharactersType").checked;

            if (includeLowerCase) {
                characterTypes.push("includeLowerCase");
            }

            if (includeUpperCase) {
                characterTypes.push("includeUpperCase");
            }

            if (includeNumeric) {
                characterTypes.push("includeNumeric");
            }

            if (includeSpecialCharacters) {
                characterTypes.push("includeSpecialCharacters");
            }

            characterTypesLength = characterTypes.length;

           // alert("You selected: \n" + characterTypes.join("\n"));

            if (validateCharacterType(includeLowerCase, includeUpperCase, includeNumeric, includeSpecialCharacters) === false) {
                alert("You must select at least one character type!");
                return 0;
            }
            else {
                return 1;
            }
        }

        function generatePassword () {
            // document.getElementById("btnCancel").style.display = "inline-block";
            // document.getElementById("btnCopy").style.display = "inline-block";
            // document.getElementById("btnReset").style.display = "none";

            x = setInterval(function() {
            //Get random character type
            var rndType = Math.floor(Math.random() * characterTypesLength);

            var CharType = characterTypes[rndType];     

            if (CharType === "includeLowerCase") {           
                str = charactersLower.charAt(Math.floor(Math.random() * charactersLength));
                password += str;
            }
            else if (CharType === "includeUpperCase") {
                str = charactersUpper.charAt(Math.floor(Math.random() * charactersLength));
                password += str;
            }
            else if (CharType === "includeNumeric") {
                str = Math.floor(Math.random() * 10);
                password += str;
            }
            else if (CharType === "includeSpecialCharacters") {
                str = specialCharacters.charAt(Math.floor(Math.random() * specialcharactersLength));
                password += str;
            }

            //Output result 
            //document.getElementById('lblPassword').innerHTML = JSON.stringify(password.replace(/</g, "&lt;"));
            document.getElementById('lblPassword').innerHTML = password;           
            document.getElementById('lblTitle').innerHTML = "Password Length: " + password.length;
            document.getElementById('lblTitleTop').innerHTML = password.length;

            if (password.length > maxLimit) {
                //Error prevention 
                clearInterval(x);
                password = password.substring(0, maxLimit);
                document.getElementById('lblTitle').innerHTML = "Password Length: " + password.length;
                document.getElementById('lblTitleTop').innerHTML = password.length;
                // document.getElementById('lblPassword').innerHTML = password;
                document.getElementById('lblPassword').innerHTML = password.replace(/</g, "&lt;");
                document.getElementById("lblTitle").style.color = "blue";
                document.getElementById("lblTitleTop").style.color = "blue";
                document.getElementById("btnReset").style.display = "inline-block";
                document.getElementById("btnCopy").style.display = "inline-block";
                document.getElementById("btnCancel").style.display = "none";

                document.getElementById("btnGenerate").disabled = false;
                alert("Error: Exceeded MaxLimit");
            }

            if (password.length >= passwordLength){        
                clearInterval(x);
                password = password.substring(0, passwordLength);
                document.getElementById('lblTitle').innerHTML = "Password Length: " + password.length;
                document.getElementById('lblTitleTop').innerHTML = password.length;
                // document.getElementById('lblPassword').innerHTML = password;
                document.getElementById('lblPassword').innerHTML = password.replace(/</g, "&lt;");
                document.getElementById("lblTitle").style.color = "blue";
                document.getElementById("lblTitleTop").style.color = "blue";
                document.getElementById("btnReset").style.display = "inline-block";
                document.getElementById("btnCopy").style.display = "inline-block";
                document.getElementById("btnCancel").style.display = "none";

                document.getElementById("btnGenerate").disabled = false;
            }

            }, speed);
        }

        function cancel() {
            try {
               clearInterval(x);
                password = password.substring(0, passwordLength);
                document.getElementById('lblTitle').innerHTML = "Password Length: " + password.length;
                document.getElementById('lblTitleTop').innerHTML = password.length;
                // document.getElementById('lblPassword').innerHTML = password;
                document.getElementById('lblPassword').innerHTML = password.replace(/</g, "&lt;");
                document.getElementById("lblTitle").style.color = "blue";
                document.getElementById("lblTitleTop").style.color = "blue";

                document.getElementById("btnCancel").style.display = "none";
                document.getElementById("btnReset").style.display = "inline-block";
                document.getElementById("btnCopy").style.display = "inline-block";

                document.getElementById("btnGenerate").disabled = false;
        } catch (err) {
            console.log('Oops, unable to cancel');
          }
        }

        function reset() {
            try {
                document.getElementById("lblPassword").innerHTML = "";
                document.getElementById("lblTitleTop").innerHTML = "";
                document.getElementById("lblTitle").innerHTML = "";
                document.getElementById("btnReset").style.display = "none";
                document.getElementById("btnCopy").style.display = "none";

                document.getElementById("btnGenerate").disabled = false;
        } catch (err) {
            console.log('Oops, unable to reset');
          }
        }

        function copy() {
             /* Get the text field */
            var copyGfGText = document.getElementById("lblPassword").innerHTML; 
            var dummy = document.createElement("textarea");
            document.body.appendChild(dummy);
            dummy.value = copyGfGText;
            dummy.select();

            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';
                console.log('Copying text command was ' + msg);
                alert("Password copied to clipboard!");
              } catch (err) {
                console.log('Oops, unable to copy');
              }
            
              document.body.removeChild(dummy);
        }

        function validatePasswordLength(passwordLength) {
            if (passwordLength >= 1 && passwordLength <= 10000) {
                return true;
            }
            else {
                return false;
            }
        }

        function validateDisplaySpeed(speed) {
            if (speed >= 1 && speed <= 10000) {
                return true;
            }
            else {
                return false;
            }
        }

        function validateCharacterType (includeLowerCase, includeUpperCase, includeNumeric, includeSpecialCharacters) {
            if (includeLowerCase === false && includeUpperCase === false && includeNumeric === false && includeSpecialCharacters === false) {
                return false;
            }
            else {
                return true;
            }
        }