const resultDiv = document.getElementById('resultDiv');
const triangleInputs = document.getElementById('triangleInputs');
const rectangleInputs = document.getElementById('rectangleInputs');
const parallelogramInput = document.getElementById('parallelogramInput');



// const calculateButtons = document.querySelectorAll('.card button');
// for(const button of calculateButtons){
//     button.addEventListener('click', (e)=>{
//         console.log(e.target, e.target.value)
//         testing(e.target, e.target.value);
//     })
// }

// function testing(target, value){
//     if(value === 'triangle'){
//         if(validation(target)){
//             let result = 0.5 * input1Value(target) * input2Value(target);
//             publishResult(result, 'Triangle');
//         }
//     }

// }





triangleInputs.nextElementSibling.addEventListener('click', ()=>{
    if(validation(triangleInputs)){
        let result = 0.5 * input1Value(triangleInputs) * input2Value(triangleInputs);
        publishResult(result, 'Triangle');
    }
})

rectangleInputs.nextElementSibling.addEventListener('click', ()=>{
    if(validation(rectangleInputs)){
        let result = input1Value(rectangleInputs) * input2Value(rectangleInputs);
        publishResult(result, 'Rectangle');
    }
})

parallelogramInput.nextElementSibling.addEventListener('click', ()=>{
    if(validation(parallelogramInput)){
        let result = input1Value(parallelogramInput) * input2Value(parallelogramInput);
        publishResult(result, 'Parallelogram');
    }
})


// changing card background color randomly
const cards = document.querySelectorAll('.card');
for(const card of cards){
    card.addEventListener('mouseover', ()=>{
        card.style.backgroundColor = `rgba(${random255()}, ${random255()}, ${random255()}, .2)`;
    })
}

//get a random number from 0 to 255
function random255(){
    let random = Math.floor(Math.random()*256);
    return random;
}

// input value validation function
function validation(reference){
    let num1 = Number(reference.children[0].value);
    let num2 = Number(reference.children[1].value);
    if(isNaN(num1) || isNaN(num2) || num1 === 0 || num2 === 0){
        alert('enter proper value');
        return false;
    }
    return true;
}

function input1Value(reference){
    return Number(reference.children[0].value);
}
function input2Value(reference){
    return Number(reference.children[1].value);
}

//function for publishing result on resultDiv
let count = 1;
function publishResult(result, type){
    const para1 = document.createElement('p');
    para1.textContent = `${count}. ${type}`;

    const para2 = document.createElement('p');
    para2.innerHTML = `${result.toFixed(2)}cm<sup>2<sup>`;
    para2.style.fontWeight = 'bold';

    const button = document.createElement('button');
    button.setAttribute('class', 'btn-primary');
    button.innerHTML = `Convert to m<sup>2</sup>`;
    // button.addEventListener()

    const section = document.createElement('section');
    section.setAttribute('class', 'result-section')
    section.appendChild(para1);
    section.appendChild(para2);
    section.appendChild(button);

    resultDiv.appendChild(section);
    count++;
}