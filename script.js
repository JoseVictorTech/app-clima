document.querySelector("#pesquisa").addEventListener('submit' , async (event) => {
    event.preventDefault();


    let cityname = document.querySelector('#cidadenome').value;

    if(!cityname) {
        alert('voce precisa digitar um cidade')
        return
    }
    let apikey = "adc96fb412ad5c3ec66375678e479b3c";
    let Api_url =`https://api.openweathermap.org/data/2.5/weather?q=${ encodeURI(cityname)}&appid=${apikey}&units=metric&lang=pt_br`

    let resposta = await fetch (Api_url)
    let json = await resposta.json();

    console.log (json)

    if (json.cod === 200) {
        showinfo({
            name:json.name,
            pais:json.sys.country,
            temp_max: json.main.temp_max,
            temp_min: json.main.temp_min,
            temp: json.main.temp,
            humidade: json.main.humidity,
            vento: json.wind.speed,
            descricao: json.weather[0].description,
            temp_icon: json.weather[0].icon,

        })
    } else{
        alert("cidade inexistente.....")
    }
});


function showinfo(json){
 
    document.querySelector('#corpo').classList.add('show');

    document.querySelector ('#cidade').innerHTML =`${json.name} , ${json.pais}`
    document.querySelector ('#temperatura').innerHTML =`${json.temp.toFixed(1)} <sup> C° </sup> `
    document.querySelector ('#descricao'). innerHTML = `${json.descricao}`
    document.querySelector ('#temp_max').innerHTML =`${json.temp_max.toFixed(1)} <sup> C° </sup> `
    document.querySelector ('#temp_minvalue').innerHTML = `${json.temp_min.toFixed(1)} <sup> C° </sup>`
    document.querySelector ('#humidade_value').innerHTML =`${json.humidade} % `
    document.querySelector ('#vento_value').innerHTML =`${json.vento} km/hr`
    document.querySelector ('#img_icon').setAttribute('src', `https://openweathermap.org/img/wn/${json.temp_icon}@2x.png`);
}