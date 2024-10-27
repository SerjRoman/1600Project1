// получаем кнопку из html по id
const createButton = document.getElementById("createProductButton")
// добавляем обработчик события клик на кнопку
createButton.addEventListener("click", ()=>{
    // fetch - позволяет отправлять запросы
    // первым аргументом передаем ссылку на которую отправляем запрос
    fetch("http://localhost:8000/product/create", {
        // указываем тип запроса
        method:"POST",
        // передаем данные в тело запроса, используя JSON.stringify для переделывания объекта в строку
        body: JSON.stringify(
            {
                name:"Taisia", 
                img:"https://static.ukrinform.com/photos/2013_06/1371661320_2.jpg",
                description:"sell skolkototam cena"
            }
        ),
        // добавляем заголовки запросам
        headers:{
            // указываем тип контента, который отправляем, чтобы сервер мог разобраться как их обрабатывать 
            "Content-Type": "application/json"
        }
    })
})

