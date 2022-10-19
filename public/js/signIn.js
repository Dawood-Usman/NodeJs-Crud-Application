function validateForm()
{
    let check = 0;

    let userName = document.forms['Login-Form']['Name'].value;
    let passWord = document.forms['Login-Form']['Password'].value;

    let UnErrorBox = document.getElementById("UN-error-box");
    let PassErrorBox = document.getElementById("Pass-error-box");
    
    if(userName == "")
    {
        UnErrorBox.innerText = "Please Fill This";
    }
    else
    {
        UnErrorBox.innerText = "";
        check++;
    } 
    if(passWord == "")
    {
        PassErrorBox.innerText = "Please Fill This";
    }
    else
    {
        PassErrorBox.innerText = "";
        check++;
    }

    if(check == 2) { return true; }
    else { return false; }
}



