function formValidation() {

    // ================< Select Elements >================//

    let Fname = document.forms["su-form"]["FName"].value;
    let Lname = document.forms["su-form"]["LName"].value;
    let UserName = document.forms["su-form"]["Username"].value;
    let Email = document.forms["su-form"]["Email"].value;
    let Password = document.forms["su-form"]["Password"].value;
    let ConfirmPassword = document.forms["su-form"]["CPassword"].value;
    let Cnic = document.forms["su-form"]["cnic"].value;
    let form = document.forms[0];

    // ================< Empty TextBoxes Validations >================//

    if (Fname == "" || Lname == "" || UserName == "" || Email == "" || Password == "" || ConfirmPassword == "" || Cnic == "" || PhoneNo == "" || zipCode == "") {
        alert("Please Fill All TextBoxes!");
        return false;
    }

    // ================< FirstName Validation >================//

    let nameExp = new RegExp('^[A-Za-z]+$');
    if (!nameExp.test(Fname)) {
        alert("FirstName Could Only Contain Alphabets!");
        return false;
    }

    // ================< LastName Validation >================//

    if (!nameExp.test(Lname)) {
        alert("LastName Could Only Contain Alphabets!");
        return false;
    }

    // ================< UserName Validation >================//

    let usernameExp = new RegExp("^[a-z0-9_\\.]+$");
    if (!usernameExp.test(UserName)) {
        alert("UserName could only contain lowercase, No's, dot, underscore.");
        return false;
    }

    // ================< Cnic Validation >================//

    let cnicExp = new RegExp('^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$', "g");
    if (!cnicExp.test(Cnic)) {
        alert("Wrong Cnic!\nSample: 33301-4939357-9");
        return false;
    }

    // ================< Password Validation >================//

    let passwordExp = new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$");
    if (!passwordExp.test(Password)) {
        alert("Password length Should Minimum 8.\nPassword Must Contain Alphabets & Numbers.");
        return false;
    }

    // ================< ConfirmPassword Validation >================//

    if (Password != ConfirmPassword) {
        alert("Password Not Matched!");
        return false;
    }

    return false;
}


