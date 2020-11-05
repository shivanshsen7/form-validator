let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmPassword");


let getLabelName = (elem) => {
    let label = elem.parentElement.getElementsByTagName("label")[0];
    return label.innerText;
}

let showPass = (elem) => {
    elem.classList.remove("transparent-border");

    if (!elem.classList.contains("input-border-pass")) {
        elem.classList.add("input-border-pass")
    }
    if (elem.classList.contains("input-border-err")) {
        elem.classList.remove("input-border-err")
    }

    let msgElem = elem.parentElement.getElementsByTagName("small")[0];
    if (!msgElem.classList.contains("hide")) {
        msgElem.classList.add("hide")
    }
}

let showErr = (elem, msg) => {
    let msgElem = elem.parentElement.getElementsByTagName("small")[0];
    msgElem.innerText = `${getLabelName(elem)} ${msg}`;
    if (msgElem.classList.contains("hide")) {
        msgElem.classList.remove("hide")
    }
    elem.classList.remove("transparent-border");
    elem.classList.add("input-border-err");
}

let checkBlank = (elem) => {
    if (!elem.value.trim().length) {
        return ({
            result: false,
            msg: "can't be left blank!"
        });
    }
    else {
        return ({
            result: true,
            msg: ""
        });
    }
}

let checkValueLength = (elem, minLength = 8, maxLength = 16) => {
    if (elem.value.length < minLength) {
        return ({
            result: false,
            msg: `must be greater than ${minLength} in length!`
        });
    } else if (elem.value.length > maxLength) {
        return ({
            result: false,
            msg: `must be less than ${maxLength} in length!`
        });
    } else {
        return ({
            result: true,
            msg: ""
        });
    }
}
let checkWhiteChar = (elem) => {
    let check = elem.value.includes(" ");
    if (!check) {
        return ({
            result: true,
            msg: ""
        });
    } else {
        return ({
            result: false,
            msg: "can't contain white space!"
        });

    }
}

let checkEmailValidation = (elem) => {
    const regEx = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!regEx.test(elem.value)) {
        return ({
            result: false,
            msg: "is invalid."
        });
    } else {
        return ({
            result: true,
            msg: ""
        });
    }
}

let checkCompareConfirm = (elem, reElem = confirmPassword) => {
    compareResult = elem.value.localeCompare(reElem.value) === 0;
    if (!compareResult) {
        return ({
            result: false,
            msg: `is not equal to ${getLabelName(reElem)}`
        });
    } else {
        return ({
            result: true,
            msg: ""
        });
    }
}

let validator = (elem, checkList) => {
    let result = {
        result: true
    };
    for (checkFunc of checkList) {
        let currentResult = checkFunc(elem);
        if (!currentResult.result) {
            result = currentResult;
            break;
        }
    }
    if (result["result"]) {
        showPass(elem);
    } else {
        showErr(elem, result["msg"]);
    }

}



username.addEventListener("change", (e) => {
    validator(username, [checkBlank, checkValueLength, checkWhiteChar]);
});

email.addEventListener("change", (e) => {
    validator(email, [checkBlank, checkWhiteChar, checkEmailValidation]);
});
password.addEventListener("change", (e) => {
    validator(password, [checkBlank, checkValueLength, checkWhiteChar, checkCompareConfirm]);
});
confirmPassword.addEventListener("change", (e) => {
    let result = {
        result: true
    };
    let currentResult = checkCompareConfirm(password, confirmPassword);
    if (!currentResult.result) {
        result = currentResult;
    }
    if (result["result"]) {
        showPass(password);
        showPass(confirmPassword);
    } else {
        showErr(confirmPassword, result["msg"]);
    }
});
