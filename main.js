var numb = {
    firstNumber: "",
    secondNumber: ""
};
var keyword = "firstNumber";
var operator1 = "";
var operator2 = "";
var operatorassigned = false;
$(document).ready(function() {
// THIS FUNCTION ASSIGNS VALUES TO FIRSTNUMBER THEN TO OPERATOR1 THEN TO SECONDNUMBER AND OPERATOR2
    $(".col-xs-3").click(function(data) {
        // THIS CONDITION CHECKS IF BUTTON PRESSED IS AN OPERATOR
        if ($(this)[0].className.indexOf("operator") !== -1) {
            if (Boolean(numb.firstNumber) & Boolean(!numb.secondNumber)) {
                if ($(this).text()[25] !== "=") {
                    operator1 = $(this).text()[25];
                    operatorassigned = true;
                    console.log("operator1 assigned");
                }
            }
            if (operator2 === "" & keyword == "secondNumber" & numb.secondNumber.length > 0) {
                operator2 = $(this).text()[25];
                console.log("calculating");
                console.log("operator1 is " + operator1);
                console.log("operator2 is " + operator2);
                calculation();
            }

        } else {
            var input = $(this).text()[25];
            if (operatorassigned) {
                keyword = "secondNumber";
                screenFill(input);
            } else {
                screenFill(input);
            }
        }
    });
// THIS FUNCTION LISTENS TO BUTTONS AC AND CE. WHEN AC IS PRESSED IT EXECUTES FULL RESET
    $(".col-xs-6").click(function(data) {
        console.log($(this).text()[25]);
        if ($(this).text()[25] === "A") {
            keyword = "firstNumber";
            operator1 = "";
            operator2 = "";
            operatorassigned = false;
            numb.firstNumber = "";
            numb.secondNumber = "";
            $(".screen").text("0");
        }
        if ($(this).text()[25] === "C") {
            numb[keyword] = "0";
            screenFill(0);
        }
    })
// FILLS THE SCREEEN WITH INPUT WE GIVE
    function screenFill(input) {
        if (numb[keyword].toString().indexOf(".") !== -1 & input === ".") {} else {
            if (numb[keyword] == 0 & numb[keyword].toString().indexOf(".") === -1) {
                numb[keyword] = input;
                $(".screen").text("");
                $(".screen").append(numb[keyword]);
                console.log(keyword + " is " + numb[keyword] + "----");
            } else if (numb[keyword].toString().length > 10) {
                console.log(numb[keyword].toString().length);
                $(".screen").text("EROR");
            } else {
                numb[keyword] = numb[keyword].toString() + input;
                $(".screen").text("");
                $(".screen").append(numb[keyword]);
                console.log(keyword + " is " + numb[keyword]);
            }
        }
    }
// CALCULATES THE OPERATION GIVEN ADDITION SUBSTRACTION MULTIPLICATION DIVISION
    function calculation() {
        if (operator1 === "+" & operator2.length > 0) {
            numb.firstNumber = parseFloat(numb.firstNumber) + parseFloat(numb.secondNumber);
            console.log("plus function executed");
            console.log("plus result " + numb.firstNumber);
            chainReset();
        }

        if (operator1 === "-" & operator2.length > 0) {
            numb.firstNumber = parseFloat(numb.firstNumber) - parseFloat(numb.secondNumber);
            console.log("minus function executed");
            console.log("minus result " + numb.firstNumber);
            chainReset();
        }
        if (operator1.charCodeAt(0) === 215 & operator2.length > 0) {
            numb.firstNumber = parseFloat(numb.firstNumber) * parseFloat(numb.secondNumber);
            console.log("multiplication function executed");
            console.log("multiplication result " + numb.firstNumber);
            chainReset();
        }
        if (operator1.charCodeAt(0) === 247 & operator2.length > 0) {
            numb.firstNumber = parseFloat(numb.firstNumber) / parseFloat(numb.secondNumber);
            console.log("division function executed");
            console.log("division result " + numb.firstNumber);
            chainReset();
        }
    }
// WHEN WE CHAIN MORE THEN TWO OPERATIONS WE ASSIGN THE RESULT TO FIRSTNUMBER AND EMPTY SECONDNUMBER
    function chainReset() {
        numb.secondNumber = "";
        numb.firstNumber = Math.round(numb.firstNumber * 100000) / 100000;
        if (numb.firstNumber.toString().length > 10) {
            $(".screen").text("EROR")
        } else {
            $(".screen").text("");
            $(".screen").append(numb.firstNumber);
            if (operator2 !== "=") {
                operator1 = operator2;
                operator2 = "";
            } else {
                operator1 = "";
                operator2 = "";
                operatorassigned = false;
                keyword = "firstNumber";
            }
        }
    }
})
