const Base_URL = API_KEY;
let btn = document.querySelector("form button");
let fromCurr = document.getElementById("selectFrom");
let toCurr = document.getElementById("selectTo");
let msg=document.querySelector(".msg");


// const getApi = async () => {
//     let response = await fetch(URL);
//     console.log("This is the follwing result:");
//     console.log(response);
//     let data = await response.json();
//     console.log(data);
// }

let dropdownSelects = document.querySelectorAll(".dropdown select");
window.addEventListener("load",()=>{
    updateExchange();
})
for (let select of dropdownSelects) {
    for (currCode in countryList) {
        let newElement = document.createElement("option");
        newElement.innerText = currCode;
        newElement.value = currCode;

        if (select.name === "from" && currCode === "USD") newElement.selected = currCode;
        else if (select.name === "To" && currCode === "INR") newElement.selected = currCode;

        select.append(newElement);
    }
    select.addEventListener("change", (evt) => {
        updateflag(evt.target)  // whatever/whereever is chainig is called target
    });

}

const updateflag = (element) => {
    let currValue = element.value;
    let countryCode = countryList[currValue];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

// preventdefault()- means nothing tha was used to happen
//  like refreshing on page when button clicked 
//  should not happen all default work should 
//  stop and if we want we will call it

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    updateExchange();
});


const updateExchange= async ()=>{
    let val = document.querySelector(".amount input");
    let valInt = val.value;
  
    if (valInt === "" || valInt < 0) {
        valInt = 1;
        val.value = "1";
    }
 
    const URL = `${API_KEY}&base_currency=${fromCurr.value}&currencies=${toCurr.value}`;
    let response = await fetch(URL);
    
    let data = await response.json();
    console.log(data);
    console.log(toCurr.value);
    let rate = data['data'][toCurr.value].value;
    let finalAmt=valInt * rate;
    msg.innerHTML=`${valInt} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`
}
