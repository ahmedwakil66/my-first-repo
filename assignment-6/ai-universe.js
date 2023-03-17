const sortByDateBtn = document.getElementById('sortByDate');
const loader = document.getElementById('loader');
const cardsDiv = document.getElementById('cards-div');
const loadMore = document.getElementById('loadMore');
// modal references
const modalDescription = document.getElementById('modal-description');
const pricingBasic = document.getElementById('basic');
const pricingPro = document.getElementById('pro');
const pricingEnterprise = document.getElementById('enterprise');
const modalFeatureUl = document.getElementById('modal-features');
const modalIntegrationUl = document.getElementById('modal-integration');
const modalImg = document.getElementById('modal-img');
const modalInput = document.getElementById('modal-input');
const modalOutput = document.getElementById('modal-output');
const modalAccuracyP = document.getElementById('modal-accuracy-p');
const modalAccuracy = document.getElementById('modal-accuracy');


//sort by date function
sortByDateBtn.addEventListener('click', sortByDate);
function sortByDate(){
    loader.classList.remove('d-none');
    fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(res => res.json())
        .then(res => {
            const array = res.data.tools;
            array.sort((a,b) =>{
                a1 = new Date(a.published_in)
                b1 = new Date(b.published_in)
                return a1 < b1 ? -1: a1 > b1 ? 1: 0;
            })
            writeData(array, array.length);
        })
        .catch(err => console.log(err));
        loadMore.textContent = 'loaded all items';
}

// fetching data
function getData() {
    loader.classList.remove('d-none');
    fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(res => res.json())
        .then(res => writeData(res.data.tools))
        .catch(err => console.log(err));
}



//writing data to cardsDiv
function writeData(data, limit=6) {
    cardsDiv.innerHTML = '';
    data = data.slice(0,limit);

    data.forEach(single => {
        const col = document.createElement('div');
        col.classList.add('col');

        const card = document.createElement('div');
        card.classList.add('card', 'h-100');
        card.setAttribute('id', `${single.id}`)
        card.setAttribute('data-bs-toggle', 'modal');
        card.setAttribute('data-bs-target', '#exampleModal');
        col.appendChild(card);

        const img = document.createElement('img');
        img.classList.add('card-img-top');
        img.src = `${single.image}`;
        card.appendChild(img);

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        card.appendChild(cardBody);

        const h5 = document.createElement('h5');
        h5.classList.add('card-title');
        h5.textContent = 'Features';
        cardBody.appendChild(h5);

        const p = document.createElement('p');
        p.classList.add('card-text');
        cardBody.appendChild(p);

        const ol = document.createElement('ol');
        p.appendChild(ol);

        single.features.forEach(feature =>{
            const li = document.createElement('li');
            li.textContent = feature;
            ol.appendChild(li);
        })

        const cardFooter = document.createElement('div');
        cardFooter.classList.add('card-footer', 'flexi-flex');
        cardFooter.innerHTML = `
            <div>
                <h5>${single.name}</h5>
                <img src="images/calendar.svg">
                <small class="text-muted">${single['published_in']}</small>
            </div>
            <div>
                <img src="images/arrow-right.svg" width="30">
            </div>
        `;
        card.appendChild(cardFooter);

        cardsDiv.appendChild(col);

        card.addEventListener('click', ()=> {writeDetailsOnModal(single.id)})
    })
    loader.classList.add('d-none');
}



// load more button will load all items
loadMore.addEventListener('click', ()=> {
    loader.classList.remove('d-none');
    fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(res => res.json())
        .then(res => writeData(res.data.tools, res.data.tools.length))
        .catch(err => console.log(err));
        loadMore.textContent = 'Loaded all Items';
        loadMore.disabled = 'true';
})



//write details on modal
function writeDetailsOnModal(id){
    modalDescription.textContent = '';
    modalFeatureUl.innerHTML = '';
    modalIntegrationUl.innerHTML = '';
    modalImg.src = '#';
    modalInput.textContent = '';
    modalOutput.textContent = '';

    fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    .then(res => res.json())
    .then(data => {
        const single = data.data;
        console.log(single)
        single.description !== null ? modalDescription.textContent = single.description : modalDescription.textContent = 'No description found';

        if(single.pricing !== null){
            const [basic, pro, enterprise] = single.pricing;
            pricingBasic.innerHTML = `${basic.price} <br> ${basic.plan}`; 
            pricingPro.innerHTML = `${pro.price} <br> ${pro.plan}`;
            pricingEnterprise.innerHTML = `${enterprise.price} <br> ${enterprise.plan}`;
        } else{
            pricingBasic.innerHTML = `Free of Cost <br> Basic`;
            pricingPro.innerHTML = `Free of Cost <br> Pro`;
            pricingEnterprise.innerHTML = `Free of Cost <br> Enterprise`;
        }

        const{features} = single;
        const values = Object.values(features);
        values.forEach(value =>{
            const li = document.createElement('li');
            li.textContent = value.feature_name;
            modalFeatureUl.appendChild(li);
        })

        if(single.integrations !== null){
            single.integrations.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                modalIntegrationUl.appendChild(li);
            })
        } else{
            modalIntegrationUl.innerHTML = 'No data Found';
        }

        modalImg.src = single.image_link[0];
        if(single.accuracy.score !==null){
            modalAccuracy.textContent = single.accuracy.score * 100 + '%';
            modalAccuracyP.classList.remove('d-none');
        } else{
            modalAccuracyP.classList.add('d-none');
        }

        if(single.input_output_examples !== null){
            modalInput.textContent = single.input_output_examples[0].input;
            modalOutput.textContent = single.input_output_examples[0].output;
        } else{
            modalInput.textContent = 'Can you give any example?';
            modalOutput.textContent = 'No! Not Yet! Take a break!!!';
        }
        
    })
}



getData()
// document.getElementById('tempo').click()