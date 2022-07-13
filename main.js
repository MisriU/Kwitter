function buttonclick(){
    user_name = document.getElementById("input1").value;
    localStorage.setItem("user_name", user_name);
    window.location="index2.html";
}
